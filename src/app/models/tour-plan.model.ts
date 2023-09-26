import { Status } from "./status.model";
import { Tour } from "./tour.model";
import { Transportation } from "./transportation.model";

export interface TourPlan {
  id: number;
  startName: string;
  startAddress: string;
  startTime: Date;
  transport: Transportation;
  status: Status;
  tour: Tour;
}
