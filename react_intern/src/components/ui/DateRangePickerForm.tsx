"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "react-i18next";

export function DateRangePickerForm() {
  const { watch, setValue } = useFormContext();
  const { t } = useTranslation();

  // Watch the startDate and endDate fields
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // Create a DateRange object for react-day-picker
  const date: DateRange = {
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full py-7 rounded-none hover:bg-white border-none text-white bg-white cursor-pointer font-normal dark:bg-[#2121216b] pl-6 text-sm justify-start text-left">
          <span className="text-[#FF7B42]">
            <CalendarIcon />
          </span>
          {date.from ? (
            date.to ? (
              <>
                {format(date.from, "dd/MM/yyyy")} -{" "}
                {format(date.to, "dd/MM/yyyy")}
              </>
            ) : (
              format(date.from, "dd/MM/yyyy")
            )
          ) : (
            <span className="text-[#bbbbbb]">{t("formSearch.input.Date")}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
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
      </PopoverContent>
    </Popover>
  );
}
