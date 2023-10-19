import { TourDate } from "./tour-date.model";
import { Transportation } from "./transportation.model";

export interface TourPlan {
  id: number;
  startName: string;
  startAddress: string;
  startTime: Date;
  transport: Transportation;
  tourDate: TourDate;
}
