import { Account } from "./account.model";
import { Price } from "./price.model";
import { Transportation } from "./transportation.model";

export interface Tour {
  id: number;
  name: string;
  description: string;
  image: string;
  destinationAddress: string;
  availableSpaces: number;
  createTime: Date;
  active: boolean;
  transport:Transportation
}
