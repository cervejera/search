# search: contexto para o Claude Code

Nova aba do Firefox do Gustavo (Cervejera), versão mínima: saudação e um terminal que pesquisa. Projeto irmão do dash (`cervejera/dash`, painel completo) e do portfólio (`cervejera/cervejera.github.io`), no mesmo estilo. Publicado em `https://cervejera.github.io/search` (GitHub Pages, branch `main`, raiz). **O portfólio nunca pode ter uma pasta ou arquivo `search/`**: ela tomaria a rota.

## Como trabalhar com ele

- Ele aprende debatendo. **Discuta antes de codar**: discutir, implementar, revisar, testar. Para mudança não trivial, plano curto em etapas numeradas e espere o ok.
- Pergunte só o que falta de verdade (no máximo 3 perguntas).
- pt-BR em tudo: respostas, variáveis, classes CSS e comentários.
- **Nunca faça push sem confirmação dele**, a cada push. Mostre o que muda antes. Commit antes de mudança grande. Não apague nem sobrescreva nada sem ele pedir.
- Não adicione funcionalidade, seção ou texto que ele não pediu.
- Antes de dizer que terminou: renderize, tire screenshot em desktop e celular, confira rolagem horizontal e console.

## Decisões

- HTML, CSS e JS puro, sem build e sem framework. `js/search.js` é uma IIFE.
- Tela: só a saudação ("bom dia", "boa tarde" ou "boa noite", sem nome) e o terminal centralizado.
- Texto sem comando pesquisa no **Google, na mesma aba**. Comandos: `ajuda`, `g`, `yt`, `gh`, `dash`, `links`, `limpar` e os atalhos de links.
- Visual: fundo `#0e0e0e`, texto `#b5b5b5`, títulos `#f0f0f0`, verde `#3ecf8e`, linhas `#222222`, Reddit Sans e Reddit Mono. **Cantos retos em tudo**, cruz "+" nos cantos do terminal, ponto verde pulsando.
- DOM seguro: montar com `textContent`, nunca `innerHTML` com dado externo.
- **Repo público, nenhum segredo.** Esta página não grava no `localStorage`: `cervejera.github.io` é uma origem só, compartilhada com o dash e o portfólio, e qualquer página dela lê o que está guardado.
