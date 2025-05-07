import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAttractiveTours, getTraditionalCultureTours } from "@/api/homeAPI";

export const useTourList = (header: string | undefined) => {
  const [data, setData] = useState<any[]>([]);
  const reduxData = useSelector((state: any) => state.tourDataSlide.tourData);
  const reduxHeader = useSelector((state: any) => state.tourDataSlide.header);

  // Function to determine which API to call based on header
  const getToursByHeader = async (headerText: string) => {
    switch (headerText) {
      case "Discover fascinating destinations":
      case "Attractive tour and interesting experiences":
        return getAttractiveTours();
      case "Experience the traditional cultural beauties of Vietnam":
        return getTraditionalCultureTours();
      default:
        throw new Error("Invalid tour type");
    }
  };

  // Query for fetching data from API
  const { data: apiData, isLoading } = useQuery({
    queryKey: ["tours", header],
    queryFn: () => (header ? getToursByHeader(header) : null),
    enabled: !!header && (!reduxData || reduxHeader !== header), // Only run if header exists and redux data is not available
  });

  useEffect(() => {
    // If Redux data is available and matches the current header, use it
    if (reduxData && reduxHeader === header) {
      setData(reduxData);
    }
    // If API data is available, use it
    else if (apiData) {
      setData(apiData);
    }
  }, [reduxData, reduxHeader, apiData, header]);

  return {
    data,
    isLoading,
    isFromRedux: reduxData && reduxHeader === header,
  };
};
