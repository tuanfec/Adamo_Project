import { useQuery } from "@tanstack/react-query";
import { getPolicy } from "@/api/homeAPI";

export const usePolicy = () => {
  return useQuery({ queryKey: ["policy"], queryFn: getPolicy });
};

export const lineSeparation = (text: string) => {
  return text.split("@");
};
