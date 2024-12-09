import React, { useState } from 'react';
import { Node } from 'typescript';
import './CodeBlock.css';

export interface CodeBlockProps {
  node?: Node | any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ChildrenElement {
  type: string;
  children?: ChildrenElement[];
  value?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ node, /*inline,*/ className, children, ...props }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('message-success');
  const [code, setCode] = useState<string>('');
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  const getStringCode = (element: ChildrenElement, code_: string): string => {
    if (element.type === 'text') {
      code_ += element.value?.toString();
      return code_;
    } else if (element.type === 'element') {
      if (element.children) {
        element.children.forEach((child) => {
          code_ = getStringCode(child, code_);
          return code_;
        });
      }
    }
    return code_;
  };

  const handleCopyClick = (): void => {
    if (code === '') {
      setCode(getStringCode(node, ''));
    }

    navigator.clipboard.writeText(code).then(
      () => {
        setStatusMessage('message-success');
        showMessage('Código copiado com sucesso!');
      },
      (err) => {
        console.error('Erro ao copiar o código: ', err);
        setStatusMessage('message-error');
        showMessage('Falha ao copiar o código.');
      },
    );
  };

  const showMessage = (msg: string): void => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000); // Remove a mensagem após 3 segundos
  };

  return (
    <div className="code-block">
      {language && (
        <div className="code-title">
          <span className="language-label">{language.toUpperCase()}</span>
          {message && <p className={`message ${statusMessage}`}>{message}</p>}
          <button className="copy-button" onClick={handleCopyClick} aria-label="Copiar código">
            {/* Opcional: Adicione um icone no lugar do texto */}
            <span>Copy</span>
          </button>
        </div>
      )}
      <pre className={`code language-${language}`}>
        <code className={`code language-${language}`} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
