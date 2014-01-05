---
layout: post
title:  "Links de compartilhamento para Twitter e Facebook no Jekyll"
date:   2014-01-05 02:24:00
categories: jekyll
---

O **[Jekyll](http://jekyllrb.com "Jekyll")** é um gerador de sites e blogs estáticos que ganhou bastante visibilidade nos últimos meses, principalmente por ser o único suportado oficialmente pelo [GitHub Pages](http://pages.github.com "GitHub Pages"). Este blog, inclusive, [foi construído com ele](https://github.com/hugobessaa/hugobessa "Código fonte deste blog").

Desde que escolhi usá-lo para este projeto, venho procurando forma de trazer mais funcionalidades interessantes para minhas páginas. Os **botões de compartilhamento para Twitter e Facebook** são uma delas — o mais legal é que é bem simples implementá-los no Jekyll.

Pegando emprestado um [código de um post do Cooltrainer](https://cooltrainer.org/2013/08/13/getting-social-with-jekyll/ "código de um post do Cooltrainer"), fiz apenas algumas alterações para que eles se adaptassem ao ambiente do meu site. Primeiro, precisamos da url da página atual, utilizando a forma como o [Octopress](http://octopress.org "Octopress") pega a url canônica.

```html
<!--
Como o capture também guarda espaços e quebras de linha,
retire-os antes de utilizar no seu site.
-->{% raw %}
{% capture canonical %}
    {{ site.fullurl }} <!-- variável com o caminho absoluto do site -->
    {% if site.permalink contains '.html' %}
        {{ page.url }}
    {% elsif site.permalink contains category_dir %}
        {{ '/' | page.url | remove:'index.html' | '/' }}
    {% else %}
        {{ page.url | remove:'index.html' | '/' }}
    {% endif %}
{% endcapture %}
{% endraw %}
```

Agora, podemos usar adicionar os links de compartilhamento:

```html
{% raw %}
<!-- Twitter -->
<a href="https://twitter.com/intent/tweet?url={{ canonical }}&amp;text={% if page.title %}{{ page.title | escape | truncate:100 | replace:' ','%20' }}{% else %}{{ site.title | escape | truncate:100 | replace:' ','%20' }}{% endif %}&amp;via={{ site.author.twitter }}" target="_blank" class="icon-twitter-share"></a>

<!-- Facebook -->
<a href="https://www.facebook.com/sharer.php?&amp;u={{ canonical }}" target="_blank" class="icon-facebook-share"></a>
{% endraw %}
```

Pronto, agora qualquer um pode compartilhar facilmente suas publicações sem precisar carregar scripts de terceiros que deixam a navegação mais lenta e expõem a privacidade do usuário. Uma solução simples e eficaz, assim como o Jekyll.

A aplicação deste código no meu site pode ser vista no [arquivo post.html](https://github.com/hugobessaa/hugobessa/blob/master/app/_layouts/post.html "arquivo post.html"). Eu planejo continuar escrevendo sobre como estou criando este blog, então, siga-me no [Twitter](http://twitter.com/{{ site.author.twitter }} "Twitter") para ficar sabendo das últimas publicações.