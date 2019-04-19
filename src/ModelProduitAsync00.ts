import { Produit } from "./ModelProduit01"
import { Log } from "./Log";
import { PriceService } from "./services/PriceService";

const priceService = new PriceService();

/*
  ATTENTION ! Implémentation hautement buggée (potentiellement)
 */
export const prixTotalEnsembleProduitsPourLotsAvecDecoteAsync = (
  produits: Array<Produit> = [],
  lots: Array<string> = []
) => {

  let tot = 0;

  for (let i = 0; i < produits.length; i++) {
    let p = produits[i];
    if (lots.find(_ => _ === p.lot) != null) {

      let finLot = p.lot.substring(p.lot.length - 4);

      let prixUnitaire = -1;
      priceService.priceForRef(p.ref).subscribe(p => {
        prixUnitaire = p;
      });

      let prixTotalBase = prixUnitaire * p.quantite;

      if (finLot === "-ABC") {
        tot += (prixTotalBase - ((prixTotalBase / 100) * 10));
      }
      else if (finLot === "-XYZ") {
        tot += (prixTotalBase - ((prixTotalBase / 100) * 15));
      } else {
        tot += prixTotalBase;
      }

    }
  }

  return tot;

}