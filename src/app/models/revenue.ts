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
