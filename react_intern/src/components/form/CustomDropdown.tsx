import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { ReactNode } from "react";

interface CustomDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  value: string;
  placeholder: string;
  options: string[];
  onSelect: (value: string) => void;
  icon: ReactNode;
  formatSelectedValue?: (value: string) => string;
}

export const CustomDropdown = ({
  isOpen,
  onToggle,
  value,
  placeholder,
  options,
  onSelect,
  icon,
  formatSelectedValue,
}: CustomDropdownProps) => {
  const displayValue = value
    ? formatSelectedValue
      ? formatSelectedValue(value)
      : value
    : placeholder;

  return (
    <div className="relative bg-white w-full">
      <div className="absolute left-5 top-1/2 -translate-y-1/2">{icon}</div>
      <div
        onClick={onToggle}
        className="w-full py-5 pl-12 pr-4 text-sm cursor-pointer flex justify-between items-center">
        <span className={value ? "text-black" : "text-gray-500"}>
          {displayValue}
        </span>
        <div className="absolute right-5 top-1/2 -translate-y-1/2">
          {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-[200px] overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onSelect(option);
                onToggle();
              }}
              className="px-5 py-3 hover:bg-gray-50 cursor-pointer text-sm">
              {formatSelectedValue ? formatSelectedValue(option) : option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
