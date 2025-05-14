import { CiLocationOn } from "react-icons/ci";
import { LuCalendarClock } from "react-icons/lu";
import { IoFlagOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { useEffect, useState, useMemo } from "react";
import { CustomDropdown } from "./CustomDropdown";
import { FormTitle } from "./FormTitle";
import { FormHeader } from "./FormHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTour } from "@/app/slide/tourDataSlide";
import { setSearchHotel } from "@/app/slide/hotelDataSlide";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../notifiction/NotificationProvider";
interface SearchTourProps {
  isHeader: boolean;
  isTour: boolean;
}

const zodSchema = z
  .object({
    location: z.string().min(1, "Location is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    adult: z.number().min(1, "Adult is required"),
    child: z.number().min(0, "Child is required"),
    type: z.array(z.string()).optional(),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Start date must be before end date",
    path: ["endDate"],
  });
type FormValues = z.infer<typeof zodSchema>;

// Helper to get unique values from array
const getUnique = (arr: any[]) => [...new Set(arr)];
export const SearchForm: React.FC<SearchTourProps> = ({ isHeader, isTour }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenTour, setIsOpenTour] = useState(false);
  const [isOpenTotalGuest, setIsOpenTotalGuest] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"tour" | "hotel">("tour");
  const notification = useNotification();
  useEffect(() => {
    setSelectedTab(isTour ? "tour" : "hotel");
  }, [isTour]);

  // Redux selectors
  const allTour = useSelector((state: any) => state.tourDataSlide.allTour);
  const searchTour = useSelector(
    (state: any) => state.tourDataSlide.searchTour
  );
  const searchHotel = useSelector(
    (state: any) => state.hotelDataSlide.searchHotel
  );
  const hotelData = useSelector((state: any) => state.hotelDataSlide.hotelData);

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(zodSchema),
  });

  // Memoized values for locations/types
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

  // Set form values from redux state
  useEffect(() => {
    const data = selectedTab === "tour" ? searchTour : searchHotel;
    Object.entries(data).forEach(([key, value]) => {
      setValue(
        key as keyof FormValues,
        value as string | number | string[] | undefined
      );
    });
  }, [selectedTab, searchTour, searchHotel, setValue]);

  const totalGuest = { adult: watch("adult"), child: watch("child") };

  // Handle form submit
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
      message: "Search successful",
      type: "success",
    });
  };

  return (
    <div className="w-full h-full lg:w-[70%] ">
      <div className="w-full bg-gray-300/60 dark:bg-gray-600/30 backdrop-blur-md h-full">
        {isHeader && (
          <FormHeader
            title1="Tours"
            title2="Hotels"
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
          />
        )}
        <div className="flex flex-col gap-5 p-6">
          <FormTitle
            title={
              selectedTab === "tour"
                ? "Discover beautiful Vietnam"
                : "Find hotels for your next trip"
            }
          />

          {/* Location & Date */}
          <div className="flex flex-col gap-5">
            <div className="relative bg-white dark:bg-[#2121216b] dark:text-[#ffffff] w-full">
              <div className="absolute left-5 top-1/2 -translate-y-1/2">
                <CiLocationOn className="text-xl text-[#FF7B42]" />
              </div>
              <input
                type="text"
                placeholder="Location"
                className="w-full py-5 pl-12 pr-4 text-sm "
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
            </div>

            <div className="relative bg-white w-full dark:bg-[#2121216b] dark:text-[#bbbbbb]">
              <div className="absolute left-5 top-1/2 -translate-y-1/2">
                <LuCalendarClock className="text-xl text-[#FF7B42]" />
              </div>
              <div className="flex items-center">
                <div className="flex flex-col w-full">
                  <input
                    type="date"
                    placeholder="Start date"
                    className="py-5 pl-12 pr-4 text-sm outline-none cursor-pointer"
                    {...register("startDate")}
                  />
                  <p className="text-red-500 text-sm absolute bottom-0 left-5">
                    {errors.startDate?.message}
                  </p>
                </div>

                <span className="px-2">-</span>
                <div className="flex flex-col">
                  <input
                    type="date"
                    placeholder="End date"
                    className="py-5 pl-4 pr-4 text-sm outline-none cursor-pointer"
                    {...register("endDate")}
                  />
                  <p className="text-red-500 text-sm absolute bottom-0 right-3">
                    {errors.endDate?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dropdowns */}
          <div className="flex flex-col gap-4">
            {selectedTab === "tour" && (
              <CustomDropdown
                type={uniqueTourTypes as string[]}
                isOpen={isOpenTour}
                onToggle={() => setIsOpenTour(!isOpenTour)}
                placeholder="Type of tour"
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
              isTotalGuest
              onToggle={() => setIsOpenTotalGuest(!isOpenTotalGuest)}
              placeholder="Number of guests"
              icon={<FiUsers className="text-xl text-[#FF7B42]" />}
              isSelect
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit(handleSearch)}
            className="bg-[#FF7B42] font-medium text-white py-5 hover:bg-orange-600 transition-colors rounded-md">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
