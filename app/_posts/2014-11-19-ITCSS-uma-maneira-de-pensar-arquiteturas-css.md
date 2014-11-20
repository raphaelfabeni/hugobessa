---
layout: post
title: "ITCSS: pensando em uma arquitetura CSS"
description: "O ITCCS é uma proposta de como criarmos uma boa arquitetura CSS, criado pelo Harry Roberts."
featured-image: "{{ site.baseurl }}/_assets/images/posts/itcss/itcss.png"
date:   2014-11-20 03:09:00
categories: dev
---

Escrever CSS é muito fácil, mas escrever CSS escalável, reutilizável, manutenível e de fácil compreensão não é assim tão fácil assim. Não é à toa que este assunto gera uma quantidade colossal de artigos, palestras, discussões e projetos Open Source.

O **ITCSS** é mais uma tentativa de achar uma arquitetura CSS que finalmente resolva nossos problemas. Após ter colocado 4 projetos em produção usando uma metodologia perto da recomendada pelo ITCSS, eu digo: ele faz muito bem para o seu projeto.

<!--more-->

<em><strong>Inverted Triangle</strong> architecture for  <strong>CSS</strong></em> é uma maneira de pensar arquiteturas CSS. Ele embasa suas decisões a partir de bons princípios criados e testados durante anos por Harry Roberts (@csswizardry).

Ele foi apresentado pela primeira vez em um DaFED (um meetup na Sérvia). Se você entende bem inglês e tem uma hora, assista o [vídeo completo da palestra](https://www.youtube.com/watch?v=1OKZOV-iLj4).

Em um dos slides da palestra, Harry fala o seguinte:

> O CSS é uma gigantesca árvore de dependências. Nós precisamos de um jeito para gerenciar essas dependências em um nível bem baixo.

Quantas vezes você já se pegou escrevendo cada vez mais CSS para sobrepor regras, em vez de definir estilos? Eu pelo menos já fiz muito isso, chegando a precisar de inúmeros `!important` para fazer com que um site funcionasse da maneira correta. Nós precisamos então de uma arquitetura CSS que nos previna disso.

## Triângulo invertido?!

<p class="element element--wide">
    <img src="{{ site.baseurl }}/_assets/images/posts/itcss/itcss.png" alt="Logo do ITCSS">
</p>

A ideia por trás do ITCSS é organizar seu CSS como se ele fosse um triângulo invertido, formado por diversas camadas. Essas camadas devem ser organizadas da mais genérica para a mais específica. Da base para o topo. Uma boa organização então seria:

- Configurações (se usar pré-processador)
- Ferramentas (se usar pré-processador)
- Estilos genéricos
- Estilização básica de elementos HTML
- Objetos
- Componentes
- "Trumps"

Dessa forma, evitamos problemas com especificidade (o Calcanhar de Aquiles da maioria das *stylesheets*) e ganhamos facilidade de manutenção e reutilização.

Abaixo, explico a função de cada uma das camadas propostas pelo ITCSS.

## Configurações (settings)

Se você usa um pré-processador, como o Sass, no topo do seu arquivo principal você terá uma camada apenas para definir configurações. Estas configurações podem ser variáveis globais de cor e espaçamento ou então variáveis que ativam módulos do seu framework/UI Kit.

No meu blog eu tenho dois arquivos nesta camada: um para ativar módulos do framework que utilizo e outro para as cores do meu site.

```scss
$inuit-base-font-size: 18px;
$inuit-base-line-height: 28px;
```

```scss
$color-black: #333;
$color-blue: #0074D9;

$color-text: $color-black;
$color-attention: $color-blue;
```

## Ferramentas (tools)

O ITCSS também sugere uma camada para ferramentas, caso você use um pré-processador. Nela você colocará todos os seus *mixins* e funções. Coisas como `px-to-rem` ou `font-face`.

## Estilos genéricos (generic)

É nesta camada que fica o código que deve definir regras muito genéricas. Além de usá-la para colocar um *reset* ou um *normalize*, você também pode escrever seletores bem abrangentes.

Eu a uso para incluir um *normalize* e também para aplicar `box-sizing: border-box` e um `outline-color` em todos os elementos do meu site.

```scss
* {
    box-sizing: border-box;
    outline-color: $color-brand;
}
```

## Estilização básica de elementos HTML (base)

Seguindo para baixo do triângulo invertido temos a camada base, uma casa para seletores para estilização básica destes elementos da nossa página. Aqui definimos a aparência de `<a>`, `<blockquote>`, `<ul>`, `<h1>` e todos os outros elementos HTML desejados.

É importante termos cuidado nesta camada. Pode ser muito atrativo aplicar diversos estilos em um `<button>`, por exemplo, quando na verdade é melhor abstrairmos alguns desses estilos em um objeto reutilizável e aplicável em diversos elementos além do `<button>`. Tenha o cuidado de adicionar apenas estilos que são específicos para cada tag.

Um pequeno exemplo:

```scss
a {
    color: $color-attention;
}

mark {
    background-color: $color-highlight;
    padding: 2px 4px;
}
```

## Objetos (objects)

Baseado nos princípios de CSS orientado a objetos, o ITCSS sugere uma camada para objetos.

Objetos são pequenos pedaços de uma interface, normalmente padrões de design, que se repetem em todo o seu site. [Objetos media](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/), `.button` e `.ui-list` são alguns que se encaixam nesta camada.

O ITCSS estabelece que devemos utilizar apenas classes a partir daqui. Um exemplo utilizando o padrão de nomenclatura BEM seria:

```scss
.ui-list{
    margin: 0;
    padding: 0;
    list-style: none;
}

    .ui-list__item {
        padding: $spacing-unit;
    }
```

## Componentes (components)

Partes de uma interface com estilos mais definidos e específicos. É aqui que estilos para uma "lista de produtos" ou "cabeçalho principal" seriam encontrados.

Eu tenho uma grande preferência por escrever boa parte dos meus estilos dentro da camada de objetos, tentando abstrair ao máximo o comportamento de pequenas partes da interface visual dos sites que desenvolvo. Em projetos atuais, isso possibilitou que eu editasse e replicasse o comportamento de um objeto entre diversos componentes e páginas.

Muitas vezes tendemos a estilizar objetos de dentro de componentes, duplicando código caso este mesmo objeto tenha estes mesmos estilos dentro de um outro componente. Nestes casos o ideal é criar variações do próprio objeto.

Porém, existe sim muito valor nos componentes, principalmente se você não quer criar alternativas para diversos objetos que são diferentes apenas em um componente bem específico. Como no exemplo abaixo:

```scss
.products-list {
    border-top: 1px dashed $color-brand;
}

    .products-list__item {
        border-bottom: 1px solid $color-brand;
    }
```

## "Trumps"

Até assistir a [palestra do Harry Roberts no Dafed](https://www.youtube.com/watch?v=1OKZOV-iLj4), eu não sabia o que essa camada realmente significava. "Trumps" significa "ganhar de", ou seja, nesta camadas temos seletores que trazem estilos que devem ganhar de todos os outros.

Bons exemplos são: `.m` para margens, `.p` para paddings e `.error` para estilos de erro. Segundo o ITCSS, aqui é perfeitamente aceitável que você use `!important`, já que estas classes devem ser utilizadas ativamente, não em reação a um problema de especificidade.

```scss
.m {
    margin: $spacing-unit !important;
}
```

Estas são todas as camadas que a maioria dos projetos precisará. Levando em consideração a ordem das camadas do triângulo invertido, você também pode deletar ou incluir mais camadas (testes, páginas…) se achar necessário dentro do seu projeto.

## Algumas dicas

A melhor forma de começar a usar o ITCSS hoje é utilizando o [Inuitcss](https://github.com/inuitcss), framework criado também pelo Harry Roberts durante mais de três anos de pesquisas, implementações e melhorias.

Ao contrário de UI Kits (Bootstrap, Foundation…), o Inuitcss estabelece apenas uma base sólida para você começar o desenvolvimento de um site. Ele têm sido meu braço direito na busca por uma boa arquitetura CSS.

O Inuitcss possui um [ótimo tutorial para iniciantes](https://github.com/inuitcss/getting-started) que fala bastante sobre o framework e toda a filosofia por trás dele. Vale muito a pena a leitura, mesmo que você acabe utilizando um UI Kit.

O melhor do ITCSS é que você não precisa se prender ao Inuitcss ou a qualquer outro framework. Além de sempre poder implementar o seu próprio framework, você pode tentar organizar o seu framework atual de uma forma que ele siga mais os princípios do ITCSS. Nós nem sequer precisamos seguir uma metodologia de nomenclatura de arquivos/classes específica.

Eu também recomendo que você leia todo o [CSSGuidelines](http://cssguidelin.es). Lá estão a maioria das coisas que você precisa saber e considerar na hora de escrever um CSS realmente bom.

Ainda está escrevendo muito código para compatibilizar seu site com browsers mais antigos ou ainda cria CSS específicos para cada página? Então você **precisa** ler o [CSSGuidelines](http://cssguidelin.es).

Se você quer ter uma referência de como o ITCSS pode ser aplicado em projetos reais, dê uma olhada no [repositório do csswizardry.com](https://github.com/csswizardry/csswizardry.github.com) ou então no [repositório do meu blog](https://github.com/hugobessaa/hugobessa) (ainda não refatorei complemente, mas estou no caminho).

Infelizmente muitas das boas referências de utilização do ITCSS ainda estão muito atreladas ao Harry Roberts. Eu espero que com o tempo cada vez mais artigos e projetos Open Source sobre o assunto apareçam.

Agora estude e comece a implementar um boa arquitetura CSS!
