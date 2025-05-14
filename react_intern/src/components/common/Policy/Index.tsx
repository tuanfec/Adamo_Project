import { usePolicy } from "@/hooks/usePolicy";
import { Loading } from "@/components/common/Loading";
import { Header } from "@/components/common/Policy/Header";
import { Content } from "@/components/common/Policy/Content";
import { FloatButton, Anchor } from "antd";
import { Footer } from "@/components/common/Policy/Footer";
import { ContentPolicy } from "@/types/policy";
import { useTheme } from "@/config/theme-provider";
export const Policy = () => {
  const { data, isLoading } = usePolicy();
  const { theme } = useTheme();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex gap-2 mb-30">
      <div className="flex flex-col w-8/10">
        <Header data={data} />
        <Content data={data} />
        <Footer data={data} />
      </div>
      <div className="w-2/10 absolute right-0">
        <div className={`${theme === "dark" ? "dark" : ""}`}>
          <Anchor
            items={[
              ...data.contentPolicy.map((item: ContentPolicy) => ({
                key: item.title,
                href: `#${item.title}`,
                title: item.title,
                children: item.information.map((information) => ({
                  key: information.title,
                  href: `#${information.title}`,
                  title: information.title,
                })),
              })),
            ]}
          />
        </div>
      </div>
      <FloatButton.BackTop visibilityHeight={200} />
    </div>
  );
};
