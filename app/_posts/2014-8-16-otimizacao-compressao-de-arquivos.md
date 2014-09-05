---
layout: post
title:  "Compressão de arquivos"
description: "Uma das melhores técnicas para otimizar seu site é comprimir seus arquivos e utilizar gzip"
date:   2014-8-16 13:44:00
categories: dev
---

Para iniciar a [série sobre otimização de sites]({{ site.baseurl }}/posts/introducao-a-otimizacao), quero falar sobre **compressão de arquivos**. Esta é uma das formas clássicas de diminuir o tamanho das suas páginas.

<!--more-->

Quando estamos desenvolvendo um site além de estarmos escrevendo código para ser interpretado pelo computador, também devemos nos preocupar com o quão fácil nosso site será compreendido por outros desenvolvedores.

Bons nomes de variáveis, comentários, espaços em branco para separar contextos, uma boa biblioteca de estilos com *helpers* para facilitar o desenvolvimento. Tudo isso é muito bom para o desenvolvimento, mas adiciona um tamanho desnecessário para seus arquivos em produção.

<blockquote class="pullquote">Tire todos os caracteres desnecessários de dentro dos seus arquivos em produção</blockquote>

## Minificar

Uma das melhores formas de retirar este sobrepeso é minificando scripts, stylesheets e documentos HTML. Isso significa tirar todos os caracteres desnecessários de dentro dos seus arquivos. Existem diversas formas de minificar arquivos, tanto em sites estáticos quanto em dinâmicos.

![Exemplo de css minificado]({{ site.baseurl }}/_assets/images/posts/otimizacao-compressao-de-arquivos/minified-css.png)
<small>Exemplo de css minificado</small>

Em **sites estáticos**, o mais recomendado é utilizar um *task runner* para automatizar todo o workflow de otimização. Aqui no site eu uso o [Grunt](http://gruntjs.com), mas também tenho testado o [Gulp](http://gulpjs.com). Eu recomendo alguns pacotes:

- **UglifyJS** para diminuir o tamanho de scripts ([grunt](https://github.com/gruntjs/grunt-contrib-uglify) e [gulp](https://github.com/terinjokes/gulp-uglify))
- **cssmin** para otimizar stylesheets ([grunt](https://www.npmjs.org/package/grunt-contrib-cssmin) e [gulp](https://github.com/chilijung/gulp-cssmin))
- **htmlmin**, que minifica documentos HTML ([grunt](https://github.com/gruntjs/grunt-contrib-htmlmin) e [gulp](https://github.com/jonschlinkert/gulp-htmlmin))

Esses são os básicos para você começar a diminuir o tamanho das suas páginas. Em um [outro post meu sobre otimização]({{ site.baseurl }}/posts/espremendo-bytes) também recomendei o `uncss` e outras ferramentas muito úteis. Também apresentei uma palestra sobre [automação de tarefas com Grunt e otimização de sites]({{ site.baseurl }}/posts/automacao-com-grunt).

Já em **sites dinâmicos**, temos outras ferramentas que podem ajudar. Além de também ser possível usar o UglifyJS e o cssmin, outros utilitários podem ajudar muito na performance.

Se você está utilizando o **WordPress**, ative as funções de minificação do plugin [W3 Total Cache](https://wordpress.org/plugins/w3-total-cache/). Em alguns dos meus projetos ele tem funcionado perfeitamente. Já no **Rails**, o [Asset Pipeline](http://guides.rubyonrails.org/asset_pipeline.html) faz todo o trabalho por você.

## Compressão com gzip

Outra ótima forma de diminuir o tamanho dos seus arquivos é ativando a transferência com compressão direto do servidor. Suportado por todos os navegadores modernos (IE7+) e fácil de configurar, é possível comprimir documentos, scripts, stylesheets, svgs e qualquer outro tipo de arquivo de texto.

<blockquote class="pullquote">Ao utilizar gzip, a diferença para o usuário chega a ser assustadora</blockquote>

A diferença para o usuário chega a ser assustadora. O `main.css` do meu site possui cerca de 20 KB, mas seria transferido como apenas 5,3 KB com o gzip ativado. Por ser tão pequeno eu até utilizo o [htmlbuild](https://github.com/spatools/grunt-html-build) para embutí-lo direto no HTML das minhas páginas.

Se seu site está utilizando o **Apache**, apenas insira este código no seu `httpd.conf` ou `.htaccess` (código retirado do ótimo [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)):

```apacheconf
<IfModule mod_deflate.c>

    # Force compression for mangled headers.
    # http://developer.yahoo.com/blogs/ydn/posts/2010/12/pushing-beyond-gzipping
    <IfModule mod_setenvif.c>
        <IfModule mod_headers.c>
            SetEnvIfNoCase ^(Accept-EncodXng|X-cept-Encoding|X{15}|~{15}|-{15})$ ^((gzip|deflate)\s*,?\s*)+|[X~-]{4,13}$ HAVE_Accept-Encoding
            RequestHeader append Accept-Encoding "gzip,deflate" env=HAVE_Accept-Encoding
        </IfModule>
    </IfModule>

    # Compress all output labeled with one of the following MIME-types
    # (for Apache versions below 2.3.7, you don't need to enable `mod_filter`
    #  and can remove the `<IfModule mod_filter.c>` and `</IfModule>` lines
    #  as `AddOutputFilterByType` is still in the core directives).
    <IfModule mod_filter.c>
        AddOutputFilterByType DEFLATE application/atom+xml \
                                      application/javascript \
                                      application/json \
                                      application/rss+xml \
                                      application/vnd.ms-fontobject \
                                      application/x-font-ttf \
                                      application/x-web-app-manifest+json \
                                      application/xhtml+xml \
                                      application/xml \
                                      font/opentype \
                                      image/svg+xml \
                                      image/x-icon \
                                      text/css \
                                      text/html \
                                      text/plain \
                                      text/x-component \
                                      text/xml
    </IfModule>

</IfModule>
```

Já no **nginx**, basta adicionar este *snippet* ao seu arquivo de configuração ([compartilhado pelo colega Thiago Belem](http://blog.thiagobelem.net/habilitando-gzip-em-servidores-nginx/)):

```bash
# turn on gzip
gzip               on;
gzip_http_version  1.1;
gzip_vary          on;
gzip_comp_level    6;
gzip_proxied       any;

# Define mime-types to be compressed
gzip_types         text/html text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

# http://blog.leetsoft.com/2007/7/25/nginx-gzip-ssl
gzip_buffers       16  8k;

# turn off gzip for some browsers
gzip_disable       "MSIE [1-6].(?!.*SV1)";
```

***

Aplicar estes conceitos é algo muito importante. Além de diminuir a quantidade de banda que seu servidor vai enviar, você melhora bastante a experiência do usuário que nem sempre está em uma rede de alta velocidade. Pessoas querem consumir conteúdo e usar seu aplicativo, mesmo que estejam dentro de um aeroporto e com pouco sinal 3G.

A página inicial do meu site sem otimização pesa 84 KB. Depois de otimizada, fica com apenas 49 KB. Em sites mais complexos e com mais arquivos, a diferença é ainda mais significativa.

<blockquote class="pullquote">Pessoas querem consumir conteúdo e usar seu aplicativo, mesmo que estejam dentro de um aeroporto e com pouco sinal 3G</blockquote>

{% include optimization-post-footer.md %}