import { Route, Routes } from "react-router-dom";
import AuthPage from "@pages/AuthPage";

function AuthRouter() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/sign-up" element={<AuthPage />} />
      <Route path="/forgot-password" element={<AuthPage />} />
      <Route path="/reset-password-confirm" element={<AuthPage />} />
    </Routes>
  );
}

export default AuthRouter;
