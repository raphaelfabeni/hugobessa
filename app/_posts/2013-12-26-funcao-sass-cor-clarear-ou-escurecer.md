---
layout: post
title:  "Função Sass para clarear ou escurecer uma cor baseando-se na luminosidade da cor de fundo"
date:   2013-12-26 17:26:00
header-image:
  src: "posts/2013-12-26-funcao-sass-cor-clarear-ou-escurecer/exemplo-de-codigo-no-codepen.jpg"
  alt: "Exemplo de código da função Sass no Codepen.io"
categories: sass
---

Foi-se o tempo que a web tinha o fundo branco (o cinza já morreu faz tempo também), letras pretas serifadas e links azuis. Designers ajudaram a transformar a web em um local colorido e bonito.

<!--more-->

Na hora de criar uma *stylesheet* escalável com cores que podem mudar na próxima data comemorativa, as funções de cores do Sass são uma grande mão na roda. Se você já usou `darken($color)` ou `lighten($color)` para criar cores de `:hover`, `:visited` e de bordas, você sabe do que estou falando.

O único problema desses dois é que se você troca de uma cor escura para uma clara ou vice-versa, elas podem não funcionar da maneira que você queria que elas funcionassem. Pensando nisso, eu fiz uma função simples para manter estas funções escaláveis.

```scss
/**
 * @params:  {Color}
 *           {Number} percentage
 *           {Number} percentage
 *
 * @returns: {Color}
 **/
@function highlight($color, $amount, $threshold: 50%){
  @if lightness($color) > $threshold{
    @return darken($color, $amount);
  }
  @if lightness($color) <= $threshold{
    @return lighten($color, $amount);
  }
  @return $color;
}
```
![Exemplo da aplicação da função highlight]({{ site.baseurl }}/_assets/images/posts/funcao-sass-cor-clarear-ou-escurecer/highlight-sass-function-example.jpg)

Usando a função `highlight($color, $amount)`, você escolhe apenas a quantidade de diferença entre as cores você quer, já que ela clareia ou escurece a cor baseando-se na luminosidade. Além disso, é possível mudar o limite de luminosidade passando um terceiro argumento como uma porcentagem (o padrão é 50%).

[Diversas outras funções](http://sass-lang.com/documentation/Sass/Script/Functions.html#rgb_functions) de cores para Sass estão disponíveis. Existe também um interessante plugin feito pelo *Team Sass*, o [Color Schemer](https://github.com/Team-Sass/color-schemer), que cria esquemas de cores, tem blend modes e um monte de outras coisas.