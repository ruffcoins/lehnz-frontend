import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Strikethrough,
  Link,
  Image as ImageIcon,
  List,
  ListOrdered,
  Code,
  Terminal,
  MoreHorizontal,
} from "lucide-react";

interface ToolbarProps {
  editor: Editor;
  step: number;
}

export default function Toolbar({ editor, step }: ToolbarProps) {
  const setHeading = (level: 1 | 2 | 3) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const setParagraph = () => {
    editor.chain().focus().setParagraph().run();
  };

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="sticky top-20 bg-white border border-substack-border rounded-lg mb-6 z-40">
      <div className="flex items-center px-4 py-3 space-x-1">
        {/* Undo/Redo */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="toolbar-button"
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="toolbar-button"
        >
          <Redo className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Style Selector */}
        <Select
          onValueChange={(value) => {
            switch (value) {
              case "paragraph":
                setParagraph();
                break;
              case "heading1":
                setHeading(1);
                break;
              case "heading2":
                setHeading(2);
                break;
              case "heading3":
                setHeading(3);
                break;
            }
          }}
        >
          <SelectTrigger className="w-32 h-8 text-sm border-none bg-transparent">
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paragraph">Paragraph</SelectItem>
            <SelectItem value="heading1">Heading 1</SelectItem>
            <SelectItem value="heading2">Heading 2</SelectItem>
            <SelectItem value="heading3">Heading 3</SelectItem>
          </SelectContent>
        </Select>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Text Formatting */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`toolbar-button ${editor.isActive('bold') ? 'active bg-primary text-primary-foreground' : ''}`}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`toolbar-button ${editor.isActive('italic') ? 'active bg-primary text-primary-foreground' : ''}`}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`toolbar-button ${editor.isActive('strike') ? 'active bg-primary text-primary-foreground' : ''}`}
        >
          <Strikethrough className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Links and Images */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLink}
          className={`toolbar-button ${editor.isActive('link') ? 'active bg-primary text-primary-foreground' : ''}`}
        >
          <Link className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const url = window.prompt('Image URL');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="toolbar-button"
        >
          <ImageIcon className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Lists */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`toolbar-button ${editor.isActive('bulletList') ? 'active bg-primary text-primary-foreground' : ''}`}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`toolbar-button ${editor.isActive('orderedList') ? 'active bg-primary text-primary-foreground' : ''}`}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>

        {/* Step 2 Only: Code Tools */}
        {step === 2 && (
          <>
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`toolbar-button ${editor.isActive('codeBlock') ? 'active bg-primary text-primary-foreground' : ''}`}
            >
              <Code className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`toolbar-button ${editor.isActive('code') ? 'active bg-primary text-primary-foreground' : ''}`}
            >
              <Terminal className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* More Options */}
        <div className="ml-auto flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="toolbar-button">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
