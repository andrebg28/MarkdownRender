# CodeBlock

Esse componente é responsável por renderizar a caixa de código contido no arquivo `.md`, bem como o código contido nela.

# Tipagem

Eu gosto de usar linguagens com tipagem, o JavaScript é uma linguagem de tipagem dinâmica e fraca, essa combinação abre margem para comportamentos imprevisíveis e difíceis de rastrear, O TypeScript minimiza isso com sua tipagem estática, sua verificação de tipos em tempo de execução previne a conversão de tipos que o JS faz automaticamente em algumas situações, que podem ser indesejáveis em algumas situações.

Por isso optei por trabalhar com TS em modo estrito, onde a exigência da definição de tipos é menos flexível, isso para me forçar a declarar o tipo. Ainda estou aprendendo TS, e talvez a minha configuração do Eslint, tsconfig.json e do Prettierrc ainda não reflita o rigor que desejo aplicar aos meus projetos.

Por isso tive que criar as interfaces abaixo, para compensar a falta de definição de tipos de alguma biblioteca.

```typescript
interface CodeBlockProps {
  node?: Node | any;
  inline?: boolean; // Tornando opcional
  className?: string;
  children?: React.ReactNode;
}

interface ChildrenElement {
  type: string;
  children?: ChildrenElement[];
  value?: string;
}
```

Aqui `node?: Node | any;` eu tive que usar any, contra a minha vontade, mas pretendo corrigir isso no futuro.

## useStates

No projeto deste componente foi feito uso das seguintes variáveis de estado:

```typescript
const [message, setMessage] = useState<string | null>(null);
const [statusMessage, setStatusMessage] = useState<string>('message-success');
const [code, setCode] = useState<string>('');
```

A variável message é responsável por atualizar e renderizar o texto da mensagem de copia do código, ao clicar no botão `Copy`, em uma caixa de código, o componente tenta copiar o código para a area de transferência, caso de certo, uma mensagem aparecerá dizendo que a copia foi realizada com sucesso, em caso de falha, o texto renderizado indicara um erro na tentativa de copia do código.

A variável statusMessage indica se o processo de cópia teve exito ou falha, isso serve para marcar o elemento que renderiza a mensagem com a propriedade nameClass com message-success ou message-error. Assim é possível personalizar o estilo da mensagem via CSS. Você pode fazer isso no arquivo `CodeBlock.css`.

```css
.message-error {
  ...
}

.message-success {
  ...
}
```

Já a variável code fica armazenado o código copiado.

## Cabeçalho

```typescript
const match = /language-(\w+)/.exec(className || '');
const language = match ? match[1] : '';
```

Quando definimos a linguagem de programação, como em ````python`, o parâmetro `className` da função que defini o componente `CodeBlock` recebe o valor `language-python`. Então as duas linhas acima, armazenam na constante `language` somente o valor `python`. Essa informação é renderizada no cabeçalho da caixa de código.

```typescript
<span className="language-label">{language.toUpperCase()}</span>
```

Na linha a cima podemos observar que podemos aplicar estilo no valor da variável `language` por meio da class `.language-label`, no arquivo `CodeBlock.css`. Vemos também que a função `toUpperCase()` é aplicado a linguaje, fazendo com que a linguagem seja renderizada em caixa alta. Logo ````python` será renderizado como `PYTHON`.

## Ação de copia

```typescript
const handleCopyClick = (): void => {...}
const getStringCode = (element: ChildrenElement, code_: string): string => {...}
```

A função `handleCopyClick` é executada por meio do evento `onClick` do botão de copia. A função `getStringCode` percorre a arvore de elementos que renderiza o código na caixa de código, e monta a string que representa textualmente o código renderizado, esse processo ocorre apenas na primeira execução de `handleCopyClick`, assim que `getStringCode` retorna o texto do código que será copiado, esse texto é guardado em `code` que funciona como cache, evitando que a arvore seja percorrida em uma segunda copia.

No caso de você avaliar que é melhor computar todo o processo de `getStringCode` ao enves de ocupar memoria com cache usando a variável `code`, é só remover a linha abaixo:

```typescript
const [code, setCode] = useState<string>('');
```

E substituir:

```typescript
if (code === '') {
  setCode(getStringCode(node, ''));
}
```

Por:

```typescript
const code = getStringCode(node, '');
```

## Mensagem de copia

```typescript
const showMessage = (msg: string): void => {
  setMessage(msg);
  setTimeout(() => setMessage(null), 3000); // Remove a mensagem após 3 segundos
};
```

A função `showMessage` é responsavel por disparar a mensagem de sucesso ou de falha no processo de copia do código, e a remove apos 3s. Como dito antes, a mensagem pode ser estilizada pelas classes `.message-success` e `.message-error` no arquivo CodeBlock.css.
