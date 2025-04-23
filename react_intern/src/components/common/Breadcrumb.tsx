import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";

interface BreadcrumbItem {
  label: string;
  path: string;
}

export const Breadcrumb = () => {
  const location = useLocation();

  const generateBreadcrumb = (): BreadcrumbItem[] => {
    const paths = location.pathname.split("/").filter((path) => path);
    const items: BreadcrumbItem[] = [{ label: "Home", path: "/" }];

    paths.forEach((path) => {
      switch (path) {
        case "view_all":
          items.push({ label: "Tours", path: "/view_all" });
          break;
        case "view_detail":
          items.push({ label: "Detail tour", path: "/view_detail" });
          break;
        default:
          items.push({ label: path, path: `/${path}` });
      }
    });

    return items;
  };

  const breadcrumbItems = generateBreadcrumb();

  return (
    <div className="flex gap-6 items-center text-gray-500 lg:mb-10 mb-4 md:mb-6">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.path}>
          {index === breadcrumbItems.length - 1 ? (
            <span className="text-[#FF7B42]">{item.label}</span>
          ) : (
            <>
              <Link
                to={item.path}
                className="hover:text-[#FF7B42] transition-colors">
                {item.label}
              </Link>
              <GoDotFill className="size-3" />
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
