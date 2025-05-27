import { useTheme } from "@/config/theme-provider";
import { FloatButton } from "antd";
import FloatButtonGroup from "antd/es/float-button/FloatButtonGroup";
import { MoonOutlined, SettingOutlined, SunOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { RiEnglishInput } from "react-icons/ri";
import { LiaVine } from "react-icons/lia";
import { ButtonChange } from "../custum/Button/ButtonChange";

export const DarkModeButton = () => {
  const { setTheme } = useTheme();
  const { theme } = useTheme();
  const { i18n } = useTranslation();
  console.log(i18n.language);

  return (
    <FloatButtonGroup
      shape="circle"
      trigger="click"
      icon={<SettingOutlined />}
      tooltip="Theme"
      style={{ insetBlockEnd: "100px" }}>
      {theme === "light" ? (
        <FloatButton
          icon={<MoonOutlined />}
          onClick={() => {
            setTheme("dark");
          }}
          tooltip="Dark mode"
        />
      ) : (
        <FloatButton
          icon={<SunOutlined />}
          onClick={() => {
            setTheme("light");
          }}
          tooltip="Light mode"
        />
      )}
      <ButtonChange />
      {i18n.language === "en" ? (
        <FloatButton
          icon={<LiaVine />}
          onClick={() => {
            i18n.changeLanguage("vi");
          }}
          tooltip="VN"
        />
      ) : (
        <FloatButton
          icon={<RiEnglishInput />}
          onClick={() => {
            i18n.changeLanguage("en");
          }}
          tooltip="EN"
        />
      )}
    </FloatButtonGroup>
  );
};
