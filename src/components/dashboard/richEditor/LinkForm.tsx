import { useState } from 'react'
import ToolButton from './ToolButton'
import { BiLink } from 'react-icons/bi'


interface Props {
    onSubmit(link: string):void
}

const LinkForm = ({onSubmit}:Props) => {
    const [showForm, setShowForm] = useState<boolean>(false)
    const [link, setLink] = useState<string>("")

  return (
    <div>
        <ToolButton 
        onClick={()=> setShowForm(value => !value)}
        >
            <BiLink size={22}/>
        </ToolButton>
        {showForm && <div className='absolute bottom-[10px] z-[999] ring-1 ring-black p-2 rounded flex items-center shadow-sm bg-white'>
            <input 
            value={link}
            onChange={ ({target})=> setLink(target.value)}
            onBlur={()=> setShowForm(false)}
                type="text" className='text-[#222222] text-[14px] outline-none' placeholder='https://www.url.com'/>
            <button 
            
            onMouseDown={()=>{ 
                onSubmit(link)
               setLink("")
               setShowForm(false)
            }}
            className='text-[16px]  bg-white ml-[5px]'>ok</button>
            </div>} 
    </div>
  )
}

export default LinkForm