import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

interface UploadMessageProps {
  imageName?: React.ReactNode;
  onClose: () => void; 
}

const UploadMessage: React.FC<UploadMessageProps> = ({ imageName, onClose }) => {
  return (
    <div className="flex items-center gap-[16px] pr-[20px] bg-[#fff] rounded-l-[10px]">
      <div className="w-[24px] bg-green-500 h-full py-[20px] rounded-l-[10px]"></div>
      <p className="text-[14px] font-[500] pl-[5px] text-BrandBlack1">
        {imageName}.
      </p>
      <button onClick={onClose} className="focus:outline-none">
        <IoCloseOutline size={24} />
      </button>
    </div>
  );
};

export default UploadMessage;
