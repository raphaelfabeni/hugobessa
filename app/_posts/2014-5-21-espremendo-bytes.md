---
layout: post
title:  "Espremendo bytes"
description: "Ninguém gosta de ficar esperando, principalmente quando o tempo que temos para gastar está dentro de um ônibus, entre o ponto A e o ponto B"
date:   2014-5-21 1:20:00
category: dev
---

Ninguém gosta de ficar esperando, principalmente quando o tempo que temos para gastar está dentro de um ônibus, entre o ponto A e o ponto B. Então, o tempo entre acessar um link e de fato consumir seu conteúdo deve ser o menor possível.

<!--more-->

Eu criei este blog com a velocidade em mente desde o início. Esse foi inclusive um dos maiores pontos positivos que levei em conta ao escolher entre um CMS como o WordPress e um gerador estático como o [Jekyll](http://jekyllrb.com). Mas por que um site estático é potencialmente muito mais rápido?

Em primeiro lugar, seu servidor não precisa executar nenhum arquivo para gerar a resposta para a requisição do cliente. Isso pode parecer pouco, mas quando cada millisegundo conta, servir um arquivo previamente gerado ajuda a fazer diferença.

Outro grande motivo é a facilidade com que podemos brincar com os arquivos gerados. Neste blog eu uso o [Grunt](http://gruntjs.com) com diversos plugins para me ajudar a espremer cada byte de cada um dos arquivos. Imagens, scripts, stylesheets e htmls. Todos recebem tratamento antes de serem publicados aqui.

Um dos plugins mais interessantes que coloquei aqui foi o [grunt-uncss](https://github.com/addyosmani/grunt-uncss). Em vez de minificar os arquivos para retirar bytes desnecessários para o computador, o UnCSS vai na frente e analisa todas as páginas do site para saber quais estilos serão realmente utilizados pelo site. Isso ajuda a retirar cada seletor que está somente adicionando peso à sua stylesheet. Aqui, onde eu já tomei cuidado para não incluir seletores inúteis, ele ajudou a diminuir o css de 17KB para apenas 4KB (com a ajuda também do ótimo [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)).

A configuração é bastante simples ([arquivo original](https://github.com/hugobessaa/hugobessa/blob/master/Gruntfile.js#L143-L153)):

```javascript
uncss: {
    prod: {
        options: {
            htmlroot: './dist/',
            report: 'gzip'
        },
        files: {
            './dist/_assets/css/main.css': ['./dist/**/*.html']
        }
    }
}
```

Além de minificar o css, também espremo meus htmls com o [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin). Cheio de opções, ele reduz ao máximo o tamanho dos htmls e de todos os elementos `<script>` e `<style>` dentro deles.

Entretanto, as imagens são, sem dúvida, os arquivos mais pesados que seu site serve para o usuário. Otimizá-las é praticamente obrigatório, principalmente quando você serve imagens para telas de alta resolução como eu faço. Por enquanto estou utilizando o [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin), mas [dizem que ele não é o melhor nisso](http://jamiemason.github.io/ImageOptim-CLI/).

<blockquote class="pullquote">Otimizar é praticamente obrigatório</blockquote>

Uma dica importante que aprendi foi a utilizar `.jpgs` com 1.5x o tamanho a ser mostrado, com 65-75% de qualidade, progressivos e otimizados com um [algoritmo lossless](http://pt.wikipedia.org/wiki/Compressão_sem_perda_de_dados). Dessa forma elas ficam bonitas em telas de alta resolução, mas com tamanhos ainda aceitáveis. Ainda não mergulhei nas imagens responsivas, mas [parece que finalmente estamos chegando a uma solução interessante](http://www.smashingmagazine.com/2014/05/14/responsive-images-done-right-guide-picture-srcset/) para elas.

Se você quiser dar uma olhada como eu configurei meu `Gruntfile.js` ou como faço qualquer outra coisa neste blog, [todo o código-fonte dele está disponível](https://github.com/hugobessaa/hugobessa) no GitHub.

Leia também sobre [como simular conexões lentas localmente]({{ site.baseurl }}/posts/simulando-conexoes-lentas-no-localhost/). Fazer isso pode ser bastante útil para saber se você pode melhorar sua página com *lazy loading* e outras técnicas.