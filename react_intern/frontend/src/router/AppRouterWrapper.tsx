import AuthRouter from "@/router/authRouter";
import HomeRouter from "@/router/homeRouter";
import { useLocation } from "react-router-dom";

export function AppRouterWrapper() {
  const location = useLocation();
  const authPaths = [
    "/login",
    "/sign-up",
    "/forgot-password",
    "/reset-password-confirm",
  ];

  const isAuthPage = authPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return isAuthPage ? <AuthRouter /> : <HomeRouter />;
}
