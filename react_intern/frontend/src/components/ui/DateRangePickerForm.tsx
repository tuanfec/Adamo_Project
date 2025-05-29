"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils"; // nếu bạn dùng className helper

export function DateRangePickerForm() {
  const { watch, setValue } = useFormContext();
  const { t } = useTranslation();
  const [showCalendar, setShowCalendar] = useState(false);

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const date: DateRange = {
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  };

  const displayText = date.from
    ? date.to
      ? `${format(date.from, "dd/MM/yyyy")} - ${format(date.to, "dd/MM/yyyy")}`
      : format(date.from, "dd/MM/yyyy")
    : t("formSearch.input.Date");

  return (
    <div className="w-full">
      <Button
        variant="outline"
        onClick={() => setShowCalendar(!showCalendar)}
        className={cn(
          "w-full py-7 rounded-none border-none text-white bg-white cursor-pointer font-normal dark:bg-[#2121216b] pl-6 text-sm justify-start text-left hover:bg-white"
        )}>
        <CalendarIcon className="mr-2 h-4 w-4 text-[#FF7B42]" />
        <span className={cn(!date.from && "text-[#bbbbbb]")}>
          {displayText}
        </span>
      </Button>

      {showCalendar && (
        <div className="mt-2 border absolute z-9999 rounded-md shadow-md bg-white dark:bg-[#212121]">
          <Calendar
            mode="range"
            selected={date}
            onSelect={(range: DateRange | undefined) => {
              setValue(
                "startDate",
                range?.from ? format(range.from, "yyyy-MM-dd") : ""
              );
              setValue(
                "endDate",
                range?.to ? format(range.to, "yyyy-MM-dd") : ""
              );
            }}
            numberOfMonths={2}
          />
        </div>
      )}
    </div>
  );
}
