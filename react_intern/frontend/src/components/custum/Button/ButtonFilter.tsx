export const ButtonFilter: React.FC<{
  onClick: () => void;
  content: string;
  icon?: any;
}> = ({ onClick, content, icon }) => {
  return (
    <button
      onClick={onClick}
      className="group/button h-fit relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
      <span className="text-lg flex items-center gap-4">
        {content}
        {icon}
      </span>
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
        <div className="relative h-full w-10 bg-white/20"></div>
      </div>
    </button>
  );
};
