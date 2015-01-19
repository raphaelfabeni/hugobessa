---
layout: post
title: "Começando com React"
description: "Uma pequena visão geral de como construir interfaces com React JS"
# featured-image: "/_assets/images/posts/santos-frontend/santos-frontend.jpg"
date:   2015-01-17 01:44:00
categories: dev
---

Traduzido de [The React Quick Start Guide](http://www.jackcallister.com/2015/01/05/the-react-quick-start-guide.html), escrito por [Jack Callister](http://www.jackcallister.com/).

*Este artigo apresentará uma rápida visão geral de como construir interfaces de usuário em React JS. Aqui tem o suficiente para você começar e nada mais. Desenvolva junto com este [starter kit](https://github.com/jarsbe/react-starter-kit) (instruções no repositório) ou apenas continue lendo.*

<!--more-->

---

## Conceitos

O React tem uma API bem pequena. Isso o torna divertido de usar, fácil de aprender e simples de entender. Entretanto, ser simples não quer dizer ser familiar. Alguns conceitos precisam ser cobertos antes de começarmos de fato. Vamos dar uma olhada em cada um.

**Elementos React** são objetos JavaScript que representam elementos HTML. Eles não existem no browser. Eles representam elementos do browser como `h1`, `div` ou `section`.

**Componentes** são elementos React criados por um desenvolvedor. Eles normalmente são partes maiores de uma interface que contêm estrutura e funcionalidade. Pense em conceitos como `NavBar`, `LikeButton` ou `ImageUploader`.

**JSX** é uma técnica para criar elementos e componentes React. Por exemplo, `<h1>Hello</h1>` é um elemento React escrito em JSX. O mesmo elemento React pode ser escrito em JavaScript usando `React.createElement('h1', null, 'Hello');`. O JSX facilita a escrita e a leitura e é transformado em JavaScript antes de ser executado no browser.

**O Virtual DOM** é uma árvore JavaScript de elementos e componentes React. O React renderiza o virtual DOM no browser para tornar a interface de usuário visível. O React observa o virtual DOM procurando por alterações, automaticamente mutando o DOM do browser para corresponder com o virtual DOM.

Entendendo um pouco destes conceitos já podemos avançar e utilizar o React. Nós vamos construir uma série de interfaces de usuário, cada uma adicionando uma camada de funcionalidade sob a anterior. Nós construiremos uma listagem de fotos similar ao Instagram — aplicações de exemplos não ficam muito melhores do que isso!

---

## Renderização

A primeira coisa que faremos é renderizar um elemento virtual (um elemento ou componente React). Lembre-se, já que um elemento virtual existe apenas na memória do JavaScript, nós precisamos falar explícitamente para o React rederizá-lo no DOM do browser.

``` js
React.render(<img src='http://tinyurl.com/lkevsb9' />, document.body);
```

A função `render` aceita dois argumentos; Um elemento virtual e um nó em um DOM real. O React recebe o elemento virtual e o insere em um dado nó do DOM. A imagem agora está visível no browser.

---

## Componentes

Componentes são o coração e a alma do React. Eles são elementos React personalizados. Eles são geralmente extendidos com estrutura e funcionalidade únicas.

``` js
var Photo = React.createClass({

  render: function() {
    return <img src='http://tinyurl.com/lkevsb9' />
  }
});

React.render(<Photo />, document.body);
```

A função `createClass` aceita um objeto que implementa a função `render`.

O componente `Photo` é construído, `<Photo />`, e renderizado para o corpo do documento.

Este componente não faz mais do que o elemento React de imagem anterior, mas ele está pronto para ser extendido com mais funcionalidade e estrutura personalizadas.

---

## Props

As props podem ser consideradas como as opções de um componente. Elas são passadas como argumentos para um componente e se parecem com atributos HTML.

``` js
var Photo = React.createClass({

  render: function() {
    return (
      <div className='photo'>
        <img src={this.props.imageURL} />
        <span>{this.props.caption}</span>
      </div>
    )
  }
});

React.render(<Photo imageURL='http://tinyurl.com/lkevsb9' caption='New York!' />, document.body);
```

Dentro da função `render` do React, duas props são passadas para o componente `Photo`: `imageURL` e `caption`.

Dentro da função `render` do componente, a prop `imageURL` é usada como o `src` para o elemento de imagem do React. A prop `caption` também usada como texto dentro do elemento span do React.

Vale notar que um componente nunca deve alterar suas props, elas são imutáveis. Se um componente possui dados que são mutáveis, utilize o objeto de estado.

---

## Estado

O objeto de estado é interno a um componente. Ele contém os dados de podem ser alterados com o tempo.

``` js
var Photo = React.createClass({

  toggleLiked: function() {
    this.setState({
      liked: !this.state.liked
    });
  },

  getInitialState: function() {
    return {
      liked: false
    }
  },

  render: function() {
    var buttonClass = this.state.liked ? 'active' : '';

    return (
      <div className='photo'>
        <img src={this.props.src} />

        <div className='bar'>
          <button onClick={this.toggleLiked} className={buttonClass}>
            ♥
          </button>
          <span>{this.props.caption}</span>
        </div>
      </div>
    )
  }
});

React.render(<Photo src='http://tinyurl.com/lkevsb9' caption='New York!'/>, document.body);
```

Ter estado em um componente introduz um pouco mais de complexidade.

O componente tem uma nova função `getInitialState`. O React chama esta função quando o componente é inicializado. O objeto retornado é definido como o estado inicial do componente (como o nome da função indica).

O componente tem outra função nova, a `toggleLiked`. Esta função chama `setState` no componente, alternando o valor de `liked`.

Dentro da função de renderização do componente, a variável `buttonClass` é atribuída com `active` ou nada — depende do estado de `liked`.

`buttonClass` é usado como um nome de classe em um elemento de botão do React. O botão também tem um *event handler* `onClick` definido para a função `toggleLiked`.

Aqui está o que acontece quando o componente é renderizado no DOM do browser.

- Quando o botão do componente é clicado, `toggleLiked` é chamado.
- O estado `liked` é alterado.
- O React re-renderiza o componente no virtual DOM.
- O novo virtual DOM é comparado com o virtual DOM anterior.
- O React isola o que mudou e atualiza o DOM do browser.

Neste caso, o React mudará o nome da classe no botão.

---

## Composição

Composição significa combinar componentes menores para formar um conjunto maior. Por exemplo, o componente `Photo` poderia ser usado dentro de um componente `PhotoGallery`, como a seguir:

``` js
var Photo = React.createClass({

  toggleLiked: function() {
    this.setState({
      liked: !this.state.liked
    });
  },

  getInitialState: function() {
    return {
      liked: false
    }
  },

  render: function() {
    var buttonClass = this.state.liked ? 'active' : '';

    return (
      <div className='photo'>
        <img src={this.props.src} />

        <div className='bar'>
          <button onClick={this.toggleLiked} className={buttonClass}>
            ♥
          </button>
          <span>{this.props.caption}</span>
        </div>
      </div>
    )
  }
});

var PhotoGallery = React.createClass({

  getDataFromServer: function() {
    return [{
      url: 'http://tinyurl.com/lkevsb9',
      caption: 'New York!'
    },
    {
      url: 'http://tinyurl.com/mxkwh56',
      caption: 'Cows'
    },
    {
      url: 'http://tinyurl.com/nc7jv28',
      caption: 'Scooters'
    }];
  },

  render: function() {
    var data = this.getDataFromServer();

    var photos = data.map(function(photo) {
      return <Photo src={photo.url} caption={photo.caption} />
    });

    return (
      <div className='photo-gallery'>
        {photos}
      </div>
    )
  }
});

React.render(<PhotoGallery />, document.body);
```

O componente `Photo` é exatamente igual a antes.

Temos um novo componente `PhotoGallery` que gera componentes `Photo`. Nesse caso, temos dados falsos que retornam um array com 3 objetos, cada um com uma `url` e `caption`.

Ao iterarmos pelos dados, criaremos 3 componentes `Photo` que são inseridos no retorno de uma função `render` de um componente.

---

## Conclusão

Isto deve ser o suficiente para começar a construir interfaces de usuário com React. A [documentação do React](http://facebook.github.io/react/docs/getting-started.html) cobre tudo isso em detalhes. Eu recomendo bastante lê-la.

Além disso, este guia não entra em detalhes sobre o *setup* do seu ambiente local. A documentação entra, mas você também pode dar uma olhada no meu [boilerplate](https://github.com/jarsbe/react-webpack-boilerplate) para uma solução simples.

Se eu cometi um erro ou algo não está funcionando para você, fale comigo no [Twitter](http://twitter.com/jarsbe).