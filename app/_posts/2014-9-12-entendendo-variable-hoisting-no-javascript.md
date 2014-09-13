---
layout: post
title: "Entendendo variable hoisting no JavaScript"
description: "Dominar o conceito de escopo e entender variable hoisting é essencial"
featured-image: "/_assets/images/posts/entendendo-variable-hoisting-no-javascript/hero.png"
date:   2014-9-12 22:12:00
categories: dev
---

*Variable hoisting* é o procedimento do JavaScript que move declarações para o topo de seus escopos atuais. Por não ser explícito, desconhecer como isso funciona pode trazer boas dores de cabeça.

Qual você acha que será a saída no Console do seguinte script?

```javascript
var number = 10;
function init(){
	console.log(number);
	var number = 5;
}
init();
```

<!--more-->

Existe uma grande chance de que você achou que a saída seria `10`. Por causa da forma como o JavaScript trata declarações e escopos, a saída deste script é `undefined` (!). Isso mesmo, pode conferir no Console do seu navegador. Para entender como e porque isso acontece, é muito importante primeiro compreender o escopo no JavaScript.

## Um pouco sobre escopo no JavaScript
Escopo em uma linguagem de programação é basicamente a seção em que suas declarações estarão visíveis. No JavaScript, temos o escopo global, que pode ser acessado por qualquer script da página, e o local, que está visível apenas para quem está do lado de dentro. Funções são a principal forma de criar escopos locais no JavaScript. Para simplificar este artigo tratarei das outras maneiras de criar escopos locais apenas ao final.

Tudo isso significa que as variáveis que são declaradas dentro de um escopo local só podem ser acessadas por quem estiver do lado de dentro. Uma variável `count` declarada dentro da função `countHumans` não estará visível na função `countAnimals` no exemplo a seguir:

```javascript
var humans = ['Hugo', 'Jéssica', 'Victor'];
var animals = ['dog', 'cat'];

function countHumans() {
	var count = humans.length;
	return count;
} // => 3

function countAnimals() {
	var count = animals.length;
	return count;
} // => 2
```

Graças a essa funcionalidade, podemos utilizar bons nomes nas nossas variáveis sem nos preocuparmos demais com conflitos entre elas.

Escopos que estão dentro de outros podem acessar todas as variáveis ali declaradas, tanto para ler quanto para mudar seus valores.

## Como funcionam as declarações
Declarar variáveis é algo extremamente necessário. Sem isso nossos códigos seriam simplesmente complicados demais. No JavaScript, declaramos uma variável usando o termo `var` seguido do nome que ela levará. Ela será adicionada ao escopo atual.

O termo `function` também simboliza uma declaração de uma variável. `function add(){}` cria a variável `add` no escopo atual. Funções anônimas também podem ser declaradas ao omitirmos o nome (`function(){}`).

Porém, ao contrário do que você talvez imagine, todas as declarações são feitas quando seu código JavaScript começa a ser compilado. Só depois do que chamamos de *Compile Time*, o script começa a ser executado (na fase que chamamos de *Runtime*).

O processo ocorre mais ou menos assim:

1. Durante o *Compile Time*, todo o código é analisado. Declarações são encontradas e todas as variáveis são criadas dentro de seus respectivos escopos.
1. Após cada linha ser analisada, entramos em *Runtime*. Seu código é, então, executado.

Sendo assim, mesmo que sua declaração esteja no meio do código, ela será “içada” (<em>hoisted</em>, em inglês) para o início do escopo em que ela está inserida. Neste momento, todas as variáveis declaradas com o termo `var` ganham o valor de `undefined` e as funções têm seu conteúdo compilado. É isso que chamamos de *hoisting*. Apenas quando entramos em *Runtime* todas as linhas são executadas, incluindo as atribuições.

Um pouco de código para entendermos melhor:

1. A linha `var name = 'hugo';` é interpretada durante o *Compile Time*.
1. A variável `name` é criada no escopo em que está inserida.
1. Supondo que não temos mais linhas no código, terminamos o *Compile Time*.
1. Em seguida voltamos à esta linha, que é executada durante o *Runtime*.
1. Uma referência a `name` é procurada dentro do escopo atual.
1. Quando a referência é encontrada, o valor `'hugo'` é atribuído a ela.

## Entendendo melhor o primeiro exemplo
No primeiro exemplo, vimos que a saída no Console foi `undefined`, mesmo tendo uma variável `number` já declarada antes da função ser executada.

```javascript
var number = 10;
function init(){
	console.log(number);
	var number = 5;
}
init();
```

Isso aconteceu porque este script foi interpretado da seguinte forma:

#### *Compile Time*
1. Começamos o *Compile Time* declarando a variável `number` da primeira linha no escopo global.
1. Logo depois declaramos a função `init` e iniciamos a sua compilação.
1. Dentro do escopo de `init` encontramos a declaração de `number` e adicionamos uma referência a ela dentro deste escopo.
1. Nenhuma outra declaração é encontrada e não temos nenhum erro de sintaxe. O *Compile Time* é finalizado.

Neste momento o código está virtualmente assim:

```javascript
// var number; (declarada no escopo global)
function init(){
	// var number; (declarada no escopo de init)
	console.log(number);
	number = 5;
}

number = 10;
init();
```

#### *Runtime*
1. Entramos no modo de execução. Pulando as declarações, começamos com `number = 10`.
1. A variável `number` do escopo global é a que recebe o valor de `10`
1. Em seguida, a linha `init()` executa a função `init`.
1. Dentro de `init` rodamos o `console.log(number)`. `number` se refere à `number` do escopo de `init`. Por enquanto o valor deste `number` é `undefined`.
1. Na última linha da função `init`, executamos `number = 5`. A variável `number` de dentro do escopo de `init` agora tem o valor de `5`.

Esse comportamento de "içar" variáveis parece anormal, já que esperamos que a declaração e atribuição da variável aconteçam no mesmo momento e na linha em que ela se encontra. Porém, por causa da forma como o JavaScript é compilado e interpretado, estas duas ações acontecem em momentos diferentes.

Ter a fase de compilação do JavaScript é essencial para que o script seja validado corretamente pelo navegador ou outra plataforma que executará seu código. Além disso, quem executa o JavaScript pode preparar de antemão cache para escopos, variáveis e funções.

Entender pelo menos o básico de escopo e *variable hoisting* é essencial para escrevermos JavaScript de qualidade.

## Evitando problemas
Para evitar que você tenha problemas por causa do *hoisting*, a melhor dica que posso te dar é: declare as variáveis no início do escopo, mesmo sem a inicialização.

```javascript
function countUsers() {
	var count, users;
	users = app.users;
	count = users.length;

	return count;
}
```

Para te ajudar a encontrar lugares onde o *hoisting* pode trazer problemas, é interessante usar um *linter* ou *hinter* no seu código. Essas ferramentas analisam o que você escreveu e te dão dicas para melhorar. Um dos mais conhecidos é o [JSHint](http://www.jshint.com).

## Outras formas de criar escopos
Além de funções, existem também outras formas de se criar um novo escopo no JavaScript:

- Usando a função `eval()`. Mas evite, pois [Eval is Evil](http://stackoverflow.com/questions/86513/why-is-using-the-javascript-eval-function-a-bad-idea).
- Dentro de `catch` em um `try`. [Saiba mais sobre `try…catch`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/try...catch).
- Dentro de um `with`. [Saiba mais sobre `with`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with). Evite este cara também.

Escopos não são criados dentro de todos os blocos, logo, variáveis declaradas dentro de `if`, `for`, `switch` ou outro bloco são criadas dentro do escopo em que estes blocos estão.

Porém, a partir do EcmaScript 6 (nova  versão da especificação para implementação do JavaScript), o termo `let` nos deixará declarar variáveis que são criadas em escopos dentro destes blocos. Isso vai ser bem interessante, já que permitirá a criação de variáveis dentro de loops `for`, por exemplo. [Veja um pouco mais sobre como usar o `let`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/let).

## Aprendendo ainda mais sobre escopos
Neste artigo eu abordei apenas o básico sobre escopo para que você possa compreender o que é o *variable hoisting* no JavaScript. Se você quer continuar aprender mais sobre escopos, recomendo o livro [You Don't Know JS: Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md) do Kyle Simpson. Ele é gratuito.

***

Este é um dos meus primeiros artigos mais densos sobre JavaScript. Se você ainda estiver com dúvidas, [comente neste post](#comments) ou então envie um tweet para [@hugobessaa](https://twitter.com/hugobessaa).
