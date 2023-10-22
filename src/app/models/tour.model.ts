import { Price } from './price.model';
import { Status } from './status.model';
import { Transportation } from './transportation.model';

export interface Tour {
  id: number;
  name: string;
  description: string;
  image: string;
  destinationAddress: string;
  availableSpaces: number;
  createTime: Date;
  active: boolean;
  price: Price
  transport:Transportation
}
