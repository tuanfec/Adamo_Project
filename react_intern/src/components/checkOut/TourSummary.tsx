import { CustomDropdown } from "../form/CustomDropdown";
import { LuCalendarClock } from "react-icons/lu";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { AddOn, Room } from "@/types/hotel";

const zodSchema = z.object({
  adult: z.number().min(1, "Adult is required"),
  child: z.number().min(0, "Child is required"),
});
type FormValues = z.infer<typeof zodSchema>;

const TourSummary: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(zodSchema) });
  const { tourDetail, total, totalGuest } = useLocation().state;
  const { selectedRoom, addOn, hotelData, totalPrice } = useLocation().state;
  console.log("selectedRoom", selectedRoom);
  console.log("addOn", totalPrice);

  return (
    <div className="w-full h-full ">
      <div className="w-full bg-[#F4F4F4] backdrop-blur-md ">
        <div className="flex flex-col gap-4 pt-8 pb-3 px-7">
          <div className="flex flex-col gap-2 ">
            <h2 className="text-xl font-medium">
              {tourDetail?.title || hotelData?.name}
            </h2>
            <div className="flex items-center gap-2">
              <CiLocationOn className="text-xl text-[#FF7B42]" />
              <span className="text-sm text-[#636567]">
                {tourDetail?.location || hotelData?.location}
              </span>
            </div>
          </div>

          {tourDetail && (
            <div className="flex items-center gap-[30%]">
              <div className="flex flex-col">
                <p className="text-gray-600 text-sm">Duration:</p>
                <span className="font-medium">{tourDetail?.duration}</span>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-600 text-sm">Type:</p>
                <span className="font-medium">{tourDetail?.type}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col ">
            <div className="flex flex-col gap-6 py-5">
              <CustomDropdown<FormValues>
                icon={<LuCalendarClock className="text-xl text-[#FF7B42]" />}
                isSelect={false}
                isDuration={true}
                tourDetail={tourDetail}
                hotelData={hotelData}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />

              <CustomDropdown<FormValues>
                isTotalGuest={true}
                totalGuest={totalGuest}
                placeholder="Number of guests"
                icon={<FiUsers className="text-xl text-[#FF7B42]" />}
                isSelect={false}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />

              <div className="flex relative w-full items-center gap-4">
                <input
                  className="bg-white w-2/3 py-4 px-3 text-sm cursor-pointer"
                  type="text"
                  placeholder="Promo Code"
                />
                <button className="border w-1/3 border-[#FF7B42] text-[#FF7B42]  font-medium text-lg h-[52px] px-4">
                  Apply
                </button>
              </div>
            </div>
            {hotelData && (
              <div className="flex flex-col gap-4">
                {selectedRoom.map((item: Room) => {
                  return (
                    <div className="flex justify-between">
                      <div className="flex gap-2 items-center">
                        <p className="text-md font-medium text-[#FF7B42]">
                          {item?.numberSelect}x
                        </p>
                        <span className="font-bold text-md">{item?.name}</span>
                      </div>
                      <span className="font-bold text-lg">
                        ${item?.price}.00
                      </span>
                    </div>
                  );
                })}
                <div>
                  <p className="text-lg font-medium text-[#888888]">Add-ons</p>
                  <div className="flex flex-col gap-2 mt-2">
                    {addOn && (
                      <div>
                        {addOn?.breakfast.numberSelect > 0 && (
                          <div className="flex justify-between">
                            <div className="flex gap-2">
                              <p className="text-md font-medium text-[#FF7B42]">
                                {addOn?.breakfast.numberSelect}x
                              </p>
                              <span className="font-bold text-md">
                                Breakfast:
                              </span>
                            </div>

                            <span className="font-bold text-lg">
                              ${addOn?.breakfast.price}.00
                            </span>
                          </div>
                        )}
                        {addOn?.extraBed.numberSelect > 0 && (
                          <div className="flex justify-between">
                            <div className="flex gap-2">
                              <p className="text-md font-medium text-[#FF7B42]">
                                {addOn?.extraBed.numberSelect}x
                              </p>
                              <span className="font-bold text-md">
                                Extra Bed:
                              </span>
                            </div>

                            <span className="font-bold text-lg">
                              ${addOn?.extraBed.price}.00
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex bg-black items-center justify-between lg:py-8 py-6 text-white px-7 mb-10">
        <p className="text-xl font-normal">Total: </p>{" "}
        {tourDetail ? (
          <p className="font-bold text-xl ">${total || tourDetail?.price}.00</p>
        ) : (
          <p className="font-bold text-xl ">${totalPrice}.00</p>
        )}
      </div>
    </div>
  );
};

export default TourSummary;
