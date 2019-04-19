import {forkJoin, Observable, of} from "rxjs";
import {flatMap, map, tap} from "rxjs/operators";
import {Produit} from "../01/ModelProduit"
import {Log} from "../Log";
import {PriceService} from "../services/PriceService";

export const prixTotalEnsembleProduitsPourLotsAvecDecoteAsync =
  (produitsObs: Observable<Array<Produit>> = of([]), lots: Array<string> = []): Observable<number> =>
    produitsObs.pipe(
      flatMap(
        prixTotalEnsembleProduitsPourLotsAvecDecote(lots)
      )
    );

export const prixTotalEnsembleProduitsPourLotsAvecDecote =
  (lots: Array<string>) =>
    (produits: Array<Produit>): Observable<number> =>
      forkJoin(
        produits.filter(
          produitEstRattacheAUnLot(lots)
        ).map(
          totalPriceForProduitWithReductionsApplied
        )
      ).pipe(
        map(
          sumValues
        )
      )

const priceService = new PriceService();

const priceForProduit =
  (produit: Produit): Observable<number> =>
    priceService.priceForRef(produit.ref);

const produitEstRattacheAUnLot =
  (lots: Array<string>) =>
    (produit: Produit): boolean =>
      lots.find(_ => _ === produit.lot) != null

const endsWith =
  (token: string) =>
    (s: string) =>
      s.substring(s.length - token.length) === token

const reduceAmountByPercent =
  (percent: number) =>
    (amount: number) =>
      amount - ((amount / 100) * percent)

const reduceBy10Percent = reduceAmountByPercent(10);

const reduceBy15Percent = reduceAmountByPercent(10);

const applyReductionIFNeeded = (product: Produit, amount: number) =>
  (endsWith("-ABC")(product.lot)) ? reduceBy10Percent(amount) :
    (endsWith("-XYZ")(product.lot)) ? reduceBy15Percent(amount) :
      amount;

const totalPriceForProduitWithReductionsApplied = (produit: Produit): Observable<number> =>
  priceForProduit(
    produit
  ).pipe(
    tap(unitPrice => {
      Log.log("Computing total price for " + produit.ref + " which is at " + unitPrice);
    }),
    map(unitPrice =>
      unitPrice * produit.quantite
    ),
    map(totalPrice =>
      applyReductionIFNeeded(produit, totalPrice)
    )
  );

const sumValues = (values: Array<number>) => values.reduce((total, next) => total + next, 0);

/*
  Remarquez que si l'on 'ignore' les operateurs de combinaisons monadiques
  et qu'on se concentre sur les fonctions "métier"...
  la logique globale est très bien mise en avant !
*/

