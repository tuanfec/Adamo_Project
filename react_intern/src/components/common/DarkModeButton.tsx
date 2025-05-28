import FloatButtonGroup from "antd/es/float-button/FloatButtonGroup";
import { SettingOutlined } from "@ant-design/icons";
import { ButtonChange } from "../custum/Button/ButtonChange";
import { ButtonMode } from "../custum/ButtonMode/ButtonMode";

export const DarkModeButton = () => {
  return (
    <FloatButtonGroup
      shape="circle"
      trigger="click"
      icon={<SettingOutlined />}
      tooltip="Theme"
      style={{ insetBlockEnd: "100px" }}>
      <ButtonMode />
      <ButtonChange />
    </FloatButtonGroup>
  );
};
