import { IAdditional } from './Additional';
import { IProduct } from './Product';

export interface IOrderProduct {
  id: string;
  observation: string;
  additionals?: IAdditional[];
  product: IProduct;
  quantity: number;
}
