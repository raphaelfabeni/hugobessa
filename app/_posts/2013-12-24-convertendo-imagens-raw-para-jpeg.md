---
layout: post
title:  "Convertendo imagens RAW para jpeg usando Shell Script"
header-image:
  src: "posts/2013-12-24-convertendo-imagens-raw-para-jpeg/macbook-mostrando-o-site-de-hugo-bessa.jpg"
  alt: "MacBook Pro Retina mostrando o site de Hugo Bessa"
date:   2013-12-24 12:45:00
category: shell
---

Apesar de conhecer apenas um pouco sobre fotografia, gosto de brincar com minha Nikon D3200 de vez em quando. Uma festa de casamento aqui, passeio no parque ali e algumas fotos da minha namorada acolá, vou clicando uma coisa de cada vez.

Para ter certeza que eu vou poder aproveitar todas as fotos que capturaram momentos muitas vezes únicos, sempre as tiro em RAW. Porém, como quase nenhum lugar aceita esse formato, convertê-las para JPEG é algo que faço em quase 100% das vezes. Afinal, quem vai compartilhar por email ou Dropbox arquivos com **22MB**?

Pra isso, uso um simples Shell Script que converte arquivos de fotos em RAW (.NEF) em JPEG e ainda gera uma segunda versão enxuta de cada clique com 1600px de tamanho.

<!--more-->

#### nefToJpeg.sh
```bash
#!/bin/bash

# cria as pastas necessárias.
mkdir -p jpegs/share;

# loopa arquivos .NEF do diretório atual. Subdiretórios não são suportados.
for f in *.NEF;
  do

  # pega o nome do arquivo e adiciona o o sufixo .jpg
  jpg=`basename $f`; jpg="${jpg%.*}.jpg";
  
  # converte o arquivo para jpeg com 90% de qualidade
  sips -s format jpeg -s formatOptions 90 "$f" -o "jpegs/$jpg";

  # converte o jpeg final, convertendo-o para 1600px mantendo a proporção
  # (largura ou altura, o que couber primeiro) e salva na pasta 'share'
  sips -Z 1600 "jpegs/$jpg" -o "jpegs/share/$jpg"
done;
```

Bem simples e direto ao ponto. Para utilizar, basta usar `cd pasta-de-fotos` e `sh nefToJpeg.sh` no seu terminal. [Este script está lá no meu Github Gist também](https://gist.github.com/hugobessaa/7628357).

Espero que tenha sido útil para você ;-).