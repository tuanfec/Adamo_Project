import { LuCalendarClock } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { TourData } from "@/types/tour";
import { HotelFormData, Room } from "@/types/hotel";
import { CustomDropdown } from "./CustomDropdown";
import { ButtonCountRoom } from "./hotel/ButtonCountRoom";
import AddOnSection from "./hotel/AddOnSection";
import { setSelectedRoom } from "@/app/slide/hotelDataSlide";
import { setStatePage, PageState } from "@/app/slide/statePageSlide";
import { useNotification } from "../notifiction/NotificationProvider";

// Form validation schema
const zodSchema = z.object({
  adult: z.number().min(1, "Adult is required"),
  child: z.number().min(0, "Child is required"),
});
type FormValues = z.infer<typeof zodSchema>;

interface DetailCardFormProps {
  isHotel: boolean;
  tourData?: TourData;
  hotelData?: HotelFormData;
}

export const DetailCardForm: React.FC<DetailCardFormProps> = ({
  isHotel,
  tourData,
  hotelData,
}) => {
  // Hooks & state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const notification = useNotification();
  const [isOpenTotalGuest, setIsOpenTotalGuest] = useState(false);

  // Redux selectors
  const tourDetail = useSelector(
    (state: any) => state.tourDataSlide.tourDetail
  );
  const totalGuest = useSelector(
    (state: any) => state.tourDataSlide.totalGuest
  );
  const selectedRoom = useSelector(
    (state: any) => state.hotelDataSlide.selectedRoom
  );
  const addOn = useSelector((state: any) => state.hotelDataSlide.addOn);

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ resolver: zodResolver(zodSchema) });

  // Helpers
  const checkRoom = selectedRoom.some((selectedItem: Room) =>
    hotelData?.rooms?.some((hotelRoom) => hotelRoom.id === selectedItem.id)
  );

  const minPrice = Math.min(
    ...(hotelData?.rooms?.map((item) => item.price) || [])
  );
  const total =
    tourDetail?.price * totalGuest?.adult +
    (tourDetail?.price * totalGuest?.child) / 2;
  const totalPrice = selectedRoom.reduce((acc: number, room: Room) => {
    return (
      acc +
      room.price * (room.numberSelect || 0) +
      (hotelData?.addOn?.breakfast?.price || 0) *
        (addOn?.breakfast?.numberSelect || 0) +
      (hotelData?.addOn?.extraBed?.price || 0) *
        (addOn?.extraBed?.numberSelect || 0)
    );
  }, 0);

  // Room capacity
  const totalRoomCapacity = selectedRoom.reduce(
    (acc: number, room: Room) => acc + room.guests * (room.numberSelect || 1),
    0
  );
  const totalGuestCapacity = totalGuest.adult + totalGuest.child;

  // --- Handlers ---
  const handleIncrease = (id: string, name: string) => {
    const newSelectedRooms = selectedRoom.map((room: Room) =>
      room.id === id ? { ...room, numberSelect: room.numberSelect! + 1 } : room
    );
    dispatch(setSelectedRoom(newSelectedRooms));
    notification.success({
      message: "Room increase",
      description: `You have increase the room '${name}' to ${newSelectedRooms.find((room: Room) => room.id === id)?.numberSelect}`,
      duration: 3,
      placement: "topRight",
    });
  };

  const handleDecrease = (id: string, name: string) => {
    let newSelectedRooms;
    const currentRoom = selectedRoom.find((room: Room) => room.id === id);
    if (currentRoom && currentRoom.numberSelect > 1) {
      newSelectedRooms = selectedRoom.map((room: Room) =>
        room.id === id
          ? { ...room, numberSelect: room.numberSelect! - 1 }
          : room
      );
    } else {
      newSelectedRooms = selectedRoom.filter((room: Room) => room.id !== id);
    }
    dispatch(setSelectedRoom(newSelectedRooms));
    if (newSelectedRooms.length > 0) {
      notification.success({
        message: "Room decrease",
        description: `You have decrease the room '${name}' to ${newSelectedRooms.find((room: Room) => room.id === id)?.numberSelect}`,
        duration: 3,
        placement: "topRight",
      });
    } else {
      notification.success({
        message: "Room decrease",
        description: `You have remove the room '${name}'`,
        duration: 3,
        placement: "topRight",
      });
    }
  };

  const handleBookNow = () => {
    if (selectedRoom.length === 0) {
      notification.warning({
        message: "Please select a room! Click here to select room",
        placement: "topRight",
        onClick: () => {
          dispatch(setStatePage(PageState.SELECT_ROOM));
          const element = document.getElementById("select-room");
          if (element) element.scrollIntoView({ behavior: "smooth" });
        },
      });
      return;
    }
    if (totalGuestCapacity > totalRoomCapacity) {
      notification.warning({
        message: "Guest Capacity Exceeded",
        description: `The total number of guests (${totalGuestCapacity}) exceeds the room capacity (${totalRoomCapacity}). Please select additional rooms or reduce number of guests.`,
        duration: 5,
        placement: "topRight",
      });
      return;
    }
    if (isHotel) {
      navigate(`/checkout/hotel/${id}`, {
        state: { selectedRoom, addOn, hotelData, totalPrice, totalGuest },
      });
    } else {
      navigate(`/checkout/tour/${id}`, {
        state: { tourDetail, total, totalGuest },
      });
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full bg-[#F4F4F4] backdrop-blur-md ">
        <div className="flex flex-col gap-4 py-7 px-7">
          {/* Price & duration */}
          <div className="flex items-center gap-2 ">
            <p className="text-gray-600 text-sm"> from </p>
            <span className="font-medium text-gray-600 text-xl mb-1">
              ${isHotel ? minPrice : tourDetail?.price}.00
            </span>
          </div>
          <div className="border-b border-gray-400"></div>
          {!isHotel && (
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
          {/* Dropdowns */}
          <div className="flex flex-col ">
            <div className="flex flex-col gap-6 py-5">
              {isHotel ? (
                <CustomDropdown<FormValues>
                  icon={<LuCalendarClock className="text-xl text-[#FF7B42]" />}
                  isSelect={false}
                  isDuration={true}
                  hotelData={hotelData}
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                />
              ) : (
                <CustomDropdown<FormValues>
                  icon={<LuCalendarClock className="text-xl text-[#FF7B42]" />}
                  isSelect={false}
                  isDuration={true}
                  tourDetail={tourDetail}
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                />
              )}
              <CustomDropdown<FormValues>
                isOpen={isOpenTotalGuest}
                totalGuest={totalGuest}
                isTotalGuest={true}
                onToggle={() => setIsOpenTotalGuest(!isOpenTotalGuest)}
                placeholder="Number of guests"
                icon={<FiUsers className="text-xl text-[#FF7B42]" />}
                isSelect={true}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                setValue={setValue}
              />
              {/* Room selection */}
              {isHotel &&
                selectedRoom &&
                selectedRoom.length > 0 &&
                checkRoom &&
                selectedRoom.map((item: Room) => (
                  <div className="grid grid-cols-5 " key={item.id}>
                    <span className="col-span-2 font-medium text-lg text-[#2A2A2A]">
                      {item.name}
                    </span>
                    <div className="col-span-2 flex items-center justify-center">
                      <ButtonCountRoom
                        dataRoom={item}
                        onIncrease={() => handleIncrease(item.id, item.name)}
                        onDecrease={() => handleDecrease(item.id, item.name)}
                      />
                    </div>
                    <span className="col-span-1 text-end font-medium text-xl text-[#04316A]">
                      ${item.price}
                    </span>
                  </div>
                ))}
              <div className="border-b border-gray-400 "></div>
              {isHotel &&
                selectedRoom &&
                selectedRoom.length > 0 &&
                checkRoom && (
                  <>
                    <AddOnSection data={hotelData} />
                    <div className="border-b border-gray-400"></div>
                  </>
                )}
            </div>
            {errors.adult && (
              <p className="text-red-500 text-sm">
                Please enter the number of guests
              </p>
            )}
            {/* Total price & book button */}
            <div className="flex items-center justify-between my-3 gap-2 mb-10">
              <p className="text-gray-600 text-xl font-medium">Total: </p>
              {isHotel ? (
                <p className="font-bold text-xl ">${totalPrice || minPrice}</p>
              ) : (
                <p className="font-bold text-xl ">
                  ${total || tourDetail?.price}
                </p>
              )}
            </div>
            <button
              onClick={handleSubmit(handleBookNow)}
              className="bg-[#FF7B42] font-medium text-white py-5 hover:bg-orange-600 transition-colors rounded-md">
              Book now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
