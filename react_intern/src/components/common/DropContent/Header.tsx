interface HeaderProps {
  title: string;
  icon?: React.ReactNode;
  isOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, icon, isOpen }) => {
  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <div className="flex flex-row items-center gap-2">
        <div
          className={`text-xl font-medium ${isOpen ? "text-[#04316A] dark:text-[#bbbbbb]" : "text-black dark:text-[#bbbbbb]"}`}>
          {icon}
        </div>
        <p
          className={`text-xl  font-medium ${isOpen ? "text-[#04316A] dark:text-[#ebeaea]" : "text-black dark:text-[#ebeaea]"}`}>
          {title}
        </p>
      </div>
    </div>
  );
};
