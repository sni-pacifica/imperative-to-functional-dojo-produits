import {Log} from "./src/Log";

Log.log("Hello", "#ff8855");
Log.log("World !");
const logBlue = Log.logWithColor("#5588ff");

/*
 Modèle d'execution des programmes
*/

/*
  Afficher la valeur totale d'un ensemble de produits.
*/

// import { Produit, produits, total } from "./ModelProduit00";
// logBlue("La valeur totale est : " + total(produits));

// import { Produit, produits, prixTotalEnsembleProduits } from "./ModelProduit00_clean";
// logBlue("La valeur totale est : " + prixTotalEnsembleProduits(produits));

// import { Produit, produits, prixTotalEnsembleProduits } from "./ModelProduit01";
// logBlue("La valeur totale est : " + prixTotalEnsembleProduits(produits, "lot1-XYZ"));

// import { Produit, produits, prixTotalEnsembleProduits } from "./ModelProduit01";
// import { prixTotalEnsembleProduitsPourLots } from "./ModelProduit02";
// logBlue("La valeur totale est : " + prixTotalEnsembleProduitsPourLots(produits, ["lot1-XYZ"]));

// import { Produit, produits, prixTotalEnsembleProduits } from "./ModelProduit01";
// import { prixTotalEnsembleProduitsPourLotsAvecDecote } from "./ModelProduit03";
// logBlue("La valeur totale est : " + prixTotalEnsembleProduitsPourLotsAvecDecote(produits, ["lot1-XYZ"]));

// import { Produit, produits, prixTotalEnsembleProduits } from "./ModelProduit01";
// import { prixTotalEnsembleProduitsPourLotsAvecDecoteAsync } from "./ModelProduitAsync00";
// logBlue("La valeur totale est : " + prixTotalEnsembleProduitsPourLotsAvecDecoteAsync(produits, ["lot1-XYZ"]));

import {Produit, produits, prixTotalEnsembleProduits} from "./src/ModelProduit01";
import {prixTotalEnsembleProduitsPourLotsAvecDecoteAsync} from "./src/ModelProduitAsyncGood";
import {ProduitsService} from "./src/services/ProduitsService"

let service = new ProduitsService();
const computation = prixTotalEnsembleProduitsPourLotsAvecDecoteAsync(
  service.getProduits(), ["lot1-XYZ"]
)

computation.subscribe(result => {
  logBlue("La valeur totale est : " + result);
});
