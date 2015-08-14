---
layout: post
title: "Clojure vs. JavaScript"
description: "Um pequeno exemplo da diferença entre as linguagens"
date:   2015-8-11 07:40:00
category: clojure
---

Atualmente tenho estudado [Clojure](http://clojure.org/), uma linguagem de programação funcional
bastante diferente das que estamos acostumados. Para ilustrar algumas diferenças
com JavaScript, resolvi compilar alguns exemplos. Aproveitem a beleza de um [LISP](https://en.wikipedia.org/wiki/Lisp_%28programming_language%29) :).

(É importante ressaltar que existem diferenças entre diversas funcionalidades na
linguagem, como as estrutura de dados que em Clojure são imutáveis e possuem
outras funcionalidades)

### Estruturas de dados

JavaScript*:

```js
[1, 2]   // array
{"a": 1} // object

new Map([[a:1]])            // Map
new WeakMap([[{a:1}, 1]])   // WeakMap
new Set([1, 2])             // Set
new WeakSet([{a:1}, {b:2}]) // WeakSet
```

Clojure: 

```clojure
(1 2)  ;; list
[1 2]  ;; vector
{:a 1} ;; hash map / sorted-map
#{1 2} ;; set / sorted-set
```

### Usando funções

JavaScript:

```js
function add (a, b) {
  return a + b
}

var add = function(a, b) { return a + b }

var add = (a, b) => a + b

add(1, 2)
```

Clojure:

```clojure
(defn add [a b]
  (+ a b))

(def add (fn [a b] (+ a b)))

(def add #(+ %1 %2))

(add 1 2)
```

### Funções / métodos de coleções

JavaScript:

```js
[1, 2, 3].map(x => x * 2)
[1, 2, 3].reduce((acc, x) => acc + x)
[1, 2, 3].filter(x => x % 2 === 0)
[1, 2, 3].push(4)
[1, 2, 3][0]
```

Clojure:

```clojure
(map #(* %1 2) [1 2 3])
(reduce #(+ %1 %2) [1 2 3])
(filter #(even? %1) [1 2 3])
(conj [1 2 3] 4)
(nth [1 2 3] 0)
```

### Destructuring

JavaScript:

```js
let {a, b, ...rest} = {a:1, b:2, c:3, d:4}
```

Clojure:

```clojure
(let [{:keys [a b] :as m} {:a 1 :b 2 :c 3 :d 4}
       rest (dissoc m :a :b)])
```

\* alguns exemplos usam novidades do ES2015 e ES2016

\*\* [um vídeo mostrando código em JavaScript e Clojure](https://www.youtube.com/watch?v=8UYa8PV3CXQ)
