import { HotelFormData } from "@/types/hotel";
import { SelectRoomCard } from "./SelectRoomCard";

export const SelectRoom: React.FC<{ data: HotelFormData }> = ({ data }) => {
  return (
    <div id="select-room" className="flex flex-col gap-6 my-6">
      {data.rooms.map((room) => (
        <SelectRoomCard key={room.id} data={room} />
      ))}
    </div>
  );
};
