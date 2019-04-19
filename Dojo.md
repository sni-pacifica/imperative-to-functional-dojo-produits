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

Nous avons découvert un certain nombre d'aspects (immutabilité, effets de bords...) et mis en oeuvre quelques techniques
à travers divers exemples et technos (composition de fonction, monades, rxjs...).

Aujourd'hui, on rebalaye le modèle de pensée fonctionnel à travers un exemple "trivial" !

----

C'est *exactement* le moment de dire "Attend, stop, là ce point là, je ne saisi vraiment pas bien..."

---

## Du mode d'execution des programme

----

Parce que en réalité, la PF, c'est **avant tout le reste** un **moyen de contrôler le flot d'execution** de notre programme, mais de façon "transparente", sans *goto*, sans *if*, sans ...

----

La programmation fonctionnelle nous invite à décrire et 
mettre en évidence le **"quoi faire"**
avant le **"comment le faire"**.

----

## Programmation procédurale : le mode linéaire

----

C'est le mode choisit pour apprendre à programmer - y compris et surtout chez les jeunes à travers Scratch et co - et c'est le mode qui perdure ensuite.

----

Ce mode de programmation impose une **modèle de pensée** beaucoup trop bas-niveau, qui s'**il permet de rapidement obtenir des résultats** n'est rééllement adapté (comprendre "qui ne se transforme pas en *[big ball of mud](http://www.laputan.org/mud/mud.html#BigBallOfMud)* rapidement") qu'à **un cas particulier de programme**, le traitement séquentiel mono-threadé.

----

Pourquoi ? Il faut se pencher sur le rapport entre le programme **tel qu'il est écrit**, et la façon **dont il s'execute** ?

----
 
- le programme possède un **point d'entrée**, se **déroule**, puis se **termine**

- "déroule" : 
    - chaque instruction est **executée immédiatement**...
    - ce qui **altère l'état de la mémoire** ...
    - et ceci, instruction après instruction...

----

(debut) -> instruction -> instruction -> instruction -> instruction -> (fin)

----

Un programme procédural est donc à l'image de la **carte perforée** une 
**succession d'ordres ordonnés, linéaires, déroulé par un automate possédant un état qui évolue**

----

Donc, **ce qui est "écrit"** = **"ce qui va s'executer"**

----

Ce qui impacte évidemment la façon dont on raisonne et on code : j'appelle souvent ça coder en mode "reverse debugger" ... on raisonne en permanence en mode "étape par étape" en présuposant d'un mode d'execution linéaire

Et donc, un mode de pensée linéaire...

----

Avantage(s) ? *Grosso-modo*, un seul... Un contrôle "manuel" de l'execution, où l'on maitrise
exactement le flot d'execution et les états successifs de la machine, permettant aux experts de "tuner" finement
les comportements pour mettre en oeuvre telle ou telle optimisation technique.

----

L'ennui et que cette approche "code" == "execution" ne "scale" absolument pas bien du tout, ni dans le temps ni dans l'espace
(plusieurs développeurs, transmission de la connaissance...)

----

Chaque développeurs instille "son" mode de pensée linéaire dans le code (d'où les querelles incessantes sur le style de coding...) ; et nous sommes tous très différents sur cet aspect.

----

Le moindre "obstacle" sur le chemin provoque des détours et des contorsions qui grèvent lourdement la maintenabilité.

----

- *Branchement conditionnels, boucles* ? "Pyramid of doom"
- *Asynchronisme* ? Casse le flot des programmes (Pyramid of doom, again).
- *Multi-threading* ? Atroce à gérer correctement.
- *Complexité fonctionnelle* ? Code spagghetti à la longue.

----

Allez, assez de théorie : lançons nous dans l'écriture d'un petit
programme "trivial" en mode procédural

----

https://stackblitz.com/edit/typescript-bufz3d

ModelProduit.ts

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
