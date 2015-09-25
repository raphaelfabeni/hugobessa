---
layout: post
title: "Componentes"
description: ""
date:   2015-9-22 09:30:00
category: dev
---

Recentemente muito se está falando de componentes, unidades de funcionalidade que podem ser reutilizadas por toda uma interface, como botões e menus no Bootstrap.

Toda a comunidade está procurando uma solução definitiva para esse problema. Temos coisas tão simples quando o [module pattern](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html) até [diretivas](https://docs.angularjs.org/guide/directive) do Angular. Temos também aquela incrívelmente complexa e nunca acabada especificação: Web Components.

E se nossos componentes pudessem ser como funções?

Funções no JavaScript possuem certas características, dentre elas:

- Recebem dados a partir de argumentos
- Trabalham de forma encapsulada, em um escopo próprio
- Retornam um valor reutilizável por outras funções
- Podem ser usadas como dado

Ora, se funções são tão poderosas na nossa linguagem, e podem ser utilizadas de tantas formas, por que nossos componentes também não podem ser assim?

Apesar de estas características serem extremamente simples, quase todas as formas atuais de escrever componentes falham em oferecer a flexibilidade que temos com funções.

Vamos então começar a imaginar como seria um sistema de componentes simples e eficiente como funções.

*Importante: Os exemplos a seguir usam sintaxe ES2015 e ES2016. Não conhece? Aprenda aqui:
[JSRocks](http://jsrocks.org/pt-br/).*

```js
var component = (data) => output
```

Um componente seria uma função que recebe dados e simplesmente retorna mais dados. Ok, isso parece simples. Que tal um exemplo um pouco mais real:

```js
var button = (text) => DOM.button({innerHTML: text})
```

Nosso `button` agora é uma função, que recebe uma string em `text` e retorna um elemento `<button>` aplicando `text` à propriedade `innerHTML`, usando nossa biblioteca imaginária `DOM`.

O componente `button` é genérico e pode ser reutilizado em diversas partes do nosso código. Um botão sozinho não é capaz de muitas coisas, então, é melhor criar um componente um pouco mais útil:

```js
var searchButton = () => button('Search')
```

`searchButton` é um componente que simplesmente retorna um botão com um texto específico. Poderíamos criar muitos outros desses:

```js
var searchButton = () => button('Search')
var loginButton = () => button('Login')
var sendButton = () => button('Send')
var likeButton = () => button('Like')
```

Isso tudo é só JavaScript, certo? Então poderíamos diminuir o boilerplate deste pequeno código usando [currying](http://www.dustindiaz.com/javascript-curry/):

```js
var cButton = (text) => () => button(text)

var searchButton = cButton('Search')
var loginButton = cButton('Login')
var sendButton = cButton('Send')
var likeButton = cButton('Like')
```

Ok, usar apenas funções já começou a virar uma vantagem.

Já que temos o `searchButton`, nada melhor do que criar um componente inteiro de busca, com uma caixa de texto, botão e lista de resultados.

Para a caixa, vamos precisar de um `form`:

```js
var box = (content) => DOM.form({children: content})
```

A propriedade `children` é um aviso para a nossa biblioteca `DOM` de que esta variável contém outros componentes.

Seria interessante também que ela tivesse uma borda cinza para separá-la do resto da interface.

```js
var style = {
  border: '1px solid gray'
}

var box = (content) => (DOM.form({
  ...style,
  children: content
})
```

No futuro, esse form receberá a `action` para qual ele será enviado. Vamos deixar este código pronto já também:

```js
var box = (action, content) => (DOM.form({
  ...style,
  children: content,
  action: action
})
```

Legal. Agora precisamos da caixa de texto:

```js
var searchInput = () => DOM.input({
  type: 'search',
  name: 'query',
  placeholder: 'Enter your query'
})
```

Até agora, temos `box`, `searchInput` e `searchButton`. Vamos juntar os três em um `searchBox`:

```js
var searchBox = (action) =>
  box(action, [
    searchInput(),
    searchButton()
  ])
```

Parando um pouco para apreciar este código, conseguimos perceber algumas coisas. Uma delas é: como componentes são apenas meras funções, eles podem se compor e aos poucos formar nossa interface. Um `button` vira um `searchButton`. O conjunto de `box`, `searchInput` e `searchButton` vira uma `searchBox`.

Até agora, tudo está bem simples. Vamos começar a complicar um pouco. Para um campo de busca ser útil, precisamos mostrar os resultados da busca. Como seria então a nossa lista de resultados?

Uma simples `ul`.

```js
var searchResults = (results) => DOM.ul()
```

Para tratar os resultados, vamos criar uma função que retorna uma `li` para cada item no nosso array `results`.

```js
var results = [
  'Alex',
  'Alexa',
  'Alysson',
  'Alessandro',
  'Almir'
]

function resultsToLi (results) {
  return results.map((result) => DOM.li({innerHTML: result}))
}
```

Assim, podemos utilizar nossa função para mostrar os resultados dentro da `ul`:

```js
var searchResults = (results) => DOM.ul({
  children: resultsToLi(results)
})
```

Já temos os dois componentes necessários para fazer nosso aplicativo de busca: `searchBox` e `searchResults`. Cada um deles foi criado a partir de funções e outros componentes. Usamos o método `map` de arrays para transformar uma simples coleção de nomes em uma coleção de elementos `li`.

Vamos então finalizar a conexão entre eles para construir nosso aplicativo. Precisamos agora de uma forma de conectar esses componentes e renderizá-los na nossa página:

```js
var app = (results) =>
  DOM.div({
    children: [
      searchBox('/search'),
      searchResults(results)
    ]
  })
```

Para podermos atualizar os resultados quando enviamos nossa pesquisa dentro do `searchBox`, vamos adicionar a possibilidade de passar uma função para cuidar do evento `submit`.

```js
// primeiro atualizamos `box`, para recever `onSubmit`
var box = (action, content, onSubmit) => (DOM.form({
  ...style,
  children: content,
  action: action,
  onSubmit: onSubmit // função para cuidar do evento `submit`
})

// depois atualizamos `searchBox`
var searchBox = (action, onSubmit) =>
  box(action, [
    searchInput(),
    searchButton()
  ], onSubmit) // agora mandamos este último argumento

// por fim, definimos a função
function onSubmit (event) {
  event.preventDefault()
}

var app = (results) =>
  DOM.div({
    children: [
      searchBox('search', onSubmit), // também passamos o onSubmit aqui
      searchResults(results)
    ]
  })
```

Esta função `onSubmit` não é nada útil por enquanto. Precisamos de alguma forma de renderizar nosso aplicativo com os resultados atualizados. Vamos imaginar então uma forma bem simples de fazer isso: usando uma função.

```js
render(app([]), document.body)
```

A função `render` recebe o resultado do componente `app` e o renderiza finalmente na página, dentro do elemento `body`.

Como `app` é apenas uma função, podemos executar `render` novamente com novos dados. Nosso `onSubmit` então faria algo como:

```js
function onSubmit (event) {
  event.preventDefault()
  var action = event.target.action

  fetch(action)
    // quando recebemos os resultados, renderizamos o app com eles
    .then((results) => render(app(results), document.body))
}
```

***

Utilizar apenas funções para criar nossos componentes se mostrou bastante flexível. Podemos compor simples funções para gerar um aplicativo inteiro. Essas funções podem ser reutilizadas em outros contextos. E continuamos tendo as vantagens das funções:

- Recebem dados a partir de argumentos
- Trabalham de forma encapsulada, em um escopo próprio
- Retornam um valor reutilizável por outras funções
- Podem ser usadas como dado

Este exemplo não funciona por si só. Eu também escondi alguns detalhes para mantê-lo ditático. Porém, isso não significa que fazer isso não é possível: o [React](https://facebook.github.io/react/) funciona praticamente desta forma, assim como o [virtual-dom](https://github.com/Matt-Esch/virtual-dom).

Existe uma alternativa à complicada API dos Web Components e diretivas Angular. Uma alternativa que torna possível usarmos componentes como argumentos, compô-los e usar apenas JavaScript para resolver nossos problemas. E por ser apenas JavaScript, podemos até renderizar estes componentes no servidor, usando Node.

λ
