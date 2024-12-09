# MarkdownRender

## Introdução

Este repositório guarda um componente React chamado _**MarkdownRender**_ que permite renderizar arquivos Markdown em uma página da web. O componente utiliza as bibliotecas _**react-markdown**_, _**rehype-highlight**_, _**remark-gfm**_ e _**highlight.js/styles/github.css**_ para renderizar o conteúdo em uma pagina da web.

## Funcionalidades

- Renderização de arquivos Markdown em uma página da web.
- Suporte para formatação de código usando a biblioteca _**highlight.js**_ e estilo _**highlight.js/styles/github.css**_ com fonte de código monoespaçada Fire Code.
- Tema escuro.
- Suporte para renderização de imagens.
- Possibilidade de personalizar o tema via CSS.

## Instalação

Para utilizar o componente _**MarkdownRender**_, você precisa instalar as dependências do projeto. Para isso, execute o seguinte comando:

```bash
npm install react-markdown rehype-highlight remark-gfm highlight.js
```

ou

```bash
yarn add react-markdown rehype-highlight remark-gfm highlight.js
```

## Uso

Baixe os arquivos deste repositório e adicione-os ao seu projeto.
Importe o componente _**MarkdownRender**_ em seu arquivo React:

```tsx
import MarkdownRender from './MarkdownRender';
```

Use o componente _**MarkdownRender**_ em seu componente React:

```tsx
<MarkdownRender repoName="nome-do-repositório" filePath="README.md" />
// Como nos exemplos abaixo:
<Route path="/MarkdownRender" element={<MarkdownRender repoName="MarkdownRender" filePath="README.md" />} />
// Ou
<article className="Home-article">
    <MarkdownRender repoName="aprendendo-reactjs-nextjs"
      filePath="/src/component/hooks/_useState/README.md"/>
</article>
```

## Personalização

Você pode personalizar o componente `MarkdownRender` para atender às suas necessidades. Aqui estão algumas opções de personalização:

- **Tema**: Você pode personalizar o tema do componente `MarkdownRender` editando os arquivos CSS.
  - o arquivo _**index.css**_ permite alterar o tema da pagina à ser renderizada.
  - o arquivo _**CodeBlock.css**_ possibilita a alteração do tema do componente _**CodeBlock**_ que renderiza o código.

## Entendendo o Código

Para entender melhor o código, você pode ler o arquivo _**MarkdownRender.md**_ e o arquivo _**CodeBlock.md**_ que contém informações os respectivos componentes.

- [MarkdownRender.md](./doc/MarkdownRender.md)
- [CodeBlock.md](./doc/CodeBlock.md)

**Aproveite e faça bom uso desse componente, feito com muito esforço e café.😆**
**Em um futuro breve, eu pretendo torna-lo compatível com .jsx e mate-lo compatível com .tsx**
