export interface HomeTour {
  tourID: number;
  name_Tour: string;
  image: string;
  adult_price: number;
  children_price: number;
  start_address: string;
  start_time: string;
  transport_Name: string;
  hotel_Name: string;
  hotel_Star: string;
}

export interface SearchTour {
  startDate: String;
  tourName: String;
  startAddress: String;
  minPrice: number;
  maxPrice: number;
  priceRange: string;
}

