---
layout: post
title:  "Otimização de imagens"
description: "Imagens são uma das partes mais pesadas de um site. Otimize seu site usando ferramentas para diminuir o peso de suas imagens"
featured-image: "/_assets/images/posts/otimizacao-de-imagens/hero.jpg"
date:   2014-8-23 12:02:00
categories: dev
---

Imagens são uma das partes mais pesadas de um site, principalmente na era das telas de alta-resolução. Otimizá-las pode ser a linha que divide um site lento de um site rápido.

<!--more-->

Existem diversas formas de diminuir o impacto que sua imagens causam no peso do seu site. Diminuir a qualidade de um `.jpg`, saber quando usar cada um dos formatos disponíveis e rodar algoritmos de compressão são só algumas dessas formas. Neste post falarei sobre algumas ações simples que podem fazer toda a diferença no seu site, além de mostrar ferramentas que podem facilitar e muito o seu dia-a-dia.

## Escolhendo o formato correto

Cada um dos formatos de imagens existe para atender algumas necessidades ou casos de uso. Escolher o correto é crucial.

Um dos formatos mais utilizados na web é o **JPEG**. Devido a sua alta flexibilidade de compressão e compatibilidade com a web, ele ganhou espaço em quase todas as páginas na internet. Uma das suas únicas desvantagens é a falta de suporte a canais alpha (transparência).

O **PNG** também é outro formato bem comum. Indicado para uso em imagens com poucas cores, a compressão sem perdas, compatibilidade com todos os navegadores e suporte total a transparências são suas grandes vantagens. Em imagens fotográficas e com muitas cores seu peso aumenta consideravelmente, então deve ser evitado para este tipo de conteúdo.

Representando as imagens vetoriais na internet, o **SVG** está ganhando muitos corações de designers e desenvolvedores web. Dentre seus pontos fortes estão: renderização exímia em telas de alta-resolução, editáveis e animáveis via código (tanto CSS quanto JavaScript), baixo peso e suporte a compressão gzip. Compatível com todos navegadores modernos, seu uso trará problemas apenas em projetos que precisam funcionar no IE 8 ou anteriores. Por ser vetorial, SVGs não podem ser utilizados para conteúdo fotográfico.

Presente em sites praticamente desde o início da internet, o **GIF** também é uma opção a se considerar. O único com bom suporte a animações, seu uso pode se restringir a quando você precisa dessa funcionalidade. Em outras ocasiões, os outros formatos performam melhor.

Apesar de não ser um formato de imagem, as chamadas **Icon Fonts** estão sendo bastante utilizadas para mostrar principalmente ícones em interfaces na web. Esta técnica consiste em construir uma fonte personalizada a partir de imagens vetoriais. Uma das grandes vantagens é sua alta compatibilidade (IE 7+), seguida pela escalabilidade e possibilidade de mudar a cor. Por ser uma fonte, você pode escolher apenas uma cor.

No final, a escolha de qual formato correto para utilizar depende muito do conteúdo da imagem e de como ela será aplicada no seu site. Se estiver em dúvida, faça alguns testes rápidos para saber qual dos formatos se encaixa melhor dentro das suas necessidades.

## Comprimindo de imagens

Depois de escolher o formato da sua imagem, outro passo importante é **comprimir cada byte possível** delas. Siga algumas dicas simples e específicas para cada um dos formatos a seguir.

### JPEG

Procure utilizar JPEGs progressivos. Apenas com isto já é possível diminuir o tamanho total do arquivo final e também melhorar bastante a percepção do usuário sobre o carregamento da sua página, já que ele verá um bloco de imagem carregando gradativamente em vez de de cima para baixo.

Apesar disso, imagens com baixo nível de detalhes (poucas cores e contraste) são melhor otimizadas ao utilizar um algoritmo de compressão sequencial (não-progressivo). Abaixe sempre a qualidade de um JPEG até atingir um nível onde o quantidade de detalhes desejada e o peso da imagem se alinham.

### PNG

Neste formato a dica é sempre diminuir o número de cores. No Photoshop isso é relativamente simples, basta utilizar a ferramenta "Posterize". Se você precisa de muitos detalhes, é melhor trocá-lo por um JPEG, a não ser que transparência também seja um requisito.

### SVG

Apesar de já serem leves pela sua natureza vetorial, imagens em SVG podem ser otimizadas ainda mais. [Ativar a compressão por gzip é o primeiro passo]({{ site.fullurl }}/posts/otimizacao-compressao-de-arquivos/#toc_1). Remover comentários desnecessários, declarações DOCTYPE e remover espaços de dentro do arquivo também são outras coisas que você pode fazer para diminuir o tamanho de um SVG.

### GIF

Assim como um PNG, a diminuição na quantidade de cores no GIF pode ajudar bastante a jogar o peso do arquivo para baixo. Diminuir a quantidade de frames por segundo da animação, o tamanho do gif em si e também a sua duração influencia drasticamente no peso final do seu arquivo.

## Quanto menos imagens melhor

Muitas vezes colocamos imagens demais em nossos sites, mesmo que nem sempre elas sejam realmente necessárias para o usuário. Tome cuidado com todo o peso agregado ao site quando você escolhe utilizar uma imagem de fundo em vez de apenas uma cor sólida.

Uma boa forma de melhorar o tempo de carregamento da sua página é fazer o *lazy-load* das imagens que não são essenciais. Isso significa carregá-las apenas depois de todo o resto do site estar pronto para o seu visitante, ou então apenas quando ela entrar na tela do usuário.

Use também todas as novas funcionalidades do CSS3 para evitar imagens em elementos de interface. `border-radius`, `linear-gradient`, `:after`, `:before` e muitas outras propriedades podem te ajudar bastante a atingir um ótimo resultado usando apenas código. Se for preciso, explique para o designer do seu time a importância de evitar imagens e tente convencê-lo a criar um layout otimizado.

Criar *sprites* é uma técnica que também pode diminuir bastante o número de requisições por imagens no seu servidor. O Tableless tem um [ótimo artigo sobre este assunto](http://tableless.com.br/css-sprites/ "Post no Tableless sobre CSS Sprites").

## Ferramentas úteis

Realizar todo esse trabalho "na mão" pode ser bastante custoso e muitas vezes chato. Algumas ferramentas podem ajudar bastante na hora de otimizar as imagens do seu site. Segue uma lista das principais que uso em projetos de diversos tamanhos:

- [imagemin](https://github.com/imagemin/imagemin-app), um aplicativo multi-plataforma que otimiza imagens de todos os formatos citados neste post.
- [grunt-imagemin]() e [gulp-imagemin](), plugins para os dois mais famosos *task runners* em JavaScript.
- [ImageOptim](https://imageoptim.com), incrível aplicativo de otimização de imagens para OS X.
- [JPEGmini](http://www.jpegmini.com), que otimiza JPEGs com reduções consideráveis de até 5 vezes no tamanho da imagem.
- [TinyPNG](https://tinypng.com), uma ótima ferramenta específica para PNGs com ótimos resultados.
- [GIF Optimizer](http://ezgif.com/optimize), um aplicativo web para otimizar GIFs.
- [Unveil](http://luis-almeida.github.io/unveil/), um plugin jQuery para *lazy-load*.
- [Compass Sprinting](http://compass-style.org/help/tutorials/spriting/), funções do Compass para gerar sprites de imagens de forma automatizada.
- [Icomoon](https://icomoon.io), Icon Fonts predefinidas e também personalizáveis.
- [Webfonts](https://github.com/sapegin/grunt-webfont), plugin para o Grunt para converter uma série de SVGs em uma Icon Font.

## Dicas de leitura

Muitas das dicas que dei aqui eu tirei de alguns posts da Smashing Magazine sobre [otimização de PNGs](http://www.smashingmagazine.com/2009/07/15/clever-png-optimization-techniques/) e [de JPEGs](http://www.smashingmagazine.com/2009/07/01/clever-jpeg-optimization-techniques/) e de um tutorial do Tutsplus sobre [otimização de GIFs animados](http://design.tutsplus.com/tutorials/10-ways-to-optimize-an-animated-gif-file--psd-34649). Eu recomendo bastante que você leia estes posts (em inglês) para ir ainda mais fundo na otimização de cada um desses formatos de imagem.

{% include optimization-post-footer.md %}