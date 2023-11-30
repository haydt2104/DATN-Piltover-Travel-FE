export interface Revenue {
  total_revenue: number;
  total_tour_revenue: number;
  total_hotel_revenue: number;
  total_transport_revenue: number;
}
export interface MonthRevenue {
  month: string;
  total_tour_revenue: number;
  total_hotel_revenue: number;
  total_transport_revenue: number;
}

export interface TourRevenue {
  total_name: string;
  adult_price: number;
  children_price: number;
  adult_bookings: number;
  children_bookings: number;
  total_revenue: number;
}

export interface HotelRevenue {
  hotel_name: string;
  hotel_price: number;
  total_hotel_revenue: number;
  total_hotel_booking: number;
}

export interface TransportRevenue {
  transport_name: string;
  transport_price: number;
  total_transport_revenue: number;
  total_transport_booking: number;
}

export interface DateRevenue {
  startDate: String;
  endDate: String;
}
