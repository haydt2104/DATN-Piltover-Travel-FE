import { Status } from './status.model';
import { Tour } from './tour.model';

export interface TourDate {
  id: number;
  initiateDate: Date;
  tour: Tour;
  status: Status;
}
