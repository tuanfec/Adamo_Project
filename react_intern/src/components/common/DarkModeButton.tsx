import { useTheme } from "@/config/theme-provider";
import { FloatButton } from "antd";
import FloatButtonGroup from "antd/es/float-button/FloatButtonGroup";
import { MoonOutlined, SettingOutlined, SunOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { HiMiniLanguage } from "react-icons/hi2";

export const DarkModeButton = () => {
  const { setTheme } = useTheme();
  const { theme } = useTheme();
  const { i18n } = useTranslation();
  return (
    <FloatButtonGroup
      shape="circle"
      trigger="click"
      icon={<SettingOutlined />}
      tooltip="Theme"
      style={{ insetBlockEnd: "100px" }}>
      <FloatButton
        icon={<SunOutlined />}
        onClick={() => {
          setTheme("light");
        }}
        tooltip="Light mode"
        type={theme === "light" ? "primary" : "default"}
      />
      <FloatButton
        icon={<MoonOutlined />}
        onClick={() => {
          setTheme("dark");
        }}
        tooltip="Dark mode"
        type={theme === "dark" ? "primary" : "default"}
      />
      <FloatButton
        icon={<HiMiniLanguage />}
        onClick={() => {
          i18n.changeLanguage("vi");
        }}
        tooltip="VN"
      />
      <FloatButton
        icon={<HiMiniLanguage />}
        onClick={() => {
          i18n.changeLanguage("en");
        }}
        tooltip="EN"
      />
    </FloatButtonGroup>
  );
};
