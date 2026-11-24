# search

Nova aba do Firefox em versão mínima: uma saudação (bom dia, boa tarde ou boa noite) e um terminal no meio da tela. No mesmo estilo do [portfólio](https://cervejera.github.io) e do [dash](https://cervejera.github.io/dash), o painel completo.

Publicado em `https://cervejera.github.io/search` (GitHub Pages). No Firefox, a extensão **New Tab Override** aponta a nova aba para essa URL.

## Como usa

Digite e tecle Enter: texto sem comando pesquisa no Google, na mesma aba. `ajuda` lista os comandos: `g <busca>`, `yt <busca>`, `gh [repo]`, `dash`, `links`, `limpar` e os atalhos dos links (`um`, `db`, `pf`, `bh`, `in`). Tab completa, setas repetem comandos, Esc limpa. `/`, Enter ou espaço levam o cursor de volta ao terminal.

## Regras do repo

O repositório é público. Nenhum token, e-mail ou link interno do trabalho entra aqui. A página não guarda nada no `localStorage`.

## Estrutura

- `index.html`
- `css/search.css`: tokens do portfólio (fundo `#0e0e0e`, verde `#3ecf8e`, Reddit Sans/Mono), cantos retos
- `js/search.js`
