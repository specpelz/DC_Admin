import { AiOutlineClose } from "react-icons/ai";

interface ErrorComponentProps {
  errorMessage: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errorMessage }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center bg-red-100 border border-red-500 text-red-700 p-4 rounded-lg shadow-md w-[50%]">
        <span className="mr-2">
          <AiOutlineClose size={20} color="#FF0000" />
        </span>
        <span className="font-[500] text-[16px]">{errorMessage}</span>
      </div>
    </div>
  );
};

export default ErrorComponent;
