---
layout: post
title:  "Melhorando seus loops usando o Lo-Dash"
description: "Loops complexos podem virar um grande problema. O Lo-Dash resolve este problema com métodos simples e úteis"
date:   2014-6-19 11:59:00
category: dev
---

Os loops são uma grande parte de diversas aplicações. Usamos eles para iterar dentro de listas, filtrar dados, retirar dados, analisar objetos, ordenar valores e muito mais.

Mas manter loops complexos pode trazer uma boa dor de cabeça para você e seu time. Diversos condicionais, alguns `return` e pouca manutenabilidade. Mas existe uma solução para este caos.

<!--more-->

[**Lo-Dash**](http://lodash.com "Site da biblioteca de utilitários Lo-Dash") é uma biblioteca de utilitários que traz diversos métodos interessantes para você brincar com arrays, objetos e muito mais.

Já faz algum tempo que uso o Lo-Dash (ou seu irmão mais velho [underscore](http://underscorejs.org)) nos meus projetos mais complexos. Ele me ajudou muito a escrever scripts mais legíveis e coesos. Inspirado por um [post do Joel Hooks](http://joelhooks.com/blog/2014/02/06/stop-writing-for-loops-start-using-underscorejs/ "Post do Joel Hooks sobre abandonar completamente o uso do for") sobre abandonar completamente o uso do `for`, passei a utilizar o Lo-Dash ainda mais.

Começando com um exemplo mais simples, com ele podemos criar filtros facilmente:

```javascript
var characters = [
    { 'name': 'barney', 'age': 36, 'blocked': false },
    { 'name': 'fred',   'age': 40, 'blocked': true }
];

_.filter(characters, { 'age': 36 });
// → [{ 'name': 'barney', 'age': 36, 'blocked': false }]
```

Podemos ir além e filtrar a partir do retorno de uma função:

```javascript
var characters = [
    { 'name': 'barney', 'age': 36, 'blocked': false },
    { 'name': 'fred',   'age': 40, 'blocked': true },
    { 'name': 'john',   'age': 44, 'blocked': true }
];

_.filter(characters, function(character){
    return character.age >= 40;
});
// → [{ 'name': 'fred', 'age': 40, 'blocked': true },
//    { 'name': 'john', 'age': 44, 'blocked': true }]
```

Esses dois exemplos exigiriam algumas linhas de código a mais se fossem implementados com loops convencionais e com certeza deixariam o script mais difícil de entender.

Outro método interessante do Lo-Dash é o `where`, que analisa uma lista e a compara com um conjunto de chaves e valores, retornando um array com todas as correspondências.

```javascript
_.where(listOfPlays, {author: "Shakespeare", year: 1611});
// → [{title: "Cymbeline", author: "Shakespeare", year: 1611},
//    {title: "The Tempest", author: "Shakespeare", year: 1611}]
```

Usar o Lo-Dash também permite facilmente que fujamos de um código sem coesão, já que na maioria de seus métodos é possível passar uma função como callback. [Evitando o uso de funções anônimas](http://toddmotto.com/avoiding-anonymous-javascript-functions/), podemos inclusive tornar nosso código muito mais testável e legível.

```javascript
var isOfLegalAge = function(person){
    return person.age >= 18;
}

_.filter(characters, isOfLegalAge);
```

Isto não é muito melhor que o loop abaixo?

```javascript
var charactersOfLegalAge = [];
for (var i, len = characters.length; i < len; i++) {
    var character = characters[i];

    if (character.age >= 18) {
        charactersOfLegalAge.push(character);
    }
}
```

É claro que um `for` é mais rápido do que o `_.filter`. Mas em um projeto grande, com diversos desenvolvedores envolvidos, a legibilidade deve ser levada em conta antes do que a performance. Até porque seu impacto na performance em aplicações "normais" não é tão grande assim.

Se você vai usar apenas alguns métodos básicos e não precisa se preocupar com suporte para browsers antigos, você pode inclusive utilizar os [métodos que vieram no EcmaScript 5](http://kangax.github.io/compat-table/es5/).

O Lo-Dash conta com outras dezenas de métodos interessantes, módulo AMD, CommonJs e até pacotes para cada um de seus métodos. O legal disso é que ele pode ser usado tanto no client-side quanto do server-side. Não deixe de [visitar o site do Lo-Dash](http://lodash.com) para conhecer mais sobre esta incrível biblioteca.