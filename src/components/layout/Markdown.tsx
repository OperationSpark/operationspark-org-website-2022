import { Marked, Renderer } from 'marked';
import { FC } from 'react';

const renderer = new Renderer();

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
  return <div className='markdown-body' dangerouslySetInnerHTML={{ __html: mrkdwn }} />;
};

export default Markdown;
