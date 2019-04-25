export class Produit {

  constructor(
    public ref: string,
    public prixBase: number,
    public quantite: number,
    public lot: string) { }

  prixTotal = () => this.prixBase * this.quantite;

  toString() {
    return "Produit " + this.ref;
  }

}

export const produits = [
  new Produit("x", 2, 1, "lot1-XYZ"),
  new Produit("y", 3, 2, "lot1-XYZ"),
  new Produit("z", 4, 3, "lot2-ABC"),
];
