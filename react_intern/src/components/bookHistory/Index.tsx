import { useGetBookHistory } from "@/hooks/useComon";
import { Tabs, TabsProps } from "antd";
import { CardBook } from "./CardBook";
import { Loading } from "../common/Loading";
import { useTranslation } from "react-i18next";

export const BookHistory = () => {
  const { t } = useTranslation();
  const { data: BookHistoryData, isLoading } = useGetBookHistory();
  if (isLoading) {
    return <Loading />;
  }
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("booking.hasended"),
      children: (
        <>
          {BookHistoryData.map((data: any, index: number) => (
            <div className="lg:my-8 md:my-6 my-5">
              <CardBook key={index} data={data} />
            </div>
          ))}
        </>
      ),
    },
    {
      key: "2",
      label: t("booking.Comingsoon"),
      children: "Content of Tab Pane 2",
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        type="card"
        tabBarGutter={20}
      />
    </div>
  );
};
