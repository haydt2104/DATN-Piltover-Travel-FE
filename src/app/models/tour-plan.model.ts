import { Status } from "./status.model";
import { TourDate } from "./tour-date.model";
import { Tour } from "./tour.model";
import { Transportation } from "./transportation.model";

export interface TourPlan {//Add
  id: number;
  startName: string;
  startAddress: string;
  startTime: Date;
  transport: Transportation;
  status: Status;
  tourDate: TourDate;
}
