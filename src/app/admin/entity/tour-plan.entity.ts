import { Status } from "./status.entity";
import { Tour } from "./tour.entity";
import { Transportation } from "./transportation.entity";

export interface TourPlan {
  id: number;
  startName: string;
  startAddress: string;
  startTime: Date;
  transport: Transportation;
  status: Status;
  tour: Tour;
}
