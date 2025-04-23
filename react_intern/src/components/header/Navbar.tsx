import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "@/services/authService";

interface NavItem {
  label: string;
  path: string;
  isLoggedIn?: boolean;
  onClick?: () => void;
}

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

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
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems: NavItem[] = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Tours", path: "/tours" },
    { label: "Hotels", path: "/hotels" },
    { label: "Contact", path: "/contact" },
    {
      label: "Login",
      path: "/login",
      isLoggedIn: false,
    },
    {
      label: "Logout",
      path: "/",
      isLoggedIn: true,
      onClick: handleLogout,
    },
  ];

  // Filter nav items based on login status
  const filteredNavItems = navItems.filter((item) => {
    if (item.isLoggedIn === undefined) return true;
    return item.isLoggedIn === isLoggedIn;
  });

  return (
    <nav className="relative z-10 ">
      <button onClick={toggleMenu} className="lg:hidden text-white">
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div className="hidden ml-35 lg:flex items-center justify-center gap-20 text-white">
        {filteredNavItems.map((item) =>
          item.onClick ? (
            <button
              key={item.label}
              onClick={item.onClick}
              className="hover:text-orange-400 transition-colors duration-200">
              {item.label}
            </button>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className="hover:text-orange-400 transition-colors duration-200">
              {item.label}
            </Link>
          )
        )}
      </div>

      {isOpen && (
        <div className="lg:hidden absolute right-1 text-right flex flex-col gap-2 mt-2 text-white cursor-pointer bg-black/50 p-4 rounded">
          {filteredNavItems.map((item) =>
            item.onClick ? (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className="hover:text-orange-400 transition-colors duration-200">
                {item.label}
              </button>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className="hover:text-orange-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
};
