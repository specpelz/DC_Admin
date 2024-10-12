import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Tools from "./Tools";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import ImageGallery from "./ImageGallery";
import { useEffect, useState } from "react";
import Link from "@tiptap/extension-link";

const extensions = [
  StarterKit,
  Underline,
  Link.configure({
    openOnClick: false,
    autolink: false,
    linkOnPaste: true,
    HTMLAttributes: {
      target: "",
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Placeholder.configure({
    placeholder: "Start writing your blog post...",
  }),
];

interface Props {
  editorDefault: string;
  onContentChange: (content: string) => void;
}

const RichEditor = ({ editorDefault , onContentChange }: Props) => {
  const [showImageGallery, setShowImageGallery] = useState<boolean>(false);

  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl outline-none p-8 w-full",
      },
    },
    content: editorDefault,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      onContentChange(content);
    },
  });

  const [editorColor, setEditorColor] = useState<boolean>(false);

  useEffect(() => {
    if (editor && editor.getHTML() !== editorDefault) {
      editor.commands.setContent(editorDefault);
    }
  }, [editor, editorDefault]);

  return (
    <>
      <div className="flex flex-col space-y-6">
        <div
          onBlur={() => setEditorColor(false)}
          onFocus={() => setEditorColor(true)}
          className={`flex flex-col w-full border-[1px] rounded-[4px] h-[245px] overflow-auto ${
            editorColor === true
              ? "bg-white border-blue-500 shadow-sm shadow-blue-300"
              : "bg-[#E6E6E6] border-[#9B9B9B] "
          } `}
        >
          <EditorContent editor={editor} className="h-full w-full" />
        </div>
        <div>
          <Tools
            editor={editor}
            onImageSelection={() => setShowImageGallery(true)}
          />
        </div>
      </div>
      <ImageGallery visible={showImageGallery} onClose={setShowImageGallery} />
    </>
  );
};

export default RichEditor;
