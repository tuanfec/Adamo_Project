import instance from "@/services/axios";

export const getAttractiveTours = async (tourType: string) => {
  const response = await instance.get(
    `http://localhost:3000/tours?tourType=${tourType}`
  );
  return response.data;
};

export const getAllTours = async () => {
  const response = await instance.get("http://localhost:3000/tours");
  console.log("response", response.data);
  return response.data;
};

export const getTourDetail = async (id: string, tourType: string) => {
  const response = await instance.get(
    `http://localhost:3000/tours/${id}?tourType=${tourType}`
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

export const changeSaveTours = async (id: string, isSave: boolean) => {
  await instance.patch(`http://localhost:3000/tours/${id}`, {
    isSave,
  });
};

export const changeSaveHotel = async (id: string, isSave: boolean) => {
  await instance.patch(`http://localhost:3000/hotels/${id}`, {
    isSave,
  });
};

export const getAllTourByLocation = async (location: string) => {
  const res = await instance.get(
    `http://localhost:3000/tours?location=${location}`
  );

  return res.data;
};

export const getDestinations = async () => {
  const response = await instance.get(`http://localhost:3000/Destinations`);
  return response.data;
};

export const getVoucher = async () => {
  const response = await instance.get(`http://localhost:3000/voucher`);
  return response.data;
};

export const postBooking = async (data: any) => {
  await instance.post(`http://localhost:3000/booking`, data);
};

export const reduceVoucher = async (remaining: any, id: string) => {
  try {
    await instance.patch(`http://localhost:3000/voucher/${id}`, {
      remaining,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBookHistory = async () => {
  const response = await instance.get(`http://localhost:3000/booking`);
  return response.data;
};

export const getBookHistoryDetail = async (userId: string) => {
  const response = await instance.get(
    `http://localhost:3000/booking?userId=${userId}`
  );
  return response.data;
};
