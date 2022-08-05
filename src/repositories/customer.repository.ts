import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlconDataSource} from '../datasources';
import {Customer, CustomerRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.customer_id,
  CustomerRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Customer.prototype.customer_id>;

  constructor(
    @inject('datasources.mysqlcon') dataSource: MysqlconDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Customer, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
