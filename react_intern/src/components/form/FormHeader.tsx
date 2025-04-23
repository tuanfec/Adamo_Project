interface FormHeaderProps {
  title1: string;
  title2: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ title1, title2 }) => {
  return (
    <div className="flex relative h-[46px] w-full">
      <label
        htmlFor="tour-name"
        className="flex items-center text-white font-medium justify-center text-sm bg-[#FF7B42] w-full h-full cursor-pointer hover:bg-orange-500 transition-colors">
        {title1}
      </label>
      <label
        htmlFor="hotel-name"
        className="flex items-center bg-gray-300/20 font-medium justify-center text-sm w-full h-full cursor-pointer transition-colors">
        {title2}
      </label>
    </div>
  );
};
