import { Price } from './price.model';

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
