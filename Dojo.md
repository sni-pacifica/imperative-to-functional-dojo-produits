<style>
    code { width : 110%; height : 110%; }
    p, li { font-size : .8em !important; }
    img { border : 0px !important; background : none !important;}
	strong { color : #F58 }
	p code { color : limegreen }
	ul li code { color : limegreen }
	em.strike { text-decoration: line-through }
</style>

# Du procédural au fonctionnel

### ...petite séance de révisions

----

Nous avons abordés plusieurs fois les paradigmes fonctionnels lors des sessions.

Nous avons découvert un certain nombre d'aspects et mis en oeuvre quelques techniques
de programmation à travers divers exemples et technos.

Aujourd'hui, un peu de révisions... from scratch !

----

C'est le moment de dire "Attend, stop, là ce point là, je saisi pas bien..."

---

## Du mode d'execution des programme

----

Quid du rapport entre le programme **tel qu'il est écrit**, et la façon **dont il s'execute** ?

----

- La majorité des programmes sont écrit dans un langage
 **impératif et procédural**, **mono-threadé**.
 
- le programme possède un **point d'entrée**, se **déroule**, puis se **termine**

----

- "déroule" : 
    - chaque instruction est **executée immédiatement**...
    - ce qui **altère l'état de a mémoire** ...
    - instruction après instruction...

- (debut) -> instruction -> instruction -> instruction -> instruction -> (fin)
----

Un programme procédural est donc à l'image de la **carte perforée** une 
**succession d'ordres ordonnés, linéaires, déroulé par un automate possédant un état**

----

Donc, ce qui est "écrit" = "ce qui va s'executer"

J'appelle souvent çà coder en mode "reverse debugger" : ce mode de programmation
    impose un mode de pensée "étape par étape"

----

Avantage(s) ? *Grosso-modo*, un seul... Un contrôle "manuel" de l'execution, où l'on maitrise
exactement le flot d'execution, permettant aux experts de "tuner" finement
les comportements pour mettre en oeuvre tel ou telle optimisation technique.

----

L'ennui et que cette approche "code" == "execution" ne "scale" absolument pas bien du tout.

----

- *Branchement conditionnels, boucles* ? "Pyramid of doom"
- *Asynchronisme* ? Casse le flot des programmes (Pyramid of doom, again).
- *Multi-threading* ? Atroce à gérer correctement.
- *Complexité fonctionnelle* ? Code spagghetti à la longue.

----

Pas convaincu ? Explorons un petit example en mode 'procédural' à l'ancienne !

----

https://stackblitz.com/edit/typescript-bufz3d

ModelProduit00.ts

cf. fonction 'total'

----

*Le programme est perfectible, oui. Il est juste là pour illustrer 
le propos sur le modèle d'execution !*

----

Juste ici je pense que vous êtes d'accord pour me dire que "ça va".

----

Exo : "Proprifier" le code au maximum pour avoir quelque chose d'un peu plus 'clean'
(mais toujours avec la boucle for, pas de 'map' qui n'est pas procédural !) 

----

Evol !

> Les produits sont rattaché à un lot (string).
> La fonction de calcul doit me permettre de faire la somme **pour un lot donné**
> passé en paramètre.

<small>A vous de jouer...</small>

----

Evol !

> La fonction de calcul doit me permettre de faire la somme **pour n lots donnés**
> passés en paramètre.

<small>A vous de jouer...</small>

----

Evol !

> Lors du calcul, on doit appliquer une décote sur certains lots
> - 10% sur les lots dont le numéro finit par -ABC
> - 15% sur les lots dont le numéro finit par -XYZ


<small>A vous de jouer...</small>

----

... prêt ?

----

Evol !

> Le prix de chaque produit est renvoyé dynamiquement par un appel au backend
> il faut lui passer la ref du produit et il renvoit le prix

----

- A vous de jouer, le service est `PriceService`, à instancier à la main puis à appeller...
- Faire *simple*, ne pas "tout casser" !

----

Présentation d'une solution (imparfaite)...

----

Bon...

Le code résultant :
- 'semble' marcher (en fait non)
- devient un plat de nouilles...
- chaque évolution menace le chateau de carte...
- code peut explicite ; il faut lire / relire pour en saisir le sens "caché"

----

Jusqu'à l'introduction de l'asynchronisme, la complexité était gérable... en poussant
quelques pratiques de clean-code, on pouvrait minimiser de nombreux aspects.

Mais le problème restant, l'**execution synchrone du code** et le **pilotage par l'algo pas à pas** montre immédiatement
ses limites dans un environnement non linéaire...

---

## Les apports de la PF

----

La programmation fonctionnelle cherche à résoudre **tous** ces problèmes en nous
fournissant :
- un **mode de pensée** différent, **décorellé du mode d'execution**
- des bonnes pratiques unitaires **adaptées à TOUS les modes d'executions** (asynchrone,
multithreading...)
- des concepts et leurs implémentations destiné à faciliter l'assemblage 
  de petits programmes unitaires **là aussi, décorellé du mode d'execution** 

----

Un concept clé permettant d'unifier le modèle d'execution est l'utilisation de "contextes de travail",
parfois présenté comme des "boites", dont le nom "technique" est **monade**.

Une **monade** est un **container** de données et **aussi** un **executeur de code**.

----

todo exemples de monades

----

L'utilisation de monade permet de **décrire** le traitement que l'on souhaite réaliser 
en **assemblant des fonctions unitaires**, via des **opérateurs** monadiques ...

----

todo exemples d'opérateurs

----

puis de déclencher la résolution en consommant la valeur contnue dans la monade finale.

----

Les opérateurs "universels" :
- filter / map / reduce ...
