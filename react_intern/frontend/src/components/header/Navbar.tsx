import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "@/services/authService";
import { useNotification } from "@/components/notifiction/NotificationProvider";
import { useTranslation } from "react-i18next";
import { CgProfile } from "react-icons/cg";

interface NavItem {
  label: string;
  path: string;
  isLoggedIn?: boolean;
  onClick?: () => void;
}

export const Navbar: React.FC<{ textColor?: string }> = ({ textColor }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const notification = useNotification();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpentProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check login status from localStorage
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
    // Listen for storage changes
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "false");
      navigate("/");
      notification.success({
        title: "Success",
        message: t("notification.Logout"),
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems: NavItem[] = [
    { label: "navbar.home", path: "/" },
    { label: "navbar.about", path: "/about" },
    { label: "navbar.tour", path: "/tours" },
    { label: "navbar.hotels", path: "/hotels" },
    { label: "navbar.contact", path: "/contact" },
  ];
  const userItem: NavItem[] = [
    {
      label: "navbar.booking_history",
      path: "/booking_history",
      isLoggedIn: true,
    },
    {
      label: "navbar.save",
      path: "/save",
      isLoggedIn: true,
    },
    {
      label: "navbar.login",
      path: "/Login",
      isLoggedIn: false,
    },
    {
      label: "navbar.logout",
      path: "/",
      isLoggedIn: true,
      onClick: handleLogout,
    },
  ];
  console.log(isOpenProfile);

  // Filter nav items based on login status
  const filteredNavItems = userItem.filter((item) => {
    if (item.isLoggedIn === undefined) return true;
    return item.isLoggedIn === isLoggedIn;
  });

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="relative z-10 ">
      <button
        onClick={toggleMenu}
        className={`lg:hidden ${textColor ? textColor : "text-white"} dark:text-white`}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div
        className={`hidden ml-35 lg:flex items-center justify-center dark:text-white gap-20 ${
          textColor ? textColor : "text-white"
        }`}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`transition-colors  dark:hover:text-orange-400 duration-200 hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 rounded-sm px-2 py-1 ${
              isActive(item.path) ? "text-orange-400" : ""
            }`}>
            {t(item.label)}
            {/* {item.label} */}
          </Link>
        ))}
        <div className="relative">
          <CgProfile
            onClick={() => setIsOpentProfile(!isOpenProfile)}
            className="size-5 cursor-pointer hover:text-orange-400"
          />
          {isOpenProfile && (
            <div
              className=" min-w-[150px] absolute right-1 text-right flex flex-col gap-2 mt-2 items-end text-white cursor-pointer bg-black/80 p-4 rounded"
              role="menu">
              {filteredNavItems.map((item) =>
                item.onClick ? (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    className="hover:text-orange-400 text-right w-full hover:bg-[#515158] cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 rounded-sm px-2 py-1"
                    role="menuitem">
                    {t(item.label)}
                  </button>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`hover:text-orange-400 w-full hover:bg-[#515158] cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 rounded-sm px-2 py-1 ${
                      isActive(item.path) ? "text-orange-400" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                    role="menuitem">
                    {t(item.label)}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="lg:hidden min-w-[150px] absolute right-1 text-right flex flex-col gap-2 mt-2 text-white cursor-pointer bg-black p-4 rounded"
          role="menu"
          aria-orientation="vertical">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:text-orange-400 hover:bg-[#515158] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 rounded-sm px-2 py-1 ${
                isActive(item.path) ? "text-orange-400" : ""
              }`}
              onClick={() => setIsOpen(false)}
              role="menuitem">
              {t(item.label)}
            </Link>
          ))}
          {filteredNavItems.map((item) =>
            item.onClick ? (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className="hover:text-orange-400 hover:bg-[#515158] cursor-pointer transition-colors text-right duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 rounded-sm px-2 py-1"
                role="menuitem">
                {t(item.label)}
              </button>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`hover:text-orange-400 transition-colors hover:bg-[#515158] duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 rounded-sm px-2 py-1 ${
                  isActive(item.path) ? "text-orange-400" : ""
                }`}
                onClick={() => setIsOpen(false)}
                role="menuitem">
                {t(item.label)}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
};
