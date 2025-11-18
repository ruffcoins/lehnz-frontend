import { Editor } from "@tiptap/react";
import { Button } from "@/features/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/shared/ui/select";
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Strikethrough,
  Link,
  Image as ImageIcon,
  Upload,
  List,
  ListOrdered,
  Code,
  Terminal,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";

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
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = false;

    input.onchange = async event => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      try {
        // Create a preview URL for the image
        const imageUrl = URL.createObjectURL(file);

        // Insert the image into the editor
        editor.chain().focus().setImage({ src: imageUrl }).run();

        toast.success("Image uploaded successfully");
      } catch (error) {
        toast.error("Failed to upload image");
      }
    };

    input.click();
  };

  const handleImageFromURL = () => {
    const url = window.prompt("Image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border-substack-border sticky top-20 z-40 mb-6 rounded-lg border bg-white">
      <div className="flex items-center space-x-1 px-4 py-3">
        {/* Undo/Redo */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="toolbar-button"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="toolbar-button"
        >
          <Redo className="h-4 w-4" />
        </Button>

        <div className="mx-2 h-6 w-px bg-gray-300"></div>

        {/* Style Selector */}
        <Select
          onValueChange={value => {
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
          <SelectTrigger className="h-8 w-32 border-none bg-transparent text-sm">
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paragraph">Paragraph</SelectItem>
            <SelectItem value="heading1">Heading 1</SelectItem>
            <SelectItem value="heading2">Heading 2</SelectItem>
            <SelectItem value="heading3">Heading 3</SelectItem>
          </SelectContent>
        </Select>

        <div className="mx-2 h-6 w-px bg-gray-300"></div>

        {/* Text Formatting */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`toolbar-button ${editor.isActive("bold") ? "active bg-primary text-primary-foreground" : ""}`}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`toolbar-button ${editor.isActive("italic") ? "active bg-primary text-primary-foreground" : ""}`}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`toolbar-button ${editor.isActive("strike") ? "active bg-primary text-primary-foreground" : ""}`}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <div className="mx-2 h-6 w-px bg-gray-300"></div>

        {/* Links and Images */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLink}
          className={`toolbar-button ${editor.isActive("link") ? "active bg-primary text-primary-foreground" : ""}`}
          title="Add Link"
        >
          <Link className="h-4 w-4" />
        </Button>

        {/* Image Upload Dropdown */}
        <div className="group relative">
          <Button variant="ghost" size="sm" className="toolbar-button" title="Add Image">
            <ImageIcon className="h-4 w-4" />
          </Button>

          {/* Dropdown Menu */}
          <div className="invisible absolute top-full left-0 z-50 mt-1 w-48 rounded-lg border border-gray-200 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
            <div className="py-1">
              <button
                onClick={handleImageUpload}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                <Upload className="h-4 w-4" />
                Upload from Device
              </button>
              <button
                onClick={handleImageFromURL}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                <ImageIcon className="h-4 w-4" />
                From URL
              </button>
            </div>
          </div>
        </div>

        <div className="mx-2 h-6 w-px bg-gray-300"></div>

        {/* Lists */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`toolbar-button ${editor.isActive("bulletList") ? "active bg-primary text-primary-foreground" : ""}`}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`toolbar-button ${editor.isActive("orderedList") ? "active bg-primary text-primary-foreground" : ""}`}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        {/* Step 2 Only: Code Tools */}
        {step === 2 && (
          <>
            <div className="mx-2 h-6 w-px bg-gray-300"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`toolbar-button ${editor.isActive("codeBlock") ? "active bg-primary text-primary-foreground" : ""}`}
            >
              <Code className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`toolbar-button ${editor.isActive("code") ? "active bg-primary text-primary-foreground" : ""}`}
            >
              <Terminal className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* More Options */}
        <div className="ml-auto flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="toolbar-button">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
