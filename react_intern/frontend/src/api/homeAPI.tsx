import instance from "@/services/axios";
const API = import.meta.env.VITE_API_URL;

export const getAttractiveTours = async (tourType: string) => {
  const response = await instance.get(`${API}/tours?tourType=${tourType}`);
  return response.data;
};

export const getAllTours = async () => {
  const response = await instance.get(`${API}/tours`);
  return response.data;
};

export const getTourDetail = async (id: string, tourType: string) => {
  const response = await instance.get(
    `${API}/tours/${id}?tourType=${tourType}`
  );
  return response.data;
};

export const getHotels = async () => {
  const response = await instance.get(`${API}/hotels`);
  return response.data;
};

export const getHotelDetail = async (id: string) => {
  const response = await instance.get(`${API}/hotels/${id}`);
  return response.data;
};

export const getPolicy = async () => {
  const response = await instance.get(`${API}/policy`);
  return response.data;
};

export const getComment = async (id: string) => {
  const response = await instance.get(`${API}/comments?keyId=${id}`);
  return response.data;
};

export const postComment = async (data: any) => {
  await instance.post(`${API}/comments`, data);
};

export const changeSaveTours = async (id: string, isSave: boolean) => {
  await instance.patch(`${API}/tours/${id}`, {
    isSave,
  });
};

export const changeSaveHotel = async (id: string, isSave: boolean) => {
  await instance.patch(`${API}/hotels/${id}`, {
    isSave,
  });
};

export const getAllTourByLocation = async (location: string) => {
  const res = await instance.get(`${API}/tours?location=${location}`);

  return res.data;
};

export const getDestinations = async () => {
  const response = await instance.get(`${API}/Destinations`);
  return response.data;
};

export const getVoucher = async () => {
  const response = await instance.get(`${API}/voucher`);
  return response.data;
};

export const postBooking = async (data: any) => {
  await instance.post(`${API}/booking`, data);
};

export const reduceVoucher = async (remaining: any, id: string) => {
  try {
    await instance.patch(`${API}/voucher/${id}`, {
      remaining,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBookHistoryDetail = async (id: string | undefined) => {
  const response = await instance.get(`${API}/booking/${id}`);
  return response.data;
};

export const getBookHistoryByUser = async (userId: string) => {
  const response = await instance.get(`${API}/booking?userId=${userId}`);
  return response.data;
};

export const getSaveTour = async () => {
  const response = await instance.get(`${API}/tours?isSave=true`);
  return response.data;
};

export const getSaveHotel = async () => {
  const response = await instance.get(`${API}/hotels?isSave=true`);
  return response.data;
};
