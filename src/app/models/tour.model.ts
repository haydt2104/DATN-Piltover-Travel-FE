import { Price } from './price.model';
import { Status } from './status.model';

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
}
