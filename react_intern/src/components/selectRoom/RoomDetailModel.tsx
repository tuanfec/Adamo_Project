import { FaCheck, FaUserFriends } from "react-icons/fa";
import { BiShapeSquare } from "react-icons/bi";
import { ImageDetail } from "../tourDetail/ImageDetail";
import { Room } from "@/types/hotel";
import { FaBed } from "react-icons/fa";
export const RoomDetailModel: React.FC<{
  data: Room;
  selectedRoom: (room: Room) => void;
  handleCancel: () => void;
  isSelected: boolean;
}> = ({ data, selectedRoom, handleCancel, isSelected }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-5">
      <div className="w-full md:h-1/2 lg:w-1/2">
        <div className="flex flex-col gap-2 mb-4">
          <p className="text-2xl font-bold">{data.name}</p>
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              {data.discount && (
                <span className="text-md text-[#5E6D77] mt-1 font-normal line-through">
                  ${data.price - (data.price * data.discount) / 100}
                </span>
              )}
              <p className="text-[#5E6D77] text-sm">
                <span className="text-xl text-[#EE1D00] font-bold">
                  ${data.price}
                </span>
                / night
              </p>
            </div>
            {isSelected ? (
              <button
                className="bg-white text-[#FF7B42] font-medium px-4 py-2 border border-[#FF7B42] rounded-md cursor-pointer"
                onClick={() => {
                  selectedRoom(data);
                  handleCancel();
                }}>
                Selected
              </button>
            ) : (
              <button
                className="bg-[#FF7B42] text-white font-medium px-4 py-2 rounded-md hover:bg-[#FF7B42]/80 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  selectedRoom(data);
                  handleCancel();
                }}>
                Select Room
              </button>
            )}
          </div>
        </div>
        <ImageDetail isRoom={true} roomData={data} />
      </div>
      <div className="w-full  lg:w-1/2 lg:mx-10 lg:my-10">
        <div className="flex justify-between mt-2 w-full">
          <div className="flex items-center gap-2">
            <FaUserFriends className="text-[#4F4F4F] text-xl" />
            <span className="text-[#0069E4] text-md font-medium">
              {data.guests} Guest
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaBed className="text-[#4F4F4F] text-xl" />
            <span className="text-[#0069E4] text-md font-medium">
              {data.bed}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BiShapeSquare className="text-[#4F4F4F] text-xl" />
            <span className="text-[#0069E4] text-md font-medium">
              {data.area} m2
            </span>
          </div>
        </div>
        <div className="border-b border-gray-400 my-3"></div>
        <div className="flex flex-col gap-2">
          <p className="text-[#1E1E1ECC]">{data.description}</p>
        </div>
        <div className="border-b border-gray-400 my-3"></div>

        <div className="flex flex-col gap-2">
          <p className="text-[#000000] font-medium text-md">Room Facilities:</p>
          <div className="grid grid-cols-2 gap-2">
            {data.amenities.map((item) => (
              <div className="flex items-center gap-2">
                <FaCheck className="text-[#28B554]" />
                <p className="text-[#1E1E1ECC]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
