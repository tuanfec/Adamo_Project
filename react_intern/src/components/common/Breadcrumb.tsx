import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";

interface BreadcrumbItem {
  label: string;
  path: string;
}

export const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  // Xác định các loại view
  const isTourViewAll = paths[0] === "tours" && paths[1] === "view_all";
  const isTourDetailView = paths[0] === "tours" && paths[1] === "view_detail";
  const isTourSearch = paths[0] === "tours" && paths[1] === "search";
  const isHotelDetailView = paths[0] === "hotels" && paths[1] === "view_detail";

  const items: BreadcrumbItem[] = [{ label: "Home", path: "/" }];

  if (paths[0] === "tours") {
    items.push({ label: "Tours", path: "/tours" });
    if (isTourViewAll) {
      items.push({
        label: "View All",
        path: `/tours/view_all/${paths[2] || ""}`,
      });
    }
    if (isTourDetailView) {
      items.push({
        label: "View All",
        path: `/tours/view_all/${paths[2] || ""}`,
      });
      items.push({
        label: "Tour Detail",
        path: location.pathname,
      });
    }
    if (isTourSearch) {
      items.push({
        label: "Search",
        path: "/tours/search",
      });
    }
  }

  if (paths[0] === "hotels") {
    items.push({ label: "Hotels", path: "/hotels" });
    if (isHotelDetailView) {
      items.push({
        label: "Hotel Detail",
        path: location.pathname,
      });
    }
  }
  if (paths[0] === "contact") {
    items.push({ label: "Contact", path: "/contact" });
  }
  if (paths[0] === "about") {
    items.push({ label: "About", path: "/about" });
  }
  if (paths[0] === "policy") {
    items.push({ label: "Policy", path: "/policy" });
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
                  : "text-gray-700 hover:text-gray-900"
              } ${index === items.length - 1 ? "font-medium" : ""}`}>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};
