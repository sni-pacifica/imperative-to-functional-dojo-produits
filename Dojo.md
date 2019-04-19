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

![](medias/wat.jpg) 

----

## Programmation procédurale : le mode linéaire

----

C'est le mode choisit pour apprendre à programmer - y compris et surtout chez les jeunes à travers Scratch et co - et c'est le mode qui perdure ensuite.

----

Ce mode de programmation impose une **modèle de pensée** beaucoup trop bas-niveau, qui s'**il permet de rapidement obtenir des résultats** n'est rééllement adapté (comprendre "qui ne se transforme pas en *[big ball of mud](http://www.laputan.org/mud/mud.html#BigBallOfMud)* rapidement") qu'à **un cas particulier de programme**, le traitement séquentiel mono-threadé.

----

Pourquoi ? Il faut se pencher sur le rapport entre le programme 
**tel qu'il est écrit**, et la façon **dont il s'execute**.

----
 
- le programme possède un **point d'entrée**, se **déroule**, puis se **termine**

- "déroule" : 

    - chaque instruction est **executée immédiatement**...
    - ce qui **altère l'état de la mémoire** ...
    - et ceci, **instruction après instruction**...

----

(debut) -> instruction -> instruction -> instruction -> instruction -> (fin)

----

Un programme procédural est donc à l'image de la **carte perforée** une 
**succession d'ordres ordonnés, linéaires, déroulé par un automate possédant un état qui évolue**

----

Donc, **ce qui est "écrit"** = **"ce qui va s'executer"**

----

Ce qui impacte évidemment la façon dont on raisonne et on code : 
j'appelle souvent ça coder en mode "reverse debugger" ... 
on raisonne en permanence en mode "étape par étape",
en présuposant d'un mode d'execution linéaire, d'un état tout juste précédent..

Et donc, un mode de pensée linéaire...

----

Avantage(s) ? *Grosso-modo*, un seul... Un contrôle "manuel" de l'execution, où l'on maitrise
exactement le flot d'execution et les états successifs de la machine, permettant aux experts de "tuner" finement
les comportements pour mettre en oeuvre telle ou telle optimisation technique.

----

L'ennui et que cette approche "code" == "execution" ne "scale" absolument pas bien du tout, ni dans le temps ni dans l'espace
(plusieurs développeurs, transmission de la connaissance...)

----

En sus, chaque développeurs instille "son" mode de pensée linéaire 
dans le code (d'où les querelles incessantes sur le style de coding...); 
et nous sommes tous +/- différents sur cet aspect !

<small>Valable pour votre moi *du présent* et votre moi *du futur* aussi !</small>

----

En sus, en mode linéaire, le moindre "obstacle" sur le chemin provoque des détours et des contorsions qui grèvent lourdement la maintenabilité :

----

- *Branchement conditionnels, boucles* ? "Pyramid of doom"
- *Asynchronisme* ? Casse le flot des programmes (Pyramid of doom, again).
- *Multi-threading* ? Atroce à gérer correctement.
- *Complexité fonctionnelle* ? Code spagghetti, à la longue.

----

Allez, assez de théorie : travaillons un peu sur un petit
programme "trivial" en **mode procédural**

----

https://stackblitz.com/edit/typescript-qfsv5t

index.ts

----

*DISCLAIMER : Les programmes présentés sont perfectibles, oui, je sais.*

*DISCLAIMER2 : Toutes les pratiques de clean code ne sont pas appliquées, le but étant
de mettre en avant du code '~~averel~~ average  procedural code'.*

----

Etape 00 : Jusqu'ici, je pense que vous êtes d'accord pour me dire que "ça va".

----

Evol !

> Les produits sont rattaché à un lot (string).
> La fonction de calcul doit me permettre de faire la somme (comme précédemment),
> mais **pour un lot donné**, passé en paramètre en plus du tableau de produits.

<small>A vous de jouer...</small>

----

Evol !

> La fonction de calcul doit me permettre de faire la somme **pour *n* lots donnés**
> passés en paramètre.

<small>A vous de jouer...</small>

----

Evol !

> Lors du calcul, on doit appliquer une décote sur certains lots
> - 10% de valeur sur les lots dont le numéro finit par -ABC
> - 15% de valeur sur les lots dont le numéro finit par -XYZ


<small>A vous de jouer...</small>

----

... prêt ?

----

Evol !

> Le prix de chaque produit est renvoyé dynamiquement par un appel au backend,
> il faut lui passer la ref du produit et il renvoit le prix

----

A vous de jouer !

- Un service `PriceService`, retourne un prix random ; 
  à instancier à la main puis à appeller dans le code
- Attention, essayer d'ajouter l'appel dans le code de 
 façon *simple* (donc... erronée..), ne surtout pas "tout casser" !

----

Présentation d'une solution (imparfaite)...

----

Bon...

Le code résultant (src/04/ModelProduit.ts):
- 'semble' marcher (en fait non)
- est vraiment en train de devenir un plat de nouilles...
- on voit bien que chaque évolution menace la stabilité du château de carte...
- code peu explicite ; il faut lire / relire pour en saisir le sens "caché"

----

*Jusqu'à l'introduction de l'asynchronisme*, la complexité était *gérable*... 
en poussant quelques pratiques de clean-code sur le code existant,
on *pouvait* minimiser de nombreux aspects.

----

Mais dans tous les cas, l'**execution synchrone du code** et 
la nature du procédural **pilotage par l'algo pas à pas** 
montre immédiatement ses limites dans un **environnement non linéaire**...

----

Note : Une IHM, de par sa nature évenementielle (onclick, on...)
 ce n'est pas du tout linéaire !

----

Ce qui nous amène ...

---

## Les apports de la PF, et le coeur du truc

----

### Des promesses

----

La programmation fonctionnelle cherche à résoudre **tous** ces problèmes en nous
fournissant :
- un **mode de pensée** différent, **décorellé du mode d'execution**
- des bonnes pratiques unitaires **adaptées à TOUS les modes d'executions** (asynchrone,
multithreading...)
- des concepts et leurs implémentations destiné à faciliter l'assemblage 
  de petits programmes unitaires **là aussi, décorellé du mode d'execution** 

----

Le but ultime : adopter un mode de pensée et de codage universel, pouvant traiter 
de la même façon tous les types de problèmes, tout en scalant parfaitement.

----

### Oui mais comment, en pratique ?

----

On présente toujours la programmation fonctionnelle comme l'utilisation
de "fonctions" comme brique de base. On explique qu'il faut "composer"
des fonctions "pures" pour réaliser des programmes robustes, etc etc...

----

<pre><code>    
    const square = (x:number):A => ...    
    const foo = (a:A):B => ...    
    const bar = (b:B):c => ...
    
    const result = bar(foo(square(42)));    
</code></pre>

----

*Ok, soit ; mais ça ne scale pas beaucoup çà, et puis l'asynchronisme...*

Wait !

----

On parle aussi d'immutabilité et de "pas d'effets de bords".

----

Mais en fait, ces pratiques sont applicables en programmation procédurale
avec les mêmes bénéfices attendus (code plus clair, etc...) 

----

So what ?

----

On ne parle que trop rarement du fait que la PF nous donne aussi la main
sur **le mode d'execution** du programme, et ceci *de façon transparente* :
un traitement peut devenir asynchrone "for free" sans presque rien changer...

----

La pierre Angula(i)r(e) de ce principe, et du mode de pensée qui en découle 
(*celui qu'on ne met jamais assez en avant non plus*)
est de raisonner en mode "Contexte", en mode "Boites".

Le terme technique officiel étant "Monade"... 

----

Plutôt que d'*executer des fonctions*, *récupérer des valeurs*, les utiliser pour *executer
d'autres fonctions en les composants*, on va *mettre les valeurs dans des boites*,
*envoyer les fonctions dans ces boites*, et *composer les boites*...

----

On écrit plus un programme "pas à pas", on assemble une tuyauterie complexe qui va *canaliser un 
flux d'information au moment voulu*...

----

&nbsp;

        // Je mets des valeurs dans des boites...
        
        const array         = Array.from(1,2,3); // /!\ techniquement pas une Monade... mais proche 
        const maybe         = Maybe.fromNullable(getContrat());
        const observable    = Observable.of(42);

----

&nbsp;

        // J'envoie une fonction dans la boite...
        
        const array2        = array.map(x => x + 1);
        const maybe2        = maybe.map(c => c.getSouscripteur());
        const observable2   = observable.pipe(map(x => x + 1));

----

Mémo : `map` **n'éxecute rien** (dans le principe...) : celà crée juste une **nouvelle boite**
 programmée pour 'executer' cette fonction **plus tard**, *si besoin* sur les datas précédents.

----

Mémo 2 : `map` permet de réaliser la **composition de fonctions dynamiquement** sans execution !  

----

&nbsp;

        // Je compose des boites
        
        // -- Array en javascript ne dispose pas de l'opérateur de composition

        // où `getContratNH` renvoit un Maybe<Contrat>
        const maybe3        = maybe2.flatMap(s => getContratNH(s));

        // où `getTicketById` renvoit un Maybe<Ticket>
        const observable3   = observable2.pipe(flatMap(x => getTicketById(x)));

----

Mémo : `flatMap` **n'éxecute rien** (dans le principe) : celà crée juste une **nouvelle boite**
 programmée pour combiner / "applatir" des contextes entre eux (flatMap = map + flatten)

----

Mémo 2 : `flatMap` permet de réaliser la **composition de contextes** dynamiquement.  

----

`map` + `flatMap` : composition de fonction + composition de contextes ! 

----

Avec ces deux opérateurs, vous pouvez décrire (en théorie) n'importe quel programme, puisque vous pouvez
composez les deux blocs fondamentaux de la programmation : fonction et execution de fonction !

----


Ce concept clé permet d'**unifier le modèle d'écriture du programme**, quel qu'en soit 
**le modèle d'execution**.

L'"abstraction" de classe de l'univers objet monte d'un cran avec l'**abstraction du mode
d'execution** porté par **le type de monade utilisé** !

----

*Ok, ok... mais comment je récupère la valeur finale ?* ?

----

Haem... en fait...en *théorie*... vous ne *pouvez pas* récupérer de *valeur finale* ! 😅

----

En effet, le concept de Monad ne décrit qu'une façon de composer
des fonctions et des contextes... pas d'en "extraire" quelque chose !


----

Alors forcément, il va bien falloir faire quelque chose avec le résultat du programme composé...

----

Chaque concept monadique va (peut !) proposer son / ses opérateurs spécifiques pour 
executer le traitement composé, la technique va donc dépendre du type.

----

&nbsp;

        // extraction de valeur
        
        // -- Array en javascript execute en fait tout de suite les `map`... :\

        maybe3.get(); // "retourne" la valeur, pour faire du procédural..
        maybe3.foreach(value => ...);

        observable3.subscribe(result => ...);
        observable3.pipe(tap(result => ...));


----



---

## SO ??

----

Si on prend comme modèle mental un modèle à base de 'boites' pour travailler avec 
des types monadiques, on s'en sort en général plutôt bien.

<small>Attention, ce concept est théoriquement "faux"... mais il marche bien en pratique.</small>

----

Avant d'écrire une version "fonctionelle monadique" du problème précédent, 
faisons donc le tour "sur papier" !


----

Evol !

> Les produits sont renvoyés par un appel au backend via un Observable&lt;Array&lt;Produit>> !

----

Il faut donc :
- récupérer les produits
- ne garder que ceux qui concerne les lots qui nous intéressent
- pour chaque produit, récupérer le prix
- calculer le prix total pour chaque produit
- appliquer la reduction en fonction du code lot
- afficher la valeur totale !

<small>Voilà aussi pourquoi on code en "procédural"...</small>

----

> Présentation du diagramme...

----

> Présentation du code ...

