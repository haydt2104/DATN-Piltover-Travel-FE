export interface Discount {
  id: number;
  name: string;
  percentage: number;
  amount: number;
  code: string;
  isDelete: boolean;
  min: number;
  max: number;
}
