import React from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { ButtonFilter } from "../custum/Button/ButtonFilter";

interface FilterProps {
  isFilter: boolean;
  setIsFilter: (value: boolean) => void;
}

export const Filter: React.FC<FilterProps> = ({ isFilter, setIsFilter }) => {
  const { t } = useTranslation();
  return isFilter ? (
    <ButtonFilter
      onClick={() => setIsFilter(!isFilter)}
      content={t("filter.title")}
      icon={<IoMdClose />}
    />
  ) : (
    <ButtonFilter
      onClick={() => setIsFilter(!isFilter)}
      content={t("filter.title")}
    />
  );
};
