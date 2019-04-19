import { Produit } from "./ModelProduit01"
import { Log } from "./Log";

export const prixTotalEnsembleProduitsPourLotsAvecDecote = (
  produits: Array<Produit> = [],
  lots: Array<string> = []
) => {

  let tot = 0;

  for (let i = 0; i < produits.length; i++) {
    let p = produits[i];
    if (lots.find(_ => _ === p.lot) != null) {
      let finLot = p.lot.substring(p.lot.length - 4);
      if (finLot === "-ABC") {
        tot += (p.prixTotal() - ((p.prixTotal() / 100) * 10));
      }
      else if (finLot === "-XYZ") {
        tot += (p.prixTotal() - ((p.prixTotal() / 100) * 15));
      } else {
        tot += p.prixTotal();
      }

    }
  }

  return tot;

}