import { BiCheck, BiSolidTrash } from "react-icons/bi";

interface Props {
  src: string;
  onDeleteClick?(): void;
  onSelectClick?(): void;
}

const GalleryImage = ({ src,onDeleteClick,onSelectClick }: Props) => {
  return (
      <div className="relative w-full aspect-square overflow-hidden rounded-sm">
        <img src={src} alt="image" className="w-full h-full object-cover" />
        <div className="flex absolute left-0 right-0 bottom-0">
          <button onClick={onDeleteClick} className="flex flex-1 items-center justify-center p-2 bg-red-400 text-white">
            <BiSolidTrash size={16} />
          </button>
          <button onClick={onSelectClick} className="flex flex-1 items-center justify-center p-2 bg-blue-400 text-whitw">
            <BiCheck size={16} />
          </button>
        </div>
      </div>
  );
};

export default GalleryImage;
