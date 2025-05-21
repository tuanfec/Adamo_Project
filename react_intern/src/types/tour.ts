export interface Coordinates {
  lat?: number;
  lng?: number;
  address?: string;
}

export interface Duration {
  durationTime?: string;
  durationDescription?: string;
}

export interface Location {
  locationName?: string;
  content?: string;
  duration?: Duration[];
  coordinates?: Coordinates;
}

export interface TourDay {
  content?: string;
  location?: Location[];
}

export interface Overview {
  content: string;
}

export interface ListOverview {
  content: string;
}

export interface OverviewSection {
  content: string;
  listOverview: ListOverview[];
}

export interface Include {
  content: string;
}

export interface DeparturePoint {
  address: string;
}

export interface Departure {
  departurePont: DeparturePoint[];
  departureTime: string;
}

export interface TourItinerary {
  tourDay: TourDay;
}

export interface TourData {
  id: string;
  title: string;
  image: string[];
  price: number;
  description?: string;
  experiences?: number;
  location?: string;
  duration?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  isSave?: boolean;
  tourType?: string;
  overview: [Overview, { listOverview: ListOverview[] }];
  include: Include[][];
  departure: Departure[];
  tourItinerary: TourItinerary[];
  media: {
    mapVideoLink: string;
    map360ImageLink: string;
  };
  reviews: {
    rating: number;
    totalReviews: number;
    ratingBreakdown: {
      [key: number]: number;
    };
  };
  source?: string;
}

export interface ImageAndVideo {
  mapVideoLink: string;
  map360ImageLink: string;
}

export interface AdditionalInfo {
  listContent: string[];
  faq: FAQ[];
}

export interface AdditionalInfoList {
  content: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface TourItineraryCardProps {
  tourDay: {
    content?: string;
    location?: Array<{
      locationName?: string;
      content?: string;
      duration?: Array<{
        durationTime?: string;
        durationDescription?: string;
      }>;
      coordinates?: {
        lat?: number;
        lng?: number;
        address?: string;
      };
    }>;
  };
  dayNumber: number;
}

export interface ReviewStats {
  rating: number;
  totalReviews: number;
  ratingBreakdown: {
    [key: number]: number;
  };
}

export interface Comment {
  id: string;
  title: string;
  content: string;
  rating: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}
export type PostComment = {
  postData: {
    title: string;
    content: string;
    keyId: string;
    user: User | null;
  };
  id: string;
};
export type ChangeSave = {
  isSave: boolean;
  id: string;
  isAttractive?: boolean;
};
