import { useTheme } from "@/config/theme-provider";
import { FloatButton } from "antd";
import FloatButtonGroup from "antd/es/float-button/FloatButtonGroup";
import { MoonOutlined, SettingOutlined, SunOutlined } from "@ant-design/icons";
import { useState } from "react";

export const DarkModeButton = () => {
  const { setTheme } = useTheme();
  const [mode, setMode] = useState<boolean>(false);
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
          setMode(true);
        }}
        tooltip="Light mode"
        type={mode ? "primary" : "default"}
      />
      <FloatButton
        icon={<MoonOutlined />}
        onClick={() => {
          setTheme("dark");
          setMode(false);
        }}
        tooltip="Dark mode"
        type={mode ? "default" : "primary"}
      />
    </FloatButtonGroup>
  );
};
