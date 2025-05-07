export const SortDropdown: React.FC<{
  options: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}> = ({ options, selectedIndex, onSelect }) => (
  <div className="absolute top-8 right-0 z-20">
    <div className="bg-white shadow-md rounded-md py-1 min-w-[200px]">
      {options.map((item, index) =>
        index !== selectedIndex ? (
          <p
            key={item}
            className="text-lg font-md text-[#4F4F4F] hover:bg-gray-100 cursor-pointer px-4 py-2"
            onClick={() => onSelect(index)}>
            {item}
          </p>
        ) : null
      )}
    </div>
  </div>
);
