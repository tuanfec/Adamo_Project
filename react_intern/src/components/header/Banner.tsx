export const Banner: React.FC<{
  height?: string;
  children: React.ReactNode;
  image?: string;
}> = ({ height = "776px", children, image }) => {
  return (
    <div
      className="w-full bg-cover bg-center shadow-sm z-10"
      style={{
        minHeight: height,
        backgroundImage: image ? `url(${image})` : undefined,
      }}>
      <div className="h-full w-full">{children}</div>
    </div>
  );
};
