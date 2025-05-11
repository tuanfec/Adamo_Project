import { CiLocationOn } from "react-icons/ci";
import { LuCalendarClock } from "react-icons/lu";
import { IoFlagOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { useState } from "react";
import { CustomDropdown } from "./CustomDropdown";
import { FormTitle } from "./FormTitle";
import { FormHeader } from "./FormHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTour } from "@/app/slide/tourDataSlide";
import { data, useNavigate } from "react-router-dom";
interface SearchTourProps {
  isHeader: boolean;
  isTour: boolean;
}

const zodSchema = z.object({
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  adult: z.number().min(1, "Adult is required"),
  child: z.number().min(0, "Child is required"),
  type: z.array(z.string()).optional(),
});
type FormValues = z.infer<typeof zodSchema>;

export const SearchTour: React.FC<SearchTourProps> = ({ isHeader, isTour }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenTour, setIsOpenTour] = useState(false);
  const [isOpenTotalGuest, setIsOpenTotalGuest] = useState(false);
  const allTour = useSelector((state: any) => state.tourDataSlide.allTour);
  const searchTour = useSelector(
    (state: any) => state.tourDataSlide.searchTour
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(zodSchema),
    defaultValues: searchTour,
  });

  const tourTypes = allTour.map((tour: any) => tour.type);
  const uniqueTourTypes = [...new Set(tourTypes)];
  const location = allTour.map((tour: any) => tour.location);
  const uniqueLocation: string[] = [...new Set(location)] as string[];
  const totalGuest = { adult: watch("adult"), child: watch("child") };
  const handleSearchTour = (data: FormValues) => {
    dispatch(
      setSearchTour({
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        type: data.type,
        adult: data.adult,
        child: data.child,
      })
    );
    navigate("/tours/search");
  };
  return (
    <div className="w-full h-full lg:w-[70%]">
      <div className="w-full bg-gray-300/60 backdrop-blur-md h-full">
        {isHeader && <FormHeader title1="Tours" title2="Hotels" />}
        <div className="flex flex-col gap-5 p-6">
          {isTour ? (
            <FormTitle title="Discover beautiful Vietnam" />
          ) : (
            <FormTitle title="Find hotels for your next trip" />
          )}

          <div className="flex flex-col gap-5">
            <div className="relative bg-white w-full">
              <div className="absolute left-5 top-1/2 -translate-y-1/2">
                <CiLocationOn className="text-xl text-[#FF7B42]" />
              </div>
              <input
                type="text"
                placeholder="Location"
                className="w-full py-5 pl-12 pr-4 text-sm"
                list="location-list"
                {...register("location")}
              />
              <datalist className="bg-white" id="location-list">
                {uniqueLocation.map((loc: string) => (
                  <option value={loc} key={loc} />
                ))}
              </datalist>
            </div>

            <div className="relative bg-white w-full">
              <div className="absolute left-5 top-1/2 -translate-y-1/2">
                <LuCalendarClock className="text-xl text-[#FF7B42]" />
              </div>
              <div className="flex items-center">
                <input
                  type="date"
                  placeholder="Start date"
                  className="w-1/2 py-5 pl-12 pr-4 text-sm outline-none cursor-pointer"
                  {...register("startDate")}
                />
                <span className="px-2">-</span>
                <input
                  type="date"
                  placeholder="End date"
                  className="w-1/2 py-5 pl-4 pr-4 text-sm outline-none cursor-pointer"
                  {...register("endDate")}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {isTour && (
              <CustomDropdown
                type={uniqueTourTypes as string[]}
                key="type"
                isOpen={isOpenTour}
                onToggle={() => setIsOpenTour(!isOpenTour)}
                placeholder="Type of tour"
                isSelect={true}
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
              key="totalGuest"
              isTotalGuest={true}
              onToggle={() => setIsOpenTotalGuest(!isOpenTotalGuest)}
              placeholder="Number of guests"
              icon={<FiUsers className="text-xl text-[#FF7B42]" />}
              isSelect={true}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit(handleSearchTour)}
            className="bg-[#FF7B42] font-medium text-white py-5 hover:bg-orange-600 transition-colors rounded-md">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
