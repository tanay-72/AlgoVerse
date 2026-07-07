import { codeToHtml } from 'shiki';
import { CopyButton } from './copy-button';

interface CodeBlockProps {
  code: string;
  language: 'cpp' | 'python';
}

export async function CodeBlock({ code, language }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    themes: { light: 'github-light', dark: 'github-dark-dimmed' },
    defaultColor: false,
  });

  return (
    <div className="group relative">
      <CopyButton code={code} />
      <div
        className="[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:p-4 [&_pre]:text-[13px] [&_pre]:leading-relaxed [&_pre]:scrollbar-thin"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
