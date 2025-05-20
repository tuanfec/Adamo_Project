export const AvatarCard: React.FC<{
  user?: {
    name: string;
    avatar: string;
  };
  isUserCommnet: boolean;
}> = ({ user, isUserCommnet }) => {
  return (
    <div>
      {isUserCommnet ? (
        <img
          className="w-full rounded-full h-full border border-gray-300 dark:border-gray-600"
          src={
            JSON.parse(localStorage.getItem("user") || "{}")?.photoURL ||
            "https://res.cloudinary.com/dboapyvvu/image/upload/v1745654255/stylish-spectacles-guy-3d-avatar-character-illustrations-png_vl1ms3.webp"
          }
          alt={user?.name}
        />
      ) : (
        <div className="flex flex-col items-center">
          <img
            className="w-full rounded-full h-full border border-gray-300 dark:border-gray-600"
            src={
              user?.avatar ||
              "https://res.cloudinary.com/dboapyvvu/image/upload/v1745654255/stylish-spectacles-guy-3d-avatar-character-illustrations-png_vl1ms3.webp"
            }
            alt={user?.name}
          />
          <div className="dark:text-white text:black font-medium mt-2 italic">
            {user?.name}
          </div>
        </div>
      )}
    </div>
  );
};
