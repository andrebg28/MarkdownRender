import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

import './index.css';

interface MarkdownRenderProps {
  repoName: string;
  filePath: string;
}

const MarkdownRender = ({ repoName, filePath }: MarkdownRenderProps): JSX.Element => {
  const [markdownContent, setMarkdownContent] = useState('');
  const token = process.env.REACT_APP_TOKEN_API_GITHUB;
  const userGithub = process.env.REACT_APP_USER_GITHUB;
  //const filePath = 'README.md';

  const url = `https://api.github.com/repos/${userGithub}/${repoName}/contents/${filePath}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  const enveloparCodeInLine = (texto: string): string => {
    return texto.replace(/`([\w ]+)`/g, '_**$1**_');
  };

  useEffect(() => {
    const fetchMarkdown = async (): Promise<void> => {
      fetch(url, {
        method: 'GET',
        headers: headers,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const readmeContent = data.content;
          const decodedBytes = atob(readmeContent)
            .split('')
            .map((c) => c.charCodeAt(0));
          let decodedReadmeContent = new TextDecoder('utf-8').decode(new Uint8Array(decodedBytes));
          decodedReadmeContent = enveloparCodeInLine(decodedReadmeContent);
          setMarkdownContent(decodedReadmeContent);
        })
        .catch((error) => {
          console.error('Erro ao buscar README.md:', error);
          setMarkdownContent('Falha ao carregar README.md!');
        });
    };

    fetchMarkdown();
  }, []);

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code: CodeBlock,
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRender;
