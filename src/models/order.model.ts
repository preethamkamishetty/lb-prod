import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Customer} from './customer.model';
import {Product} from './product.model';

@model()
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  order_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
  })
  Amount?: number;

  @belongsTo(() => Customer, {name: 'customers'})
  customer_id: number;

  @belongsTo(() => Product, {name: 'products'})
  product_id: number;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
