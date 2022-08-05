import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlconDataSource} from '../datasources';
import {Order, Product, ProductRelations} from '../models';
import {OrderRepository} from './order.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.product_id,
  ProductRelations
> {

  public readonly order: HasManyRepositoryFactory<Order, typeof Product.prototype.product_id>;

  constructor(
    @inject('datasources.mysqlcon') dataSource: MysqlconDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Product, dataSource);
    this.order = this.createHasManyRepositoryFactoryFor('order', orderRepositoryGetter,);
    this.registerInclusionResolver('order', this.order.inclusionResolver);
  }


}
