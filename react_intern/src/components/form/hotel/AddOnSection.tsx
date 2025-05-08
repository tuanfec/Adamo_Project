import { HotelFormData } from "@/types/hotel";
import { ButtonCountRoom } from "./ButtonCountRoom";
import { setAddOn } from "@/app/slide/hotelDataSlide";
import { useDispatch, useSelector } from "react-redux";
import { useNotification } from "@components/notifiction/NotificationProvider";
function AddOnSection({ data }: { data?: HotelFormData }) {
  const dispatch = useDispatch();
  const addOn = useSelector((state: any) => state.hotelDataSlide.addOn);
  const notification = useNotification();
  const handleIncrease = (isBreakfast: boolean) => {
    if (isBreakfast) {
      dispatch(
        setAddOn({
          ...addOn,
          breakfast: {
            numberSelect: (addOn?.breakfast?.numberSelect || 0) + 1,
            price: data?.addOn?.breakfast?.price,
          },
        })
      );
    } else {
      dispatch(
        setAddOn({
          ...addOn,
          extraBed: {
            numberSelect: (addOn?.extraBed?.numberSelect || 0) + 1,
            price: data?.addOn?.extraBed?.price,
          },
        })
      );
    }
    notification.success({
      message: "Add-on increase",
      description: `You have increase the add-on ${isBreakfast ? "Breakfast" : "Extra Bed"}`,
      duration: 3,
      placement: "topRight",
    });
  };
  const handleDecrease = (isBreakfast: boolean) => {
    if (isBreakfast) {
      dispatch(
        setAddOn({
          ...addOn,
          breakfast: {
            numberSelect: Math.max(
              (addOn?.breakfast?.numberSelect || 0) - 1,
              0
            ),
            price: data?.addOn?.breakfast?.price,
          },
        })
      );
    } else {
      dispatch(
        setAddOn({
          ...addOn,
          extraBed: {
            numberSelect: Math.max((addOn?.extraBed?.numberSelect || 0) - 1, 0),
            price: data?.addOn?.extraBed?.price,
          },
        })
      );
    }
    if (
      addOn?.breakfast?.numberSelect !== 0 ||
      addOn?.extraBed?.numberSelect !== 0
    ) {
      notification.success({
        message: "Add-on decrease",
        description: `You have decrease the add-on ${isBreakfast ? "Breakfast" : "Extra Bed"}`,
        duration: 3,
        placement: "topRight",
      });
    }
  };

  const handleCheckboxChange = (isBreakfast: boolean, checked: boolean) => {
    if (!checked) {
      if (isBreakfast) {
        dispatch(
          setAddOn({
            ...addOn,
            breakfast: {
              numberSelect: 0,
              price: data?.addOn?.breakfast?.price,
            },
          })
        );
      } else {
        dispatch(
          setAddOn({
            ...addOn,
            extraBed: {
              numberSelect: 0,
              price: data?.addOn?.extraBed?.price,
            },
          })
        );
      }
      notification.success({
        message: "Add-on remove",
        description: `You have remove the add-on ${isBreakfast ? "Breakfast" : "Extra Bed"}`,
        duration: 3,
        placement: "topRight",
      });
    } else {
      if (isBreakfast && (addOn?.breakfast?.numberSelect || 0) === 0) {
        dispatch(
          setAddOn({
            ...addOn,
            breakfast: {
              numberSelect: 1,
              price: data?.addOn?.breakfast?.price,
            },
          })
        );
      } else if (!isBreakfast && (addOn?.extraBed?.numberSelect || 0) === 0) {
        dispatch(
          setAddOn({
            ...addOn,
            extraBed: {
              numberSelect: 1,
              price: data?.addOn?.extraBed?.price,
            },
          })
        );
      }
      notification.success({
        message: "Add-on add",
        description: `You have add the add-on ${isBreakfast ? "Breakfast" : "Extra Bed"}`,
        duration: 3,
        placement: "topRight",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-medium text-[#2A2A2A]">Add-ons:</h3>
      <div className="grid grid-cols-5">
        <div className="col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            className="col-span-2"
            checked={!!(addOn?.breakfast?.numberSelect > 0)}
            onChange={(e) => handleCheckboxChange(true, e.target.checked)}
          />
          <p className=" font-medium text-lg text-[#4F4F4F]">Breakfast</p>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <ButtonCountRoom
            dataAddOn={addOn?.breakfast}
            onIncrease={() => handleIncrease(true)}
            onDecrease={() => handleDecrease(true)}
            isAddOn={true}
          />
        </div>
        <p className="text-end font-medium text-xl text-[#04316A] col-span-1">
          ${data?.addOn?.breakfast?.price}
        </p>
      </div>

      <div className="grid grid-cols-5">
        <div className="col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            className="col-span-2"
            checked={!!(addOn?.extraBed?.numberSelect > 0)}
            onChange={(e) => handleCheckboxChange(false, e.target.checked)}
          />
          <p className=" font-medium text-lg text-[#4F4F4F]">Extra Bed</p>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <ButtonCountRoom
            dataAddOn={addOn?.extraBed}
            onIncrease={() => handleIncrease(false)}
            onDecrease={() => handleDecrease(false)}
            isAddOn={true}
          />
        </div>
        <p className="text-end font-medium text-xl text-[#04316A] col-span-1">
          ${data?.addOn?.extraBed?.price}
        </p>
      </div>
    </div>
  );
}

export default AddOnSection;
