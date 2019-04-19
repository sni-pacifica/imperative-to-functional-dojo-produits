
/*
  Une base DB2 renvoit le nom de client sur 20 caractères, en majuscule :
  [JEAN DUPONT          ]
  On veut formater le nom pour avoir à afficher 
  Jean Dupont
*/
const nom_DB2 = "JEAN_DUPONT          ";
const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
Logger.log("Nom original :" + nom_DB2);
const result =
  nom_DB2
    .trim()
    .replace("_", " ")
    .toLowerCase()
    .split(" ")
    .map(s => capitalize(s)).join(" ");

Logger.log("Nom final :" + result);
