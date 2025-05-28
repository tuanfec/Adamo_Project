import { useGetBookHistory } from "@/hooks/useComon";
import { Tabs, TabsProps } from "antd";
import { CardBook } from "./CardBook";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBookHistory } from "@/app/slide/checkOutSlide";

export const BookHistory = () => {
  const { t } = useTranslation();
  const dispath = useDispatch();

  const BookingHistoryDataRedux = useSelector(
    (state: any) => state.bookingSlide.bookHistory
  );

  const userId: any = (() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      return {
        id: parsed.uid,
      };
    } catch (error) {
      return null;
    }
  })();

  const { data: BookHistoryData } = useGetBookHistory(userId.id);

  useEffect(() => {
    if (BookHistoryData) {
      dispath(setBookHistory(BookHistoryData));
    }
  }, [BookHistoryData]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("booking.Comingsoon"),
      children: (
        <>
          {BookingHistoryDataRedux &&
            BookingHistoryDataRedux.map((data: any, index: number) => (
              <div key={index} className="lg:my-8 md:my-6 my-5">
                <CardBook data={data} />
              </div>
            ))}
        </>
      ),
    },
    {
      key: "2",
      label: t("booking.hasended"),
      children: "Content of Tab Pane 2",
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} type="card" tabBarGutter={20} />
    </div>
  );
};
