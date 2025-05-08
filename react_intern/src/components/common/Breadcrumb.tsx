import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";

interface BreadcrumbItem {
  label: string;
  path: string;
}

export const Breadcrumb = () => {
  const location = useLocation();
  const { header } = useParams<{ header: string }>();
  const paths = location.pathname.split("/").filter(Boolean);
  const isDetailView = paths[0] === "View_detail";
  const isViewAll = paths[0] === "View_all";

  // Lấy header từ state nếu có (ưu tiên), fallback về params
  const currentHeader = location.state?.previousHeader || header || "Search";
  const items: BreadcrumbItem[] = [{ label: "Home", path: "/" }];

  if (isViewAll || isDetailView) {
    items.push({
      label: "Tours",
      path: `/View_all/${currentHeader}`,
    });
  }
  // if (currentHeader === "Search") {
  //   items.push({
  //     label: "Search",
  //     path: `/Search`,
  //   });
  // }
  if (isDetailView) {
    items.push({
      label: "Tour Detail",
      path: location.pathname,
    });
  }

  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <HiChevronRight className="mx-2 text-gray-400" />}
            <Link
              to={item.path}
              state={location.state}
              className={`text-sm ${
                index === items.length - 1
                  ? "text-gray-500"
                  : "text-gray-700 hover:text-gray-900"
              }`}>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};
