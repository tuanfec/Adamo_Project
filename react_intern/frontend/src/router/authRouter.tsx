import { Route, Routes } from "react-router-dom";
import AuthPage from "@pages/auth/AuthPage";
import NotFoundPage from "@/pages/common/NotFoundPage";

function AuthRouter() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/sign-up" element={<AuthPage />} />
      <Route path="/forgot-password" element={<AuthPage />} />
      <Route path="/reset-password-confirm" element={<AuthPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AuthRouter;
