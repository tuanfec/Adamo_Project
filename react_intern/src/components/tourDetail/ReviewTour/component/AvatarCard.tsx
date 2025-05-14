export const AvatarCard: React.FC = () => {
  return (
    <img
      className="w-full rounded-full h-full border border-gray-300 dark:border-gray-600"
      src={
        JSON.parse(localStorage.getItem("user") || "{}")?.photoURL ||
        "https://res.cloudinary.com/dboapyvvu/image/upload/v1745654255/stylish-spectacles-guy-3d-avatar-character-illustrations-png_vl1ms3.webp"
      }
      alt="User avatar"
    />
  );
};
