import { of, Observable } from "rxjs";
import { delay } from "rxjs/operators";
import { Produit } from "../ModelProduit01";

export class ProduitsService {

  getProduits = (): Observable<Array<Produit>> => of([
    new Produit("x", 2, 1, "lot1-XYZ"),
    new Produit("y", 3, 2, "lot1-XYZ"),
    new Produit("z", 4, 3, "lot2-ABC"),
  ]);

}