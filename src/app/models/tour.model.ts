import { Hotel } from './hotel.model';
import { Price } from './price.model';
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
  price: Price;
  transport: Transportation;
  hotel: Hotel;
}
