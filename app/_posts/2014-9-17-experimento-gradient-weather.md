---
layout: post
title: "Experimento: Gradient Weather"
description: "Simples experimento em JavaScript usando a localização do usuário e dados de previsão climática"
featured-image: "/_assets/images/posts/experimento-gradient-weather/hero.png"
date:   2014-9-17 10:59:00
category: dev
---

Eu fiz um simples experimento usando a API de geolocalização do HTML5, a API do OpenWeatherMap.org e `linear-gradients` do CSS3. Juntando essas três ferramentas, mostro a condição climática atual de uma forma simples e visual. [Acesse o experimento Gradient Weather no CodePen](http://codepen.io/hugobessaa/debug/pcrgh).

<!--more-->

## Alguns destaques do código


#### retornando a localização do usuário
```javascript
navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
}
```

#### iterando em um Sass Map
```scss
$states: (
    "night-clear": linear-gradient(#16222A, #3A6073),
    "day-clear": linear-gradient(#00C6FF, #0072FF)
);

@each $state, $gradient in $states {
  [data-state="#{$state}"] {
    background-image: #{$gradient}
  }
}
```

Como o Vitor Britto vem dizendo: [Experimente Experimentar](http://www.vitorbritto.com.br/blog/experimente-experimentar/). [Acesse o Gradient Weather no CodePen](http://codepen.io/hugobessaa/debug/pcrgh) ;-).