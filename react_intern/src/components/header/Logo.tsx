interface LogoProps {
  src: string;
  width?: number;
  height?: number;
  textColor?: string;
}

export const Logo: React.FC<LogoProps> = ({
  src,
  width = 150,
  height = 50,
  textColor,
}) => {
  return (
    <div className="p-4">
      <img
        src={src}
        alt="logo"
        width={width}
        height={height}
        className={`object-contain ${textColor ? "filter brightness-0" : textColor} dark:filter-none`}
      />
    </div>
  );
};
