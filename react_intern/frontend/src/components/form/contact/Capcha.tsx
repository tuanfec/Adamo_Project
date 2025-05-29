import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
export const Capcha = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  return (
    <div>
      <form>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey="Your client site key"
        />
      </form>
    </div>
  );
};
