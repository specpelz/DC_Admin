import {
  // EditorProvider,
  EditorContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Tools from "./Tools";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

const extensions = [
  StarterKit,
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"], // Ensure it's applied to headings and paragraphs
  }),
  Placeholder.configure({
    placeholder: "Start writing your blog post...",
  }),
];

const RichEditor = () => {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl  outline-none p-8 w-full",
      },
    },
    // content:"<H1>Hello world <strong>how are you?</strong></H1>"
  });

  //  editor?.commands.setContent("")

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col w-full border-[1px] border-[#9B9B9B] rounded-[4px] h-[245px] overflow-auto">
        <EditorContent
          editor={editor}
          className="h-full w-full"
          // extensions={[StarterKit]}
          //  content="<H1>Hello world <strong>how are you?</strong></H1>"
        />
      </div>
      <div>
        <Tools editor={editor} />
      </div>
    </div>
  );
};

export default RichEditor;
