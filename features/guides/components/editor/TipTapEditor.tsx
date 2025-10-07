import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import Toolbar from "@/features/guides/components/editor/Toolbar";
import { useEffect } from "react";

const lowlight = createLowlight(common);

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  step: number;
  placeholder: string;
}

export default function TipTapEditor({ content, onChange, step, placeholder }: TipTapEditorProps) {
  const extensions = [
    StarterKit.configure({
      codeBlock: false, // We'll use our own code block extension
      link: false, // We'll configure our own link extension
    }),
    Link.configure({
      openOnClick: false,
    }),
    Image,
    // Only include code extension in step 2
    ...(step === 2
      ? [
          CodeBlockLowlight.configure({
            lowlight,
            defaultLanguage: "javascript",
          }),
        ]
      : []),
  ];

  const editor = useEditor({
    extensions,
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-content max-w-none focus:outline-none min-h-[400px]",
        "data-placeholder": placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="animate-pulse">
        <div className="bg-muted mb-6 h-12 rounded-lg"></div>
        <div className="bg-muted h-96 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div>
      <Toolbar editor={editor} step={step} />
      <div className="editor-content content-area font-serif">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
