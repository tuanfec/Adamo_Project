import { IoSearch } from "react-icons/io5";
export const ButtonSearch: React.FC<{
  onClick: () => void;
  content: string;
}> = ({ onClick, content }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative group w-full">
        <button
          onClick={onClick}
          className="relative w-full flex justify-center p-px font-semibold leading-6 text-white bg-[#FF7B42] shadow-2xl cursor-pointer   transition-all duration-300 ease-in-out hover:scale-101 active:scale-95 hover:shadow-[#FF7B42]">
          <span className="relative z-10 block px-6 py-4  bg-[#FF7B42]">
            <div className="relative z-10 flex items-center space-x-2">
              <span className="transition-all font-bold duration-500 group-hover:translate-x-1.5 group-hover:text-[#FAF0CA]">
                {content}
              </span>
              <IoSearch className="size-4 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-[#FAF0CA]" />
            </div>
          </span>
        </button>
      </div>
    </div>
  );
};
