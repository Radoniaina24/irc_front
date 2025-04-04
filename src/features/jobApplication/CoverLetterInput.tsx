"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Link as LinkIcon,
  ListOrdered,
  UnderlineIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}
const toolbarButtons = [
  { command: "toggleBold", icon: <Bold className="w-4 h-4" />, type: "bold" },
  {
    command: "toggleItalic",
    icon: <Italic className="w-4 h-4" />,
    type: "italic",
  },
  {
    command: "toggleOrderedList",
    icon: <ListOrdered className="w-5 h-5" />,
    type: "orderedList",
  },
  {
    command: "toggleUnderline",
    icon: <UnderlineIcon className="w-4 h-4" />,
    type: "underline",
  },
  {
    command: "setTextAlign",
    args: "left",
    icon: <AlignLeft className="w-4 h-4" />,
    type: { textAlign: "left" },
  },
  {
    command: "setTextAlign",
    args: "center",
    icon: <AlignCenter className="w-4 h-4" />,
    type: { textAlign: "center" },
  },
  {
    command: "setTextAlign",
    args: "justify",
    icon: <AlignJustify className="w-4 h-4" />,
    type: { textAlign: "justify" },
  },
  {
    command: "setTextAlign",
    args: "right",
    icon: <AlignRight className="w-4 h-4" />,
    type: { textAlign: "right" },
  },
];
const headingLevels = [1, 2, 3, 4, 5, 6];
const ToolbarButton = ({ editor, command, args, icon, type }: any) => (
  <button
    onClick={() => editor.chain().focus()[command](args).run()}
    className={`p-2 rounded-md ${
      editor.isActive(type) ? "bg-gray-300" : "hover:bg-gray-200"
    }`}
  >
    {icon}
  </button>
);

const CoverLetterInput: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Récupère le HTML mis à jour
    },
    immediatelyRender: false,
  });
  // Met à jour l'éditeur lorsque Formik réinitialise `value`
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-lg shadow bg-white p-3">
      {/* Barre d'outils */}

      {/* Zone de texte */}
      <div className="mt-3 min-h-[300px] max-h-[300px] p-2 border rounded bg-gray-50 overflow-y-auto">
        <EditorContent editor={editor} className="prose max-w-none" />
      </div>
    </div>
  );
};

export default CoverLetterInput;
