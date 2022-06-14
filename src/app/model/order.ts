import {Customer} from "./customer";
import {CartItem} from "./cartItem";
import {OrderStatus} from "../enums/orderStatus";

export class Order{
  customer: Customer;
  products: CartItem[];
  ship: number;
  status: OrderStatus;
  notice: string;
  constructor(customer: Customer, products: CartItem[], ship: number, status: OrderStatus) {
    this.customer = customer;
    this.products = products;
    this.ship = ship;
    this.status = status;
  }
}
