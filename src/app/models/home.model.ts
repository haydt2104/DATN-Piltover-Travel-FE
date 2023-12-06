export interface HomeTour {
  tourID: number;
  name_tour: string;
  image: string;
  adult_price: number;
  children_price: number;
  start_address: string;
  start_time: string;
  transport_name: string;
  hotel_name: string;
  hotel_star: string;
}

export interface SearchTour {
  startDate: String;
  tourName: String;
  startAddress: String;
  minPrice: number;
  maxPrice: number;
  priceRange: string;
}

export interface StartAddress {
  start_address: String;
}

