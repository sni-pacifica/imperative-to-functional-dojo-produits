<style>
.reveal pre {
    box-shadow : 0px 0px 0px;
}
    .reveal pre code { 
    width : 130%; height : 500px !important; position:relative; left : -50px; top : -50px;
        max-height: 1000px !important;
    }
    p, li { font-size : .8em !important; }
    img { border : 0px !important; background : none !important;}
	strong { color : #F58 }
	p code { color : limegreen }
	ul li code { color : limegreen }
	em.strike { text-decoration: line-through }
</style>

# Du procédural au fonctionnel

### ...petite séance de "révisions"

----

Nous avons abordés plusieurs fois des principes et des "patterns" de programmation
 fonctionnele lors des sessions.

Il est temps de refaire une passe sur quelques principes, mais avec un angle et un niveau
 d'abstraction peu souvent abordé / mis en avant...

---

## Rappels : les principes de base

----

- Penser **fonction** : c'est LA brique de base
    - "fonction" est un type de variable
    - une fonction peut "recevoir" ou "renvoyer" des fonctions
    - une fonction ne doit générer *aucun effet de bord*
    - une fonction doit *toujours "renvoyer" quelque chose*

----

- Les fonctions doivent-êtres les plus courtes possibles, et ne faire qu'une seule chose !

----

- Chaque ligne de code devrait être une déclaration de fonction...
    - ou une composition !

----

- Comme chaque ligne de code doit avoir une valeur, les if(), for() ... sont à
 proscrire

----

- Pour "boucler" (si besoin), on fait appel à la récursivité
    - ... où on utilise une structure de donnée récursive (tableau...)

----

- Avec nos fonctions, on manipule des données typées
    - idéalement, *immutables*

----


- Une fonction est un "convertisseur" entre les types d'entrée et le type de sortie :
    - string -> number
    - (number, number) -> number
    - Personne -> contrat

----

- Et enfin...
    - un programme doit-être une composition de fonctions...
    - ... dont la fonction "terminale" doit-être la seule autorisée à effectuer un effet de bord.

----
&nbsp;

    afficheTotal(
        convertisDevises(
            EUR,
            DOLLAR,
            getDebits(
                getContrats(
                    getClientID(
                        "DUPONT Jean"
                    )
                )
            )
        )
    )
    

---

## Mais ça ne suffit pas !

----

Bien sûr que ca ne suffit pas.

On le voit bien : la composition de fonction, c'est "élégant", mais ça ne compose que très 
moyennement...

----

... tellement moyennement qu'il suffit d'ajouter une promise la dedans, un observable,
un tableau de données mal placé, où une petite gestion d'exception pour que ça soit "la cata".

----

LA solution, on en a déjà parlé : c'est bien sûr d'avoir recour au "boîtes" !

----

Mais avant de reparler de ces fameuses boites, prenons un peu de recul sur un aspect fondamental...


---

## Du mode d'execution des programme

----

Parce que en réalité, la PF, c'est **avant tout un moyen de contrôler le flot d'execution** de notre programme, 
de façon <small>presque</small> "transparente", sans *goto*, sans *if*, sans branchements complexes..

----

La programmation fonctionnelle , c'est décrire le **"quoi faire"**
au lieu du **"comment le faire"**.

----

![](medias/wat.jpg) 

----

## Programmation procédurale : continuer, c'est tout droit !

----

C'est le mode choisit (majoritairement) pour apprendre à programmer et c'est bien souvent le mode qui 
perdure ensuite.

----

Pourquoi ? Il faut se pencher sur le rapport entre le programme 
**tel qu'il est écrit**, et la façon **dont il s'execute** pour le comprendre...

----
 
(debut) -> instruction -> modification de mémoire -> instruction -> 
modification de mémoire -> instruction -> (...) -> instruction -> (fin)

----

Un programme procédural est, à l'image de la **carte perforée**, une 
*succession d'ordres bien **ordonnés**, **linéaires**, déroulé par un automate possédant 
un **état général** qui évolue de façon progressive au cour du temps*, là aussi, de façon linéaire...

----

**Ce qui est "écrit"** = **"littéralement ce qui va s'executer"**.

Il sufit de suivre, de lire ligne à ligne...

----

Ce qui impacte **évidemment** la façon dont on raisonne et on code : 
en mode "reverse debugger", un mode de pensée linéaire, non pas "au jour le jour" mais
"à la ligne à la ligne"...

----

Avantage(s) ? *Grosso-modo*, un seul **vrai** avantage... 

Un contrôle "manuel" de l'execution, où l'on maitrise
exactement le flot d'execution et les états successifs de la machine, permettant aux experts de "tuner" finement
les comportements pour mettre en oeuvre telle ou telle optimisation technique...

----
&nbsp;

    char *money(const char *src, char *dst)
    {
        const char *p = src;
        char *q = dst;
        size_t len;
    
        len = strlen(src);
        switch (len % 3) {
            do {
                *q++ = ',';
                case 0: *q++ = *p++;
                case 2: *q++ = *p++;
                case 1: *q++ = *p++;
            } while (*p);
        }
        *q++ = 0;
        return dst;
    }


----
&nbsp; 

    float Q_rsqrt( float number )
    {
        long i;
        float x2, y;
        const float threehalfs = 1.5F;
    
        x2 = number * 0.5F;
        y  = number;
        i  = * ( long * ) &y;                       // evil floating point bit level hacking
        i  = 0x5f3759df - ( i >> 1 );               // what the fuck? 
        y  = * ( float * ) &i;
        y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
    //	y  = y * ( threehalfs - ( x2 * y * y ) );   // 2nd iteration, this can be removed
    
        return y;
    }    


----

L'ennui et que cette approche "code" == "execution" ne "scale" absolument pas bien du tout, ni dans le temps ni dans l'espace
(plusieurs développeurs, transmission de la connaissance...)

----

D'autant qu'un mode de pensée "linéaire", c'est très personnel (tout comme la façon d'indiquer son chemin)
donc nécessitant un "décryptage" de la part du relecteur (voir de votre futur moi !)

Et ca manque cruellement d'abstraction de haut niveau !

----

Et puis le mode linéaire, souffre autant voir plus des "obstacles" sur le chemin :

- *Branchement conditionnels, boucles* ? "Pyramid of doom"
- *Asynchronisme* ? Casse le flot des programmes (Pyramid of doom, again).
- *Multi-threading* ? Atroce à gérer correctement.
- *Complexité fonctionnelle* ? Code spagghetti, à la longue.

----
RESUME :

> Un mode d'execution "pas à pas" rend l'asynchronisme, le multithreading et la programmation
> evenementielle compliquée à gérer, de par sa nature même.

----

Pour bien se remettre dans le bain, et aborder la PF sous cet angle "mode d'execution", 
travaillons un peu sur un petit
programme "trivial" en **mode procédural** dans un premier temps !

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

### Des promesses, toujours des promesses

----

La programmation fonctionnelle cherche à résoudre **tous** ces problèmes en nous
fournissant :
- un **mode de pensée** différent, 
    - **décorellé du mode d'execution**
- des bonnes pratiques unitaires 
    - **adaptées à TOUS les modes d'executions** (asynchrone,
multithreading...)
- des concepts et leurs implémentations 
    - destiné à faciliter l'assemblage 
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

On ne parle que trop rarement du fait que la PF nous donne aussi la main
sur **le mode d'execution** du programme, et ceci **de façon transparente** :
un traitement peut devenir asynchrone, lazy, ... "for free" sans presque rien changer !

----

La pierre Angula(i)r(e) de ce principe, et du mode de pensée qui en découle 
(*celui qu'on ne met jamais assez en avant non plus*)
est de raisonner en mode "Contexte", en mode "Boites".

Le terme technique officiel étant "Monade"... 

----

Plutôt que d'**executer des fonctions**, récupérer des valeurs, **pas à pas**,
les utiliser pour **executer d'autres fonctions**, (*parfois* en les *composants* proprement), 
on va **mettre des valeurs dans des boites**,
**envoyer des fonctions dans ces boites**, et... 
**composer les boites** !

----

... et ce sont les boites, savamment composées, qui vont se charger "d'executer" le code, quand il faudra.

----

&nbsp;

    // Je mets des valeurs dans des boites...
      
    const array         = Array.from(1,2,3); // /!\ techniquement pas une Monade 
                                             // mais 'proche' 
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

&nbsp;

        // Je compose des boites
        
        // -- Array en javascript ne dispose pas de l'opérateur de composition

        // où `getContratNH` renvoit un Maybe<Contrat>
        const maybe3        = maybe2.flatMap(s => getContratNH(s));

        // où `getTicketById` renvoit un Observable<Ticket>
        const observable3   = observable2.pipe(flatMap(x => getTicketById(x)));

----

Mémo : `flatMap` **n'éxecute rien** (dans le principe) : celà crée juste une **nouvelle boite**
 programmée pour combiner / "applatir" des contextes entre eux (flatMap = map + flatten)

----

Mémo 2 : `flatMap` permet de réaliser la **composition de contextes** dynamiquement.  

----

`map` et `flatMap` : composition de fonction via la composition de contextes ! 

----

Avec ces deux opérateurs, vous pouvez décrire (en théorie) n'importe quel programme, puisque vous pouvez
composez les deux blocs fondamentaux de la programmation : fonction et execution de fonction !

----


Ce concept clé permet d'**unifier le modèle d'écriture du programme**, quel qu'en soit 
**le modèle d'execution**.

L'"abstraction" de classe de l'univers objet monte d'un cran avec l'**abstraction du mode
d'execution** porté par **le type de monade utilisé** !

----

Petite exercice de mise en pratique trèèèèss simple...

Identity, et sa version "Lazy" !

----

&nbsp;

    export class Identity<T> {
    
      static of = <T>(t: T) => new Identity(t);
    
      private constructor(readonly t: T) { }
    
      map = <U>(f: (t: T) => U) : Identity<U> => ??? 

    }
    
    const addOne = (x: number): number => x + 1;
    console.info(
        // Identity<number> -addOne-> Identity<number> -addOne-> Identity<number> 
        Identity.of(42).map(addOne).map(addOne)
    );

<small>Codez la fonction map ! </small>

----

> solution

----

- L'appel à la fonction 'map' **execute immédiatement**
 la fonction passée en paramètre sur la valeur.
- c'est bien l'**instance de Monade qui effectue l'execution**.

----

Maintenant, comment transformer cette monade en version "lazy" ?

> Lazy : code qui ne s'execute **que si celà est nécessaire**

> Variable non lazy : 42

> Variable 'lazy' : () => 42

----

&nbsp;

    export class IdentityLazy<T> {
    
      static of = <T>(t: ???) => new IdentityLazy(t);
    
      private constructor(readonly t: ???) { }
    
      map = <U>(f: (t: T) => U) => ???
    
      get = (): T => ???
    
    }

----

&nbsp;

    type Lazy<T> = () => T;
    export class IdentityLazy<T> {
    
      static of = <T>(t: Lazy<T>) => new IdentityLazy(t);
    
      private constructor(readonly t: Lazy<T>) { }

      // map = <U>(f: (t: T) => U) => Identity.of(
      //   f(this.t)
      // );

      map = <U>(f: (t: T) => U) => IdentityLazy.of(
        () => f(this.get())
      );
    
      get = (): T => this.t();
    
    }
---

## SO ??

----

Si on prend comme modèle mental un modèle à base de 'boites' pour travailler avec 
des types monadiques, on s'en sort en général plutôt bien.

<small>Attention, ce concept est théoriquement "faux"... mais il marche bien en pratique.</small>

----

Avant de nous lancer dans l'écriture d'une version "fonctionelle monadique" du problème précédent, 
faisons donc le tour "sur papier" !

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

Sans oublier ... Evol !

> Les produits sont renvoyés par un appel au backend via un Observable&lt;Array&lt;Produit>> !



----

> Présentation du diagramme...

----

> Présentation du code ...

---

# Et la valeur finale ?

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

