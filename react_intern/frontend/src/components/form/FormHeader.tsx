interface FormHeaderProps {
  title1: string;
  title2: string;
  selectedTab: "tour" | "hotel";
  onSelectTab: (tab: "tour" | "hotel") => void;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  title1,
  title2,
  selectedTab,
  onSelectTab,
}) => {
  return (
    <div className="flex relative h-[46px] w-full">
      <label
        className={`flex items-center text-white font-medium justify-center text-sm w-full h-full cursor-pointer transition-colors ${
          selectedTab === "tour" ? "bg-orange-500" : "bg-gray-300/20"
        }`}
        onClick={() => onSelectTab("tour")}>
        {title1}
      </label>
      <label
        className={`flex items-center font-medium justify-center text-sm w-full h-full cursor-pointer transition-colors ${
          selectedTab === "hotel"
            ? "bg-orange-500 text-white"
            : "bg-gray-300/20"
        }`}
        onClick={() => onSelectTab("hotel")}>
        {title2}
      </label>
    </div>
  );
};
