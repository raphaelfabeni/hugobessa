---
layout: post
title:  "BrowserSync: browsers sincronizados"
description: "A web pode ser acessada de cada vez mais dispositivos. BrowserSync nos ajuda a realizar testes sincronizados em dezenas de browsers."
featured-image: "/_assets/images/posts/browsersync-browsers-sincronizados/browser-sync-ghostmode.jpg"
date:   2014-6-20 11:07:00
categories: dev
---

Cada vez mais dispositivos diferentes acessam a web. Celulares, tablets, notebooks, geladeiras, carros, desktops, TVs. A lista continua apenas crescendo.

Como construtores deste ambiente, é nossa responsabilidade ter certeza que nosso site funciona independentemente de onde nossos visitantes o estão acessando.

O [BrowserSync](http://browsersync.io) é uma ferramenta Open Source capaz de otimizar todo o processo de teste cross-browser, já que ele possibilita a sincronização da navegação entre diversos browsers e dispositivos.

<!--more-->

Ele mudou totalmente a forma como encaro testes em muitos browsers/dispositivos. Se sincronizar a navegação já não bastasse, o BrowserSync também atualiza automaticamente o CSS e imagens quando você as altera no projeto, assim como atualiza a página caso você modifique um `.js`, `.html`, `.php` e muitos outros tipos de arquivos.

<blockquote class="pullquote">O BrowserSync mudou totalmente a forma como encaro testes cross-browser</blockquote>

O `ghostMode` é grupo de opções de sincronização do BrowserSync que está por trás de toda essa mágica. Com ele podemos sincronizar:

- a posição da rolagem;
- o preenchimento e envio de formulários;
- cliques em links;
- e a localização do usuário no site

![ghostMode do BrowserSync em ação]({{ site.baseurl }}/_assets/images/posts/browsersync-browsers-sincronizados/browser-sync-ghostmode.gif)

Isto é extremamente útil quando você está desenvolvendo um site com diversas páginas. Um dos meus últimos projetos conta com mais de 40 páginas, e testar a interação e a consistência do layout só foi uma tarefa rápida pois eu tinha o BrowserSync para me ajudar. Antes eu teria que verificar em cada dispositivo/browser, um a um.

Para quem está desenvolvendo sites responsivos, com ele agora você vai poder manter alguns dispositivos ao seu redor e já receber feedback imediato das suas modificações.

Na nova versão do BrowserSync, a 1.0, também é possível utilizar o [BrowserStack](http://browserstack.com) (serviço de virtualização de browsers online) para testar seu site local em dezenas de combinações diferentes de sistema operacional e versões de browsers.

![Exemplo do uso do BrowserSync com o BrowserStack]({{ site.baseurl }}/_assets/images/posts/browsersync-browsers-sincronizados/browser-sync-browserstack.gif)

A versão 1.0 também trouxe uma outra novidade interessante: [integração com localtunnel](https://github.com/shakyShane/browser-sync/wiki/options-1.0#tunnel). Apenas definindo a opção `tunnel: true`, você vai criar uma url para acessar seu site local de qualquer lugar. Eu certamente usarei esta opção para testar a performance dos meus sites em dispositivos móveis utilizando 3G.

Instalar e usar o BrowserSync é algo muito simples. Ele funciona tanto no Windows quanto no Linux e OS X. Basta executar o seguinte comando:

```bash
npm install --global browser-sync

# caso seja preciso, rode o comando com sudo
# $ sudo npm install --global browser-sync
```

Dê uma olhada na [documentação oficial](https://github.com/shakyShane/browser-sync/wiki "Documentação oficial do BrowserSync") para aprender a utilizá-lo e aproveitar todas as funcionalidades. O BrowserSync também conta com [plugins para Grunt](https://github.com/shakyShane/grunt-browser-sync "Plugin do BrowserSync para Grunt") e [Gulp](https://github.com/shakyShane/gulp-browser-sync "Plugin do BrowserSync para o Gulp").

Aliás, se você planeja utilizá-lo com o Grunt, recomendo que você leia um ótimo artigo escrito pelo Vitor Britto sobre [como utilizar o BrowserSync com o Grunt](http://www.vitorbritto.com.br/blog/testes-sincronizados-entre-dispositivos-moveis/). O [Gruntfile.js deste site](https://github.com/hugobessaa/hugobessa/blob/master/Gruntfile.js) pode servir, também, como inspiração.












