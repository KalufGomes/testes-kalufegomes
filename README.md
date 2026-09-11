# Testes Comportamentais — Kaluf & Gomes

Site estático (HTML/CSS/JS puro, sem build) com os 4 testes: DISC, Liderança
Situacional, Inteligência Emocional e Eneagrama.

## Como funciona

- Cada teste roda inteiramente no navegador da pessoa que responde.
- Ao final, o relatório é **enviado automaticamente por e-mail** (via Google
  Apps Script, já configurado em `assets/config.js`) e também fica disponível
  para **baixar como HTML** na hora — para virar PDF, é só abrir o arquivo
  baixado e usar Ctrl/Cmd+P → "Salvar como PDF".
- Cada teste também registra uma linha numa aba própria da sua Planilha
  Google (uma aba por teste).

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub (pode ser privado ou público).
2. Suba todos os arquivos desta pasta para o repositório, mantendo a mesma
   estrutura de pastas (`assets/`, `tests/`, `index.html`).
3. No repositório, vá em **Settings → Pages**.
4. Em "Source", selecione a branch principal (`main`) e a pasta `/ (root)`.
5. Salve. Em alguns minutos o GitHub mostra o link do site publicado (algo
   como `https://seu-usuario.github.io/nome-do-repositorio/`).
6. Esse é o link que você compartilha — a página inicial já lista os 4
   testes.

## Se quiser usar seu próprio domínio

No mesmo painel de **Settings → Pages**, há um campo "Custom domain" onde
você pode colocar um subdomínio seu (ex: `testes.kalufegomes.com.br`) — só
precisa configurar um registro CNAME no painel do seu domínio apontando para
`seu-usuario.github.io`.

## Arquivos

```
index.html              → página inicial com os 4 testes
assets/style.css         → visual compartilhado (cores, tipografia)
assets/engine.js          → lógica compartilhada (navegação, relatório, envio)
assets/config.js          → URL do Google Apps Script (e-mail/planilha)
assets/logo.png            → logo usada nas telas
assets/logo-data.js         → logo em base64 (usada dentro do relatório baixado)
tests/disc.html + disc-data.js
tests/lideranca.html + lideranca-data.js
tests/ie.html + ie-data.js
tests/eneagrama.html + eneagrama-data.js
```

## Trocar a senha / URL do Apps Script

A URL do Apps Script fica em `assets/config.js`. Se você recriar o script
algum dia, só precisa atualizar essa URL ali — não precisa mexer em mais
nada.
