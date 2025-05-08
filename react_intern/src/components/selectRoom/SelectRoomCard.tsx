import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { BiShapeSquare } from "react-icons/bi";
import { Room } from "@/types/hotel";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoom } from "@/app/slide/hotelDataSlide";
import { FaCheck } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { RoomDetailModel } from "./RoomDetailModel";
import { Modal } from "antd";
import { useNotification } from "@components/notifiction/NotificationProvider";
export const SelectRoomCard: React.FC<{ data: Room }> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const notification = useNotification();
  const selectedRooms = useSelector(
    (state: any) => state.hotelDataSlide.selectedRoom
  );
  const handleSelectRoom = () => {
    // Kiểm tra đã có phòng này chưa
    const existRoom = selectedRooms.find((room: Room) => room.id === data.id);
    let newSelectedRooms;
    if (existRoom) {
      // Nếu đã có, tăng numberSelect
      newSelectedRooms = selectedRooms.map((room: Room) =>
        room.id === data.id
          ? { ...room, numberSelect: room.numberSelect! + 1 }
          : room
      );
    } else {
      // Nếu chưa có, thêm mới
      newSelectedRooms = [...selectedRooms, { ...data, numberSelect: 1 }];
    }
    dispatch(setSelectedRoom(newSelectedRooms));
    notification.success({
      message: "Room selected",
      description: `You have selected the room ${data.name}`,
      duration: 3,
      placement: "topRight",
    });
  };
  const handleUnSelectedRoom = () => {
    const existRoom = selectedRooms.find((room: Room) => room.id === data.id);
    let newSelectedRooms;
    if (existRoom && existRoom.numberSelect > 1) {
      // Giảm numberSelect
      newSelectedRooms = selectedRooms.map((room: Room) =>
        room.id === data.id
          ? { ...room, numberSelect: room.numberSelect! - 1 }
          : room
      );
    } else {
      // Xóa khỏi mảng
      newSelectedRooms = selectedRooms.filter(
        (room: Room) => room.id !== data.id
      );
    }
    dispatch(setSelectedRoom(newSelectedRooms));
    notification.success({
      message: "Room unselected",
      description: `You have unselected the room ${data.name}`,
      duration: 3,
      placement: "topRight",
    });
  };
  const currentRoom = selectedRooms?.find((room: Room) => room.id === data.id);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const existRoom: boolean = selectedRooms.find(
    (room: Room) => room.id === data.id
  )
    ? true
    : false;
  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden w-full max-w-3xl hover:scale-105 transition-all duration-300">
      <Modal
        width={1000}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}>
        <RoomDetailModel
          data={data}
          selectedRoom={handleSelectRoom}
          handleCancel={handleCancel}
          isSelected={existRoom}
        />
      </Modal>
      {/* Image section */}
      <div className="md:w-1/3 relative lg:max-w-[170px] lg:max-h-[170px] bg-gray-200 flex items-center justify-center">
        {/* Placeholder for image */}
        <div
          onClick={showModal}
          className="absolute top-2 left-2 size-7 bg-[#00000099] rounded-full flex items-center justify-center cursor-pointer">
          <FiImage className="text-white hover:text-[#FF7B42] transition-all duration-300" />
        </div>
        <img
          src={data.image[0]}
          alt={data.name}
          className="object-cover lg:aspect-[2/2] aspect-[6/4] md:aspect-[3/2] md:h-full w-full h-1/2"
        />
      </div>

      {/* Content section */}
      <div className="flex-1 py-2 pl-6 pr-10 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#2A2A2A]">{data.name}</h2>
        </div>
        <div className="flex justify-between mt-2 w-[90%]">
          <div className="flex items-center gap-2">
            <FaUserFriends className="text-[#4F4F4F] text-xl" />
            <span className="text-[#4F4F4F] text-md font-medium">
              {data.guests} Guest
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaBed className="text-[#4F4F4F] text-xl" />
            <span className="text-[#4F4F4F] text-md font-medium">
              {data.bed}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BiShapeSquare className="text-[#4F4F4F] text-xl" />
            <span className="text-[#4F4F4F] text-md font-medium">
              {data.area} m2
            </span>
          </div>
        </div>
        <div className="text-[#5E6D77] text-sm font-normal">
          {data.amenities.slice(0, 3).join(" • ")}
          <span className="text-blue-900 font-medium">
            {data.amenities.length > 3 &&
              ` • ${data.amenities.length - 3} more`}
          </span>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex justify-end ">
            {data.quantity > 0 &&
              (!currentRoom || currentRoom.numberSelect === 0) && (
                <button
                  type="button"
                  onClick={handleSelectRoom}
                  className="px-6 py-2 bg-white text-[#FF7B42] font-semibold rounded border border-[#FF7B42] hover:bg-[#FF7B42] hover:text-white transition cursor-pointer">
                  Select Room
                </button>
              )}
            {data.quantity > 0 &&
              currentRoom &&
              currentRoom.numberSelect > 0 && (
                <button
                  type="button"
                  onClick={handleUnSelectedRoom}
                  className="flex items-center gap-2 px-6 py-2 bg-[#FF7B42] text-white font-semibold rounded border border-[#FF7B42] hover:bg-white hover:text-[#FF7B42] transition cursor-pointer">
                  <FaCheck /> Selected ({currentRoom.numberSelect})
                </button>
              )}
            {data.quantity === 0 && (
              <button className="px-6 py-2 bg-[#223143] text-white font-semibold rounded border border-[#223143] cursor-not-allowed">
                Out of room
              </button>
            )}
          </div>
          <div className="flex justify-end items-end gap-1">
            <span className="text-[#EE1D00] text-2xl font-semibold">
              ${data.price}
            </span>
            <span className="text-sm text-[#888888] mb-1">/night</span>
          </div>
        </div>
      </div>
    </div>
  );
};
