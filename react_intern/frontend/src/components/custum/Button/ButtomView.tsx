export const ButtomView: React.FC<{
  content: string;
  onClick?: () => void;
}> = ({ content, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group cursor-pointer w-1/3 md:w-1/4 lg:w-1/6 mt-4 md:mt-0 relative inline-flex items-center justify-center md:px-6 md:py-2 px-6 py-2 lg:text-lg md:text-md text-sm font-bold text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
      <div className="absolute inset-0 bg-gradient-to-br dark:bg-[#FF7B42] bg-black rounded-full transition-all duration-300 group-hover:scale-110 animate-gradient"></div>

      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="glitter-container">
          <div className="glitter"></div>
          <div className="glitter"></div>
          <div className="glitter"></div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-full border-2 border-white opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-300"></div>

      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="wave"></div>
      </div>

      <span className="relative z-10 flex items-center gap-2">
        <span className="tracking-wider">{content}</span>
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1">
          <path
            d="M13 7l5 5m0 0l-5 5m5-5H6"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"></path>
        </svg>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </span>
    </button>
  );
};
