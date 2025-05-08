import { Room } from "@/types/hotel";

export const ButtonCountRoom: React.FC<{
  dataRoom?: Room;
  dataAddOn?: {
    numberSelect: number;
  };
  onIncrease: () => void;
  onDecrease: () => void;
  isAddOn?: boolean;
}> = ({ dataRoom, dataAddOn, onIncrease, onDecrease, isAddOn }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-[#E4E4E4] rounded-full size-6 flex items-center justify-center">
        <button onClick={onDecrease}>
          <p className="text-4xl mb-2 font-thin">-</p>
        </button>
      </div>
      {isAddOn ? (
        <span className="text-lg font-medium text-[#4F4F4F]">
          {dataAddOn?.numberSelect}
        </span>
      ) : (
        <span className="text-lg font-medium text-[#4F4F4F]">
          {dataRoom?.numberSelect}
        </span>
      )}
      <div className="bg-[#E4E4E4] rounded-full size-6 flex items-center justify-center">
        <button onClick={onIncrease}>
          <p className="text-2xl mb-1 font-normal">+</p>
        </button>
      </div>
    </div>
  );
};
