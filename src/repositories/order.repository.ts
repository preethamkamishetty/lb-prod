import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqlconDataSource} from '../datasources';
import {Customer, Order, OrderRelations, Product} from '../models';
import {CustomerRepository} from './customer.repository';
import {ProductRepository} from './product.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.order_id,
  OrderRelations
> {

  public readonly customers: BelongsToAccessor<Customer, typeof Order.prototype.order_id>;

  public readonly products: BelongsToAccessor<Product, typeof Order.prototype.order_id>;

  constructor(
    @inject('datasources.mysqlcon') dataSource: MysqlconDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Order, dataSource);
    this.products = this.createBelongsToAccessorFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.customers = this.createBelongsToAccessorFor('customers', customerRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
  }



}
