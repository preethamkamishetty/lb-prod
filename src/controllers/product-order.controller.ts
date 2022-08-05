import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Product,
  Order,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductOrderController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Product has many Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.productRepository.order(id).find(filter);
  }

  @post('/products/{id}/orders', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Product.prototype.product_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInProduct',
            exclude: ['order_id'],
            optional: ['product_id']
          }),
        },
      },
    }) order: Omit<Order, 'order_id'>,
  ): Promise<Order> {
    return this.productRepository.order(id).create(order);
  }

  @patch('/products/{id}/orders', {
    responses: {
      '200': {
        description: 'Product.Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Partial<Order>,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.productRepository.order(id).patch(order, where);
  }

  @del('/products/{id}/orders', {
    responses: {
      '200': {
        description: 'Product.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.productRepository.order(id).delete(where);
  }
}
