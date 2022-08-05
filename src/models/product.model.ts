import {Entity, model, property, hasMany} from '@loopback/repository';
import {Order} from './order.model';

@model()
export class Product extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  product_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  manufacturer: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @hasMany(() => Order, {keyTo: 'product_id'})
  order: Order[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
