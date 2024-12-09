# MarkdownRender

## Introdução

Este repositório guarda um componente React chamado `MarkdownRender` que permite renderizar arquivos Markdown em uma página da web. O componente utiliza as bibliotecas `react-markdown`, `rehype-highlight`, `remark-gfm` e `highlight.js/styles/github.css` para renderizar o conteúdo em uma pagina da web.

## Funcionalidades

- Renderização de arquivos Markdown em uma página da web.
- Suporte para formatação de código usando a biblioteca `highlight.js` e estilo `highlight.js/styles/github.css` com fonte de código monoespaçada Fire Code.
- Tema escuro.
- Suporte para renderização de imagens.
- Possibilidade de personalizar o tema via CSS.

## Instalação

Para utilizar o componente `MarkdownRender`, você precisa instalar as dependências do projeto. Para isso, execute o seguinte comando:

```bash
npm install react-markdown rehype-highlight remark-gfm highlight.js
```

ou

```bash
yarn add react-markdown rehype-highlight remark-gfm highlight.js
```

## Uso

Baixe os arquivos deste repositório e adicione-os ao seu projeto.
Importe o componente `MarkdownRender` em seu arquivo React:

```tsx
import MarkdownRender from './MarkdownRender';
```

Use o componente `MarkdownRender` em seu componente React:

```tsx
<MarkdownRender markdownFile="caminho/para/arquivo.md" />
```

## Personalização

Você pode personalizar o componente `MarkdownRender` para atender às suas necessidades. Aqui estão algumas opções de personalização:

- **Tema**: Você pode personalizar o tema do componente `MarkdownRender` editando os arquivos CSS.
  - o arquivo `index.css` permite alterar o tema da pagina à ser renderizada.
  - o arquivo `CodeBlock.css` possibilita a alteração do tema do componente `CodeBlock` que renderiza o código.

## Entendendo o Código

Para entender melhor o código, você pode ler o arquivo `MarkdownRender.md` e o arquivo `CodeBlock.md` que contém informações os respectivos componentes.

- [MarkdownRender.md](./doc/MarkdownRender.md)
- [CodeBlock.md](./doc/CodeBlock.md)

**Aproveite e faça bom uso desse componente, feito com muito esforço e café.😆**
**Em um futuro breve, eu pretendo torna-lo compatível com .jsx e mate-lo compatível com .tsx**
