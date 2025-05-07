export const HotelBanner: React.FC<{
  height?: string;
  children: React.ReactNode;
}> = ({ height = "776px", children }) => {
  return (
    <div
      className="w-full bg-cover bg-center bg-[url(/src/assets/hotel_banner.png)] shadow-sm z-10"
      style={{ minHeight: height }}>
      <div className="h-full w-full">{children}</div>
    </div>
  );
};
