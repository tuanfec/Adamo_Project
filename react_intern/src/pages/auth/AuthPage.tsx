import { AuthLayout } from "@layouts/AuthLayout";
import { ForgotPasswordForm } from "@components/authComponent/ForgotPasswordForm";
import { NewPassword } from "@components/authComponent/NewPassword";
import { useEffect } from "react";
import { RegisterFrom } from "@components/authComponent/RegisterFrom";
import { useLocation } from "react-router-dom";

function Author() {
  const statePage = useLocation().pathname;

  const renderFormComponent = () => {
    switch (statePage) {
      case "/login":
        return <NewPassword />;
      case "/sign-up":
        return <RegisterFrom />;
      case "/forgot-password":
        return <ForgotPasswordForm />;
      case "/reset-password":
        return <NewPassword />;
      default:
        return <NewPassword />;
    }
  };

  useEffect(() => {
    renderFormComponent();
  }, [statePage]);

  return (
    <AuthLayout
      formComponent={renderFormComponent()}
      imageSrc="https://cdn.builder.io/api/v1/image/assets/01d995a84ff2470a9fdd2b3e8bd7a978/2ebd12896896da2130c07c9e9e7cf1f2d40d5c49?placeholderIfAbsent=true"
      imageAlt="Password reset illustration"
    />
  );
}

export default Author;
