"use client";

import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEditor, EditorContent, isActive } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  UnderlineIcon,
  Undo,
} from "lucide-react";

interface TiptapProps {
  content?: string;
  onChange?: (html: string, json: object) => void;
  placeholder?: string;
}

const Tiptap = ({
  content = "",
  onChange,
  placeholder = "Start writing...",
}: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none min-h-[300px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML(), editor.getJSON());
      }
    },
  });

  if (editor === null) return null;

  const ToolbarButton = ({
    onClick,
    isActive,
    disabled,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title?: string;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded-md transition-colors
        ${
          isActive
            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
        }
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="h-screen w-full overflow-hidden bg-white dark:bg-gray-900">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50/80 backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-800">
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            title="Bold"
          >
            <Bold size={18} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("bold")}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            title="Italic"
          >
            <Italic size={18} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            title="Underline"
          >
            <UnderlineIcon size={18} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />

          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              isActive={editor.isActive("heading", { level: 1 })}
              title="Heading 1"
            >
              <Heading1 size={18} />
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              isActive={editor.isActive("heading", { level: 2 })}
              title="Heading 2"
            >
              <Heading2 size={18} />
            </ToolbarButton>
          </div>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />

          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive("bulletList")}
              title="Bullet List"
            >
              <ListOrdered size={18} />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive("orderedList")}
              title="Ordered List"
            >
              <ListOrdered size={18} />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive("blockquote")}
              title="Blockquote"
            >
              <Quote size={18} />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              isActive={editor.isActive("codeBlock")}
              title="Code Block"
            >
              <Code size={18} />
            </ToolbarButton>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />

            <div className="flex items-center gap-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                title="Undo"
              >
                <Undo size={18} />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                title="Redo"
              >
                <Redo size={18} />
              </ToolbarButton>
            </div>
          </div>
        </div>
      </div>
      <EditorContent editor={editor} />
      <BubbleMenu editor={editor}>
        <div className="flex gap-1 bg-white p-1 rounded shadow border">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
          >
            <Bold size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
          >
            <Italic size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
          >
            <UnderlineIcon size={16} />
          </ToolbarButton>
        </div>
      </BubbleMenu>
      <FloatingMenu
        editor={editor}
        className="flex items-center gap-1 p-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg dark:border-gray-700"
      >
        <ToolbarButton
          onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List size={16} />
        </ToolbarButton>
      </FloatingMenu>
    </div>
  );
};

export default Tiptap;
