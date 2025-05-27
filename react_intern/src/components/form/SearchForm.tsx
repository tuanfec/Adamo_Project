import { CiLocationOn } from "react-icons/ci";
import { IoFlagOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { useEffect, useState, useMemo } from "react";
import { CustomDropdown } from "./CustomDropdown";
import { FormTitle } from "./FormTitle";
import { FormHeader } from "./FormHeader";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTour } from "@/app/slide/tourDataSlide";
import { setSearchHotel } from "@/app/slide/hotelDataSlide";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../notifiction/NotificationProvider";
import { useTranslation } from "react-i18next";
import { DateRangePickerForm } from "../ui/DateRangePickerForm";
import { format } from "date-fns";

interface SearchTourProps {
  isHeader: boolean;
  isTour: boolean;
}

const getUnique = (arr: any[]) => [...new Set(arr)];

export const SearchForm: React.FC<SearchTourProps> = ({ isHeader, isTour }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useNotification();
  const { t } = useTranslation();

  const [isOpenTour, setIsOpenTour] = useState(false);
  const [isOpenTotalGuest, setIsOpenTotalGuest] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"tour" | "hotel">("tour");

  const allTour = useSelector((state: any) => state.tourDataSlide.allTour);
  const searchTour = useSelector(
    (state: any) => state.tourDataSlide.searchTour
  );
  const searchHotel = useSelector(
    (state: any) => state.hotelDataSlide.searchHotel
  );
  const hotelData = useSelector((state: any) => state.hotelDataSlide.hotelData);
  const totalGuest = useSelector(
    (state: any) => state.tourDataSlide.totalGuest
  );

  useEffect(() => {
    setSelectedTab(isTour ? "tour" : "hotel");
  }, [isTour]);

  const zodSchema = z
    .object({
      location: z.string().min(1, t("formSearch.zod.location.required")),
      startDate: z.string().min(1, t("formSearch.zod.startDate.required")),
      endDate: z.string().min(1, t("formSearch.zod.endDate.required")),
      adult: z.number().min(1, t("formSearch.zod.adult.min")),
      child: z.number().min(0, t("formSearch.zod.child.min")),
      type: z.array(z.string()).optional(),
    })
    .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
      message: t("formSearch.zod.endDate.required"),
      path: ["endDate"],
    });

  type FormValues = z.infer<typeof zodSchema>;

  const methods = useForm<FormValues>({
    resolver: zodResolver(zodSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const uniqueTourTypes = useMemo(
    () => getUnique(allTour.map((tour: any) => tour.type)),
    [allTour]
  );
  const uniqueLocationTour = useMemo(
    () => getUnique(allTour.map((tour: any) => tour.location)),
    [allTour]
  );
  const uniqueLocationHotel = useMemo(
    () => getUnique(hotelData?.map((hotel: any) => hotel.location) || []),
    [hotelData]
  );

  useEffect(() => {
    const data = selectedTab === "tour" ? searchTour : searchHotel;
    Object.entries(data).forEach(([key, value]) => {
      setValue(key as keyof FormValues, value as any);
    });
  }, [selectedTab, searchTour, searchHotel, setValue]);

  const handleSearch = (data: FormValues) => {
    if (selectedTab === "tour") {
      dispatch(setSearchTour(data));
      navigate("/tours/search");
    } else {
      const { type, ...hotelData } = data;
      dispatch(setSearchHotel(hotelData));
      navigate("/hotels/search");
    }
    notification.success({
      message: t("notification.SearchPage"),
      type: "success",
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full h-full lg:w-[70%]">
        <div className="w-full bg-gray-300/60 dark:bg-gray-600/30 backdrop-blur-md h-full">
          {isHeader && (
            <FormHeader
              title1={t("formSearch.title.title_1")}
              title2={t("formSearch.title.title_2")}
              selectedTab={selectedTab}
              onSelectTab={setSelectedTab}
            />
          )}
          <div className="flex flex-col gap-5 p-6">
            <FormTitle
              title={
                selectedTab === "tour"
                  ? t("formSearch.content.title_1")
                  : t("formSearch.content.title_2")
              }
            />

            <div className="flex flex-col gap-5">
              <div className="relative bg-white dark:bg-[#2121216b] dark:text-[#ffffff] w-full">
                <div className="absolute left-5 top-1/2 -translate-y-1/2">
                  <CiLocationOn className="text-xl text-[#FF7B42]" />
                </div>
                <input
                  type="text"
                  placeholder={t("formSearch.input.placeholder_1")}
                  className="w-full py-5 pl-12 pr-4 text-sm"
                  list="location-list"
                  {...register("location")}
                />
                <datalist
                  className="bg-white dark:bg-[#2121216b] dark:text-[#ffffff]"
                  id="location-list">
                  {(selectedTab === "tour"
                    ? uniqueLocationTour
                    : uniqueLocationHotel
                  ).map((loc: string) => (
                    <option value={loc} key={loc} />
                  ))}
                </datalist>
                <p className="text-red-500 text-sm absolute bottom-5 right-5">
                  {errors.location?.message}
                </p>
              </div>

              <div className="relative w-full">
                <DateRangePickerForm />
                <p className="text-red-500 text-sm absolute bottom-5 right-5">
                  {errors.startDate?.message || errors.endDate?.message}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {selectedTab === "tour" && (
                <CustomDropdown
                  type={uniqueTourTypes as string[]}
                  isOpen={isOpenTour}
                  onToggle={() => setIsOpenTour(!isOpenTour)}
                  placeholder={t("formSearch.input.placeholder_2")}
                  isSelect
                  icon={<IoFlagOutline className="text-xl text-[#FF7B42]" />}
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  watch={watch}
                />
              )}
              <CustomDropdown<FormValues>
                totalGuest={totalGuest}
                isOpen={isOpenTotalGuest}
                isTotalGuest={true}
                onToggle={() => setIsOpenTotalGuest(!isOpenTotalGuest)}
                placeholder={t("formSearch.input.placeholder_3")}
                icon={<FiUsers className="text-xl text-[#FF7B42]" />}
                isSelect
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                setValue={setValue}
              />
            </div>

            <button
              type="submit"
              onClick={handleSubmit(handleSearch)}
              className="bg-[#FF7B42] font-medium text-white py-5 hover:bg-orange-600 transition-colors rounded-md">
              {t("formSearch.button")}
            </button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
