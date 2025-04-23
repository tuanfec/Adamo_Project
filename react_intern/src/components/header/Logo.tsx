interface LogoProps {
  src: string;
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({
  src,
  width = 150,
  height = 50,
}) => {
  return (
    <div className="p-4">
      <img
        src={src}
        alt="logo"
        width={width}
        height={height}
        className="object-contain"
      />
    </div>
  );
};
