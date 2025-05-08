import instance from "@/services/axios";

export const getAttractiveTours = async () => {
  const response = await instance.get("http://localhost:3000/attractiveTours");
  return response.data;
};

export const getTraditionalCultureTours = async () => {
  const response = await instance.get(
    "http://localhost:3000/traditionalCultureTours"
  );
  return response.data;
};

export const getTourDetail = async (id: string, isAttractive: boolean) => {
  const response = await instance.get(
    `http://localhost:3000/${isAttractive ? "attractiveTours" : "traditionalCultureTours"}/${id}`
  );
  return response.data;
};

export const getHotels = async () => {
  const response = await instance.get("http://localhost:3000/hotels");
  return response.data;
};

export const getHotelDetail = async (id: string) => {
  const response = await instance.get(`http://localhost:3000/hotels/${id}`);
  return response.data;
};
