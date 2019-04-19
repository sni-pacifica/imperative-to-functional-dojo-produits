import { Produit } from "./ModelProduit01"
import { Log } from "./Log";
import { of, forkJoin, Observable, from } from "rxjs";
import { map, flatMap, tap } from "rxjs/operators";
import { PriceService } from "./services/PriceService";

const priceService = new PriceService();

const priceForProduit = (produit: Produit) =>
  priceService.priceForRef(produit.ref);

const produitEstRattacheAUnLot = (lots: Array<string>) => (produit: Produit) =>
  lots.find(_ => _ === produit.lot) != null


// A ce moment là (code commenté suivant), plusieurs possibilités s'offrent à nous ...
//
// const priceForProduit = (produit: Produit) =>
//   priceService.priceForRef(produit.ref);
//
// export const prixTotalEnsembleProduitsPourLotsAvecDecoteAsync = (
//   produits: Observable<Array<Produit>> = [],
//   lots: Array<string> = []
// ) => {

//   return produits.pipe(
//     map(_ => prixTotalEnsembleProduitsPourLotsAvecDecote(_, lots))
//   );

// }

// const prixTotalEnsembleProduitsPourLotsAvecDecote = (
//   produits: Array<Produit> = [],
//   lots: Array<string> = []
// ) => {

//   return produits
//     .filter(
//       produitEstRattacheAUnLot(lots)
//     ).map(
//       priceForProduit
//     );

// }
const endsWith = (token: string) => (s: string) =>
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
  priceService.priceForRef(
    produit.ref
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
  Remarquez que si l'on 'ignore' les operateurs de combinaisons monadiques et qu'on se concentre sur les fonctions "métier", la logique globale est très bien mise en avant !
*/
export const prixTotalEnsembleProduitsPourLotsAvecDecoteAsync = (
  produitsObs: Observable<Array<Produit>> = of([]),
  lots: Array<string> = []
): Observable<number> =>
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

// D'ailleurs en forcant le trait et en jouant sur la formatage...
/*export const prixTotalEnsembleProduitsPourLotsAvecDecoteAsyncBis = (
  produitsObs: Observable<Array<Produit>> = of([]),
  lots: Array<string> = []
): Observable<number> =>
  produitsObs.pipe(flatMap(produits => forkJoin(
    produits.filter(
      produitEstRattacheAUnLot(lots)
    ).map(
      totalPriceForProduitWithReductionsApplied
    )
  ).pipe(map(
    sumValues
  ))));*/

