import { Link, useLocation } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import { useTranslation } from "react-i18next";

interface BreadcrumbItem {
  label: string;
  path: string;
}

export const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);
  const { t } = useTranslation();
  // Xác định các loại view
  const isTourViewAll = paths[0] === "tours" && paths[1] === "view_all";
  const isTourDetailView = paths[0] === "tours" && paths[1] === "view_detail";
  const isTourSearch = paths[0] === "tours" && paths[1] === "search";
  const isHotelDetailView = paths[0] === "hotels" && paths[1] === "view_detail";
  const isHotelSearch = paths[0] === "hotels" && paths[1] === "search";
  const isBookHistoryDetail =
    paths[0] === "booking_history" && paths[1] === "detail";

  const items: BreadcrumbItem[] = [{ label: t("Breadcrumb.home"), path: "/" }];

  if (paths[0] === "tours") {
    items.push({ label: t("Breadcrumb.Tours"), path: "/tours" });
    if (isTourViewAll) {
      items.push({
        label: t("Breadcrumb.viewAll"),
        path: `/tours/view_all/${paths[2] || ""}`,
      });
    }
    if (isTourDetailView) {
      items.push({
        label: t("Breadcrumb.viewAll"),
        path: `/tours/view_all/${paths[2] || ""}`,
      });
      items.push({
        label: t("Breadcrumb.tourDetail"),
        path: location.pathname,
      });
    }
    if (isTourSearch) {
      items.push({
        label: t("Breadcrumb.Search"),
        path: "/tours/search",
      });
    }
  }

  if (paths[0] === "hotels") {
    items.push({ label: t("Breadcrumb.Hotels"), path: "/hotels" });
    if (isHotelDetailView) {
      items.push({
        label: t("Breadcrumb.hotelDetail"),
        path: location.pathname,
      });
    }
    if (isHotelSearch) {
      items.push({
        label: t("Breadcrumb.Search"),
        path: "/hotels/search",
      });
    }
  }

  if (paths[0] === "booking_history") {
    items.push({
      label: t("Breadcrumb.BookHistory"),
      path: "/booking_history",
    });
    if (isBookHistoryDetail) {
      items.push({
        label: t("Breadcrumb.BookDetail"),
        path: location.pathname,
      });
    }
  }
  if (paths[0] === "save") {
    items.push({ label: t("Breadcrumb.save"), path: "/save" });
  }

  if (paths[0] === "contact") {
    items.push({ label: t("Breadcrumb.Contact"), path: "/contact" });
  }
  if (paths[0] === "about") {
    items.push({ label: t("Breadcrumb.About"), path: "/about" });
  }
  if (paths[0] === "policy") {
    items.push({ label: t("Breadcrumb.Policy"), path: "/policy" });
  }

  // Có thể bổ sung thêm cho các route khác nếu cần

  return (
    <nav className="flex my-7" aria-label="Breadcrumb">
      <ol className="inline-flex items-center">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <HiChevronRight className="mx-2 text-gray-400" />}
            <Link
              to={item.path}
              state={location.state}
              className={`text-sm ${
                index === items.length - 1
                  ? "text-[#FF7B42]"
                  : "text-gray-700 dark:text-[#bbbbbb] hover:text-gray-900"
              } ${index === items.length - 1 ? "font-medium" : ""}`}>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};
