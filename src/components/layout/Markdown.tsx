import { Marked, Renderer } from 'marked';
import { FC } from 'react';

const renderer = new Renderer();

renderer.strong = ({ tokens }) => {
  const text = tokens.map((token) => token.raw).join('');
  return `<strong class="primary-secondary">${text}</strong>`;
};

const marked = new Marked({
  renderer,
  gfm: true,
  breaks: true,
});

type MarkdownProps = {
  children: string;
};

const Markdown: FC<MarkdownProps> = ({ children }) => {
  const mrkdwn = marked.parse(children, { async: false });
  console.log('Markdown', mrkdwn);
  return <div className='markdown-body' dangerouslySetInnerHTML={{ __html: mrkdwn }} />;
};

export default Markdown;
