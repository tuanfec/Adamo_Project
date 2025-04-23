import { AuthLayout } from "@layouts/AuthLayout";
import { ForgotPasswordForm } from "@components/authComponent/ForgotPasswordForm";
import { NewPassword } from "@components/authComponent/NewPassword";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RegisterFrom } from "@components/authComponent/RegisterFrom";

enum PageState {
  FORGOT_PASSWORD = "forgotPassword",
  NEW_PASSWORD = "newPassword",
  REGISTER = "register",
  SIGN_IN = "signIn",
}

interface RootState {
  statePageSlide: {
    state: PageState;
  };
}

function Author() {
  const statePage = useSelector(
    (state: RootState) => state.statePageSlide.state
  );
  console.log(statePage);

  const renderFormComponent = () => {
    switch (statePage) {
      case PageState.FORGOT_PASSWORD:
        return <ForgotPasswordForm />;
      case PageState.NEW_PASSWORD:
        return <NewPassword />;
      case PageState.REGISTER:
        return <RegisterFrom />;
      case PageState.SIGN_IN:
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
