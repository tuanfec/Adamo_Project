import { AiFillCaretUp } from "react-icons/ai";
import { Header } from "./Header";
import { AiFillCaretDown } from "react-icons/ai";

interface ContentForm {
  isOpen: boolean;
  headerTitle: string;
  content: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
}

export const DropContent: React.FC<ContentForm> = ({
  isOpen,
  headerTitle,
  content,
  onClick,
  icon,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col gap-2 
      ${isOpen ? "bg-[#F4F4F4]" : "bg-white"} ${isOpen ? "" : "border border-gray-300"} 
       mb-6 py-3 px-4 rounded-lg`}>
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-col">
          <Header isOpen={isOpen} title={headerTitle} icon={icon} />
          <div className="mt-2 mx-6 text-gray-600">{isOpen && content}</div>
        </div>
        <div onClick={onClick}>
          {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </div>
      </div>
    </div>
  );
};
