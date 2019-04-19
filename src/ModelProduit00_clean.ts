export class Produit {

  constructor(
    public ref: string,
    public prixBase: number,
    public quantite: number) { }

  prixTotal = () => this.prixBase * this.quantite;

  toString() {
    return "Produit " + this.ref;
  }

}

/**
 * Calcule la valeur totale d'un ensemble de produit.
 */
export function prixTotalEnsembleProduits(produits: Array<Produit> = []) {

  let prixTotalAggrege = 0;

  for (let i = 0; i < produits.length; i++) {
    prixTotalAggrege += produits[i].prixTotal();
  }

  return prixTotalAggrege;

}

export const produits = [
  new Produit("x", 2, 1),
  new Produit("y", 3, 2),
  new Produit("z", 4, 3),
];