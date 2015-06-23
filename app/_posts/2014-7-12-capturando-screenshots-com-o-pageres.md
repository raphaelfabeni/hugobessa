---
layout: post
title:  "Capturando screenshots com o Pageres"
description: "Usando o Pageres, conseguimos capturar screenshots de nossos projetos em diversas resoluções, de forma automatizada"
date:   2014-7-12 10:12:00
category: dev
---

De vez em quando surge a necessidade de capturar screenshots de um projeto. O **Pageres** é uma ferramenta bem simples para você automatizar este processo. Apenas definindo uma url, ele é capaz de capturar uma página inteira.

Além disso, você ainda pode pedir para que ele tire fotos seu site em diversas resoluções.

<!--more-->

## Instalando

*Para usar o Pageres você precisa ter o node.js instalado. Caso ainda não tenha, [acesse o site do node.js para instalá-lo](http://nodejs.org).*

Instale o Pageres através do npm:

```bash
npm install --global pageres

# você talvez precise usar sudo
# sudo npm install --global pageres
```

## Usando o Pageres

Agora você já pode utilizar o Pageres através do seu terminal. Para tirar uma screenshot de [www.hugobessa.com.br](http://www.hugobessa.com.br/), por exemplo, basta executar o seguinte comando:

```bash
pageres www.hugobessa.com.br 1024x768 320x480
```

Isto capturará duas screenshots do site. Além de poder especificar quantas resoluções quiser, você pode omiti-las e o Pageres usará as 10 resoluções mais comuns de acordo com o w3counter.

Ele também traz algumas opções, como o interessante `--crop`, que permite que você limite a altura da screenshot. Para ver outras formas de utilizar o Pageres consulte a documentação (`pageres --help`).

## Pageres + (Grunt ou Gulp) = ♥︎

Através do Grunt ou do Gulp é possível automatizar o processo de captura de screenshots do seu projeto. Eu uso isto para mostrar uma screenshot atual no [Readme.md do meu site no GitHub](https://github.com/hugobessaa/hugobessa) após cada alteração na interface.

Para utilizá-lo com o **Grunt**, instale o [grunt-pageres](https://github.com/sindresorhus/grunt-pageres) dentro do seu projeto,

```bash
npm install grunt-pageres --save-dev
```

…e adicione a tarefa ao seu `Gruntfile`:

```javascript
grunt.initConfig({
    pageres: {                              // task
        prod: {                             // target
            options: {
                url: 'hugobessa.com.br',
                sizes: ['1024x768'],
                crop: true,
                dest: 'dist'
            }
        }
    }
});

grunt.loadNpmTasks('grunt-pageres');        // load task
```

Já com o **Gulp**, você deve usar a API em JavaScript exposta pelo Pageres. Na [página da ferramenta no GitHub](https://github.com/sindresorhus/pageres#api) isto é documentado em detalhes.

Esta é mais uma ferramenta muito útil para ajudar você a automatizar tarefas antes bem manuais. Em conjunto com outras ferramentas, como o [BrowserSync]({{ site.fullurl }}/posts/browsersync-browsers-sincronizados) ou o [grunt-uncss]({{ site.fullurl }}/posts/espremendo-bytes), conseguimos acelerar processos repetitivos e focar no que realmente importa dentro dos nossos projetos.
