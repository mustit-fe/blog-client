import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import './codeBlockOption.css';

interface CodeBlockOptionProps {
  node: {
    attrs: { language: string };
  };
  updateAttributes: (attrs: { language: string }) => void;
  extension: any;
}

export default ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: CodeBlockOptionProps) => (
  <NodeViewWrapper className="code-block">
    <select
      contentEditable={false}
      defaultValue={defaultLanguage}
      onChange={event => updateAttributes({ language: event.target.value })}
    >
      <option value="null">auto</option>
      <option disabled>—</option>
      {extension.options.lowlight.listLanguages().map((lang: string, index: number) => (
        <option key={index} value={lang}>
          {lang}
        </option>
      ))}
    </select>
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);
