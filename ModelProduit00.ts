export class Produit {

  constructor(
    public ref: string,
    public prixBase: number,
    public quantite: number) { }

  toString() {
    return "Produit " + this.ref;
  }

}

/**
 * Calcule la valeur totale d'un ensemble de produit.
 */
export const total = (produits: Array<Produit> = []) => {

  let tot = 0;

  for (let i = 0; i < produits.length; i++) {
    let p = produits[i];
    tot += p.prixBase * p.quantite;
  }

  return tot;

}

export const produits = [
  new Produit("x", 2, 1),
  new Produit("y", 3, 2),
  new Produit("z", 4, 3),
];