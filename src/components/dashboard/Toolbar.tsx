import { Button } from "antd";
import { Editor } from "slate";
import { useSlate } from "slate-react";

export const Toolbar = () => {
  const editor = useSlate();

  const toggleFormat = (format: string) => {
    toggleMark(editor, format);
  };

  return (
    <div className="toolbar">
      <Button onMouseDown={() => toggleFormat("bold")}>Bold</Button>
      <Button onMouseDown={() => toggleFormat("italic")}>Italic</Button>O
      <Button onMouseDown={() => toggleFormat("underline")}>Underline</Button>
      {/* Add more buttons for different formatting options */}
    </div>
  );
};

// Function to toggle marks
export const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// Check if a mark is active
const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
