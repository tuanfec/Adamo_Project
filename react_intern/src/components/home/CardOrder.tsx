import { useNavigate } from "react-router-dom";

export const CardOrder = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-white items-center w-1/2 h-1/2 justify-center gap-15">
      <div className="lg:text-5xl text-3xl text-[#FF7B42] font-bold">
        Thank You!
      </div>
      <p className="text-lg text-center text-gray-500">
        Your order has been successfully ordered.
        <br /> Order information has been emailed to you. Thank you!
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-[#FF7B42] py-4 px-15 text-white ">
        Back to our home
      </button>
    </div>
  );
};
