import { ReactNode } from "react"
import clsx from "clsx"

interface Props {
    children:ReactNode;
    active?: boolean;
    onClick?():void;
    
}

const ToolButton = ({children, active,onClick}:Props) => {
  return (
   <button onClick={onClick}
   className={clsx("p-2", active ? "bg-black text-white":"text-[#9B9B9B]")}
   >{children}</button>
  )
}

export default ToolButton