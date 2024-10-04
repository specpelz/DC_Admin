import {
  BiAlignJustify,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiBold,
  BiCodeAlt,
  BiCodeCurly,
  BiImageAlt,
  BiItalic,
  BiListOl,
  BiListUl,
  BiStrikethrough,
  BiUnderline,
} from "react-icons/bi";
import ToolButton from "./ToolButton";
import { ChainedCommands, Editor } from "@tiptap/react";


interface Props {
  editor: Editor | null;
}

const tools = [
  {
    task: "bold",
    icon: <BiBold size={20} />,
  },
  {
    task: "italic",
    icon: <BiItalic size={20} />,
  },
  {
    task: "underline",
    icon: <BiUnderline size={20} />,
  },
  {
    task: "strike",
    icon: <BiStrikethrough size={20} />,
  },
  {
    task: "code",
    icon: <BiCodeAlt size={20} />,
  },
  {
    task: "codeBlock",
    icon: <BiCodeCurly size={20} />,
  },
  {
    task: "left",
    icon: <BiAlignLeft size={20} />,
  },
  {
    task: "center",
    icon: <BiAlignMiddle size={20} />,
  },
  {
    task: "right",
    icon: <BiAlignRight size={20} />,
  },
  {
    task: "justify",
    icon: <BiAlignJustify size={20} />,
  },
  {
    task: "bulletList",
    icon: <BiListUl size={20} />,
  },
  {
    task: "orderedList",
    icon: <BiListOl size={20} />,
  },
  {
    task: "image",
    icon: <BiImageAlt size={20} />,
  },
] as const;

const chainMethods = (
  editor: Editor | null,
  command: (chain: ChainedCommands) => ChainedCommands
) => {
  if (!editor) return;
  command(editor?.chain().focus()).run();
};

type TaskType = (typeof tools)[number]["task"];

const Tools = ({ editor }: Props) => {
  const handleOnClick = (task: TaskType) => {
    switch (task) {
      case "bold":
        return chainMethods(editor, (chain) => chain.toggleBold());
      case "italic":
        return chainMethods(editor, (chain) => chain.toggleItalic());
      case "underline":
        return chainMethods(editor, (chain) => chain.toggleUnderline());
      case "strike":
        return chainMethods(editor, (chain) => chain.toggleStrike());
      case "code":
        return chainMethods(editor, (chain) => chain.toggleCode());
      case "codeBlock":
        return chainMethods(editor, (chain) => chain.toggleCodeBlock());
      case "orderedList":
        return chainMethods(editor, (chain) => chain.toggleOrderedList());
      case "bulletList":
        return chainMethods(editor, (chain) => chain.toggleBulletList());
      case "left":
        return chainMethods(editor, (chain) => chain.setTextAlign("left"));
      case "center":
        return chainMethods(editor, (chain) => chain.setTextAlign("center"));
      case "right":
        return chainMethods(editor, (chain) => chain.setTextAlign("right"));
      case "justify":
        return chainMethods(editor, (chain) => chain.setTextAlign("justify"));
    }
  };

  return (
    <div className="border-t-[1px] border-t-[#9B9B9B] border-b-[1px] border-b-[#9B9B9B] py-[5px] flex justify-between ">
      {tools.map(({ icon, task },index) => {
        return (
          <ToolButton
          key={index.toString()}
            onClick={() => handleOnClick(task)}
            active={
              editor?.isActive(task) || editor?.isActive({textAlign: task})
            }
          >
            {icon}
          </ToolButton>
        );
      })}
    </div>
  );
};

export default Tools;
