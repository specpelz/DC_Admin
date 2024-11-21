import {
  BiAlignJustify,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiBold,
  BiCodeAlt,
  BiCodeCurly,
  // BiImageAlt,
  BiItalic,
  BiListOl,
  BiListUl,
  BiStrikethrough,
  BiUnderline,
} from "react-icons/bi";
import ToolButton from "./ToolButton";
import { ChainedCommands, Editor } from "@tiptap/react";
import { ChangeEventHandler } from "react";
import LinkForm from "./LinkForm";


interface Props {
  editor: Editor | null;
  onImageSelection?():void
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
  // {
  //   task: "image",
  //   icon: <BiImageAlt size={20} />,
  // },
] as const;

type HeadingType = (typeof headingOptions)[number]["task"];
const headingOptions = [
  {task:"p", value:"Paragraph"},
  {task:"h1", value:"Heading 1"},
  {task:"h2", value:"Heading 2"},
  {task:"h3", value:"Heading 3"},
] as const


const chainMethods = (
  editor: Editor | null,
  command: (chain: ChainedCommands) => ChainedCommands
) => {
  if (!editor) return;
  command(editor?.chain().focus()).run();
};

type TaskType = (typeof tools)[number]["task"];


const Tools = ({ editor, 
  // onImageSelection 
}: Props) => {


  const handleLinkSubmission = (link: string) => {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    if(urlPattern.test(link)){
      if (link === '') {
        editor?.chain().focus().extendMarkRange('link').unsetLink()
          .run()
  
        return
      }
  
      // update link
      editor?.chain().focus().extendMarkRange('link').setLink({ href: link })
        .run()

  
  
    }
  }


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
      // case "image":
      //   return onImageSelection && onImageSelection()
    }
  };
const handleHeadingSelection:ChangeEventHandler<HTMLSelectElement>=({target})=>{
  const {value} = target as {value:HeadingType}

  switch(value){
    case 'p':
      return chainMethods(editor, chain => chain.setParagraph())
    case 'h1':
      return chainMethods(editor, chain => chain.toggleHeading({level: 1}))
    case 'h2':
      return chainMethods(editor, chain => chain.toggleHeading({level: 2}))
    case 'h3':
      return chainMethods(editor, chain => chain.toggleHeading({level: 3}))
  }

}

const getSelectedHeading = ():HeadingType => {
  let result: HeadingType= "p"
  if(editor?.isActive('heading',{level:1})) result = 'h1'
  if(editor?.isActive('heading',{level:2})) result = 'h2'
  if(editor?.isActive('heading',{level:3})) result = 'h3'

  return result
}

  return (
    <div className="border-t-[1px] border-t-[#9B9B9B] border-b-[1px] border-b-[#9B9B9B] py-[5px] flex justify-between ">
      <select 
      value={getSelectedHeading()}
      className="bg-white p-2 text-[16px] text-[#9B9B9B]" 
      onChange={handleHeadingSelection}
      >
{headingOptions.map(item =>{
  return <option key={item.task} value={item.task}>{item.value}</option>
})}
      </select>
      <LinkForm onSubmit={handleLinkSubmission}/>
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
