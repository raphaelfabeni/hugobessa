---
layout: post
title:  "5 comandos git para aumentar sua produtividade"
date:   2014-4-23 1:47:00
category: git
---

Não versionar seus arquivos pode ser uma grande dor de cabeça. Afinal, quem nunca desejou ter salvado uma versão alternativa quando o `Undo` não deu mais conta de voltar todas as alterações feitas nas últimas horas? Eu já, e várias vezes.

Por isso, agora todos os projetos que participo são versionados com [Git](http://pt.wikipedia.org/wiki/Git). E, durante [meu primeiro ano como desenvolvedor front-end]({{ site.fullurl }}/posts/um-ano-como-desenvolvedor-front-end/), eu colecionei alguns comandos bem úteis que aumentam bastante minha produtividade ao utilizar esta ferramenta.

<!--more-->

## 1 - Adicionando modificações interativamente
Cortar a linha de raciocínio durante a implementação de uma funcionalidade não é uma boa ideia. Portanto, é normal que mais de uma alteração seja feita no projeto entre um commit e outro. Para manter as boas práticas de utilização do Git, precisamos então dividir as alterações dentro do mesmo arquivo em pacotes, algo que não é possível usando apenas o clássico `git add <file>`.

Para fazer isso, podemos usar a adição interativa do `git add`:

```bash
git add <file> --patch
```

Usando esse comando navegamos pelo arquivo adicionando ou não cada uma de suas partes. `y`, por exemplo, adiciona o pacote que está sendo mostrado. `n` faz o oposto. Também é possível dividir o pacotes em pacotes menores (`s`), procurar um pacote que corresponde a uma regexp (`/`), ou até editar um pacote manualmente (`e`). [Veja todas as opções na documentação](http://git-scm.com/docs/git-add#_interactive_mode "Documentação para o modo interativo do git add").

## 2 - Mostrar usuários listados por quantidade de commits

```bash
git log --format='%an' . | \
    sort | uniq -c | sort -rn | head
```

Com esse comando, você lista os usuários ativos no repositório na branch atual, rankeados pela quantidade de commits.

O legal deste comando é que basta trocar o `.` por qualquer outro path para criar a lista de acordo com a atividade dentro daquela pasta/arquivo. Então fica fácil saber quem está alterando mais os *controllers*, *models* ou as *views* de um aplicativo.

## 3 - Log com gráfico e cores
Um dos motivos de antes eu usar o [SourceTree](http://www.sourcetreeapp.com "Site do aplicativo SourceTree") com o Git era justamente sua visualização dos gráficos das branchs e merges. Porém, após descobrir este comando shell, fiz a transição completa para o Terminal:

```bash
git log \
  --graph \
  --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' \
  --oneline
```

O que ele faz aqui é basicamente listar os commits do repositório de uma forma bem visual, com cores e gráficos. Você pode inclusive escrever um caminho para um arquivo no final do comando e receber um log apenas das alterações feitas naquele arquivo.

## 4 - Informações sobre alterações em um commit

```bash
git diff-tree --no-commit-id --shortstat -r <commit-hash>
```

Rodando este comando, você pode ver informações gerais sobre as alterações feitas em um commit `<commit-hash>`. Se você preferir uma resposta mais completa, pode substituir a flag `--shortstat` por `--stat`, `--numstat` ou `--dirstat`. Leia a [documentação do `diff-tree`](http://git-scm.com/docs/git-diff-tree) para entender o que cada uma dessas flags faz e conhecer outras opções interessantes.

## 5 - Sincronizar fork no Github
Uma das grandes funcionalidades do Github é permitir que usuários criem *forks* de repositórios. Assim como atualizar uma branch, também é necessário atualizar seus forks com as últimas alterações no repositório principal.

Fazer isso é bem fácil:

```bash
# Requer um remote "upstream", apontando para o repositório original
# exemplo: `git remote add upstream git@github.com:user/repo.git`
git fetch upstream; git checkout master; git merge upstream/master
```

## BONUS - Mostrando arquivos com conflito
Se você trabalhou no mesmo arquivo que um colega, existe bastante chance que algum conflito apareça. Para listar todos os arquivos com conflito que ainda não foram resolvidos, utilize o seguinte comando:

```bash
git diff --name-only --diff-filter=U
```

Usando estes comandos você certamente acelerará ainda mais seu fluxo de trabalho em um projeto versionado com Git. Estes comandos e outros estão no meu gist [**git-useful**](https://gist.github.com/hugobessaa/10272410), uma coleção de comandos úteis que venho criando durante meu primeiro ano como desenvolvedor front-end.

Eu também recomendo que você veja o [Git cheat sheet](https://github.com/tiimgreen/github-cheat-sheet), um extenso arquivo cheio de dicas e comandos interessantes para usar o Github.