import { Tag } from "antd";

export const TagComponet: React.FC<{ data: any }> = ({ data }) => {
  return <Tag color="#a34d28">{data?.name}</Tag>;
};
