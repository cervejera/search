/* search.js - nova aba do Firefox: saudação e um terminal que pesquisa.
   texto sem comando vira busca no Google, na mesma aba.
   nenhum token, e-mail ou link interno do trabalho fica neste arquivo: o repo é público.
   esta página não guarda nada no localStorage (a origem é compartilhada com o dash e o portfólio). */
(function () {
    'use strict';

    var BUSCA = 'https://www.google.com/search?q=';
    var USUARIO_GITHUB = 'cervejera';
    var DASH = 'https://cervejera.github.io/dash/';

    // atalho = o que se digita no terminal. "gh" é comando próprio.
    var LINKS = [
        { nome: 'Ummense', url: 'https://app.ummense.com', atalho: 'um' },
        { nome: 'Dropbox', url: 'https://www.dropbox.com/home', atalho: 'db' },
        { nome: 'Portfólio', url: 'https://cervejera.github.io', atalho: 'pf' },
        { nome: 'Behance', url: 'https://www.behance.net/cervejera', atalho: 'bh' },
        { nome: 'LinkedIn', url: 'https://www.linkedin.com/in/gustavo-cervejera', atalho: 'in' }
    ];

    /* ---------- utilidades ---------- */
    function $(id) { return document.getElementById(id); }

    function el(tag, cls, texto) {
        var n = document.createElement(tag);
        if (cls) n.className = cls;
        if (texto != null) n.textContent = texto;
        return n;
    }

    /* ---------- saudação ---------- */
    function atualizarSaudacao() {
        var h = new Date().getHours();
        $('saudacao').textContent = h < 12 ? 'bom dia' : h < 18 ? 'boa tarde' : 'boa noite';
    }

    /* ---------- terminal ---------- */
    var saida = $('termSaida');
    var entrada = $('termEntrada');
    var historico = [];
    var posicao = 0;

    function escrever(texto, tipo) {
        saida.appendChild(el('p', tipo || '', texto));
        while (saida.children.length > 10) saida.removeChild(saida.firstChild);
    }

    // a pesquisa e os links abrem na mesma aba: esta página só existe para isso
    function abrir(url) {
        window.location.assign(url);
    }

    function pesquisar(texto) {
        abrir(BUSCA + encodeURIComponent(texto));
    }

    var COMANDOS = {
        ajuda: {
            desc: 'lista os comandos',
            rodar: function () {
                escrever('texto sem comando pesquisa no Google');
                Object.keys(COMANDOS).forEach(function (nome) {
                    var c = COMANDOS[nome];
                    var uso = c.uso || nome;
                    escrever('  ' + uso + new Array(Math.max(2, 14 - uso.length)).join(' ') + c.desc);
                });
                escrever('atalhos de links: ' + LINKS.map(function (l) { return l.atalho; }).join(' · '));
            }
        },
        g: {
            uso: 'g <busca>', desc: 'busca no Google',
            rodar: function (arg) {
                if (!arg) return escrever('uso: g <busca>', 'erro');
                pesquisar(arg);
            }
        },
        yt: {
            uso: 'yt <busca>', desc: 'busca no YouTube',
            rodar: function (arg) {
                if (!arg) return escrever('uso: yt <busca>', 'erro');
                abrir('https://www.youtube.com/results?search_query=' + encodeURIComponent(arg));
            }
        },
        gh: {
            uso: 'gh [repo]', desc: 'abre seu GitHub ou um repo seu',
            rodar: function (arg) {
                var base = 'https://github.com/' + USUARIO_GITHUB;
                abrir(arg ? base + '/' + encodeURIComponent(arg) : base);
            }
        },
        dash: {
            desc: 'abre o painel completo',
            rodar: function () { abrir(DASH); }
        },
        links: {
            desc: 'lista os links e seus atalhos',
            rodar: function () {
                LINKS.forEach(function (l) { escrever('  ' + l.atalho + '  ' + l.nome); });
            }
        },
        limpar: {
            desc: 'limpa o terminal',
            rodar: function () { saida.textContent = ''; }
        }
    };

    function executar(linha) {
        var texto = linha.trim();
        if (!texto) return;
        historico.push(texto);
        posicao = historico.length;

        var corte = texto.indexOf(' ');
        var nome = (corte < 0 ? texto : texto.slice(0, corte)).toLowerCase();
        var arg = corte < 0 ? '' : texto.slice(corte + 1).trim();

        // um comando conhecido só vale como primeira palavra: "g receita" pesquisa "receita",
        // mas "como fazer g" é uma pesquisa comum
        if (COMANDOS[nome]) {
            escrever('$ ' + texto, 'eco');
            return COMANDOS[nome].rodar(arg);
        }

        var link = LINKS.filter(function (l) { return l.atalho === nome && !arg; })[0];
        if (link) {
            escrever('$ ' + texto, 'eco');
            return abrir(link.url);
        }

        // qualquer outro texto é pesquisa
        pesquisar(texto);
    }

    function completar() {
        var parte = entrada.value.toLowerCase();
        if (!parte || parte.indexOf(' ') >= 0) return false;
        var nomes = Object.keys(COMANDOS).concat(LINKS.map(function (l) { return l.atalho; }));
        var achados = nomes.filter(function (n, i) { return n.indexOf(parte) === 0 && nomes.indexOf(n) === i; });
        if (achados.length === 1) {
            entrada.value = achados[0] + ' ';
            return true;
        }
        if (achados.length > 1) {
            escrever(achados.join('  '));
            return true;
        }
        return false;
    }

    function iniciarTerminal() {
        $('termForm').addEventListener('submit', function (e) {
            e.preventDefault();
            var linha = entrada.value;
            entrada.value = '';
            executar(linha);
        });

        entrada.addEventListener('keydown', function (e) {
            if (e.key === 'Tab') {
                if (completar()) e.preventDefault();
            } else if (e.key === 'ArrowUp' && historico.length) {
                e.preventDefault();
                posicao = Math.max(0, posicao - 1);
                entrada.value = historico[posicao];
            } else if (e.key === 'ArrowDown' && historico.length) {
                e.preventDefault();
                posicao = Math.min(historico.length, posicao + 1);
                entrada.value = historico[posicao] || '';
            } else if (e.key === 'Escape') {
                // limpa o campo e a saída, mas o cursor continua aqui: é a única coisa da página
                entrada.value = '';
                saida.textContent = '';
            }
        });

        // "/", Enter ou espaço levam o cursor de volta ao terminal.
        // Enter e espaço só valem com o foco solto: em link, botão ou campo continuam normais.
        var INTERATIVOS = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A', 'SUMMARY'];
        document.addEventListener('keydown', function (e) {
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            var alvo = e.target;
            if (INTERATIVOS.indexOf(alvo.tagName) >= 0 || alvo.isContentEditable) return;
            if (e.key === '/' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                entrada.focus();
            }
        });

        entrada.focus();
    }

    /* ---------- início ---------- */
    atualizarSaudacao();
    setInterval(atualizarSaudacao, 60000);
    iniciarTerminal();
})();
