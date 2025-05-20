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

export const getPolicy = async () => {
  const response = await instance.get("http://localhost:3000/policy");
  return response.data;
};

export const getComment = async (id: string) => {
  const response = await instance.get(
    `http://localhost:3000/comments?keyId=${id}`
  );
  return response.data;
};

export const postComment = async (data: any) => {
  await instance.post(`http://localhost:3000/comments`, data);
};

export const changeSaveTourAttractive = async (id: string, isSave: boolean) => {
  await instance.patch(`http://localhost:3000/attractiveTours/${id}`, {
    isSave,
  });
};

export const changeSaveTourTraditional = async (
  id: string,
  isSave: boolean
) => {
  await instance.patch(`http://localhost:3000/traditionalCultureTours/${id}`, {
    isSave,
  });
};

export const changeSaveHotel = async (id: string, isSave: boolean) => {
  await instance.patch(`http://localhost:3000/hotels/${id}`, {
    isSave,
  });
};
