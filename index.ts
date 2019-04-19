import {Log} from "./src/Log";

Log.log("DOJO Revisions PF", "#ff8855");
Log.log("<em>Sortie 'console' ici ! :)</em>");

const logBlue = Log.logWithColor("#5588ff");

/*
  Appellez le code à executer ci-dessous !
*/

// Etape 00
// import { Produit, produits, total } from "./src/00/ModelProduit";
// logBlue("La valeur totale est : " + total(produits));

// Etape 01
// import { Produit, produits, prixTotalEnsembleProduits } from "./src/01/ModelProduit";
// logBlue("La valeur totale est : " + prixTotalEnsembleProduits(produits, "lot1-XYZ"));

// Etape 02
// import { Produit, produits } from "./src/01/ModelProduit";
// import { prixTotalEnsembleProduitsPourLots } from "./src/02/ModelProduit";
// logBlue("La valeur totale est : " + prixTotalEnsembleProduitsPourLots(produits, ["lot1-XYZ"]));

// Etape 03
// import { Produit, produits } from "./src/01/ModelProduit";
// import { prixTotalEnsembleProduitsPourLotsAvecDecote } from "./src/03/ModelProduit";
// logBlue("La valeur totale est : " + prixTotalEnsembleProduitsPourLotsAvecDecote(produits, ["lot1-XYZ"]));

// Etape 04
import { Produit, produits } from "./src/01/ModelProduit";
import { prixTotalEnsembleProduitsPourLotsAvecDecoteAsyncBuggy } from "./src/04/ModelProduit";
logBlue("La valeur totale est : " + prixTotalEnsembleProduitsPourLotsAvecDecoteAsyncBuggy(produits, ["lot1-XYZ"]));

/*
let service = new ProduitsService();
const computation = prixTotalEnsembleProduitsPourLotsAvecDecoteAsync(
  service.getProduits(), ["lot1-XYZ"]
)

computation.subscribe(result => {
  logBlue("La valeur totale est : " + result);
});
*/
