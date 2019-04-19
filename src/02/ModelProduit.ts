import { Produit } from "../01/ModelProduit"

export const prixTotalEnsembleProduitsPourLots = (
  produits: Array<Produit> = [],
  lots: Array<string> = []
) => {

  let tot = 0;

  for (let i = 0; i < produits.length; i++) {
    let p = produits[i];
    if (lots.find(_ => _ === p.lot) != null) {
      tot += p.prixTotal();
    }
  }

  return tot;

}
