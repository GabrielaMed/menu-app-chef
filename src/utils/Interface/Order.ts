import { OrderStatus } from '../Enum/OrderStatus';
import { IOrderProduct } from './OrderProduct';

export interface IOrder {
  id: string;
  statusOrder: OrderStatus;
  Order_products: IOrderProduct[];
  dateTimeOrder: string;
  tableNumber: number;
  total: number;
  orderNumber: number;
}
