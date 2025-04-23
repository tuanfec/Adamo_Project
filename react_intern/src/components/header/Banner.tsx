export const Banner: React.FC<{
  height?: string;
  children: React.ReactNode;
}> = ({ height = "776px", children }) => {
  return (
    <div
      className="w-full bg-cover bg-center bg-[url(/src/assets/banner_img.jpg)] shadow-sm"
      style={{ minHeight: height }}>
      <div className="h-full w-full">{children}</div>
    </div>
  );
};
