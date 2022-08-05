import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Order} from '../models';
import {OrderRepository} from '../repositories';

export class OrderController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @post('/orders')
  @response(200, {
    description: 'Order model instance',
    content: {'application/json': {schema: getModelSchemaRef(Order)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrder',
            exclude: ['order_id'],
          }),
        },
      },
    })
    order: Omit<Order, 'order_id'>,
  ): Promise<Order> {
    const sql = `SELECT price FROM co_db.product WHERE product_id="${order.product_id}"`;
    let price = await this.orderRepository.execute(sql)
    const result: any = Object.values(JSON.parse(JSON.stringify(price)));

    console.log(result[0].price)

    order.Amount = order.quantity * Number(result[0].price)




    return this.orderRepository.create(order);
  }

  @get('/orders/count')
  @response(200, {
    description: 'Order model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Order) where?: Where<Order>,
  ): Promise<Count> {
    return this.orderRepository.count(where);
  }

  @get('/orders')
  @response(200, {
    description: 'Array of Order model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Order, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Order) filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.orderRepository.find(filter);
  }

  @patch('/orders')
  @response(200, {
    description: 'Order PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Order,
    @param.where(Order) where?: Where<Order>,
  ): Promise<Count> {

    const sql = `SELECT price FROM co_db.product WHERE product_id="${order.product_id}"`;
    let price = await this.orderRepository.execute(sql)
    const result: any = Object.values(JSON.parse(JSON.stringify(price)));

    console.log(result[0].price)

    order.Amount = order.quantity * Number(result[0].price)
    return this.orderRepository.updateAll(order, where);
  }

  @get('/orders/{id}')
  @response(200, {
    description: 'Order model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Order, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Order, {exclude: 'where'}) filter?: FilterExcludingWhere<Order>
  ): Promise<Order> {
    return this.orderRepository.findById(id, filter);
  }

  @patch('/orders/{id}')
  @response(204, {
    description: 'Order PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Order,
  ): Promise<void> {
    const sql = `SELECT price FROM co_db.product WHERE product_id="${order.product_id}"`;
    let price = await this.orderRepository.execute(sql)
    const result: any = Object.values(JSON.parse(JSON.stringify(price)));

    console.log(result[0].price)

    order.Amount = order.quantity * Number(result[0].price)
    await this.orderRepository.updateById(id, order);
  }

  @put('/orders/{id}')
  @response(204, {
    description: 'Order PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() order: Order,
  ): Promise<void> {
    const sql = `SELECT price FROM co_db.product WHERE product_id="${order.product_id}"`;
    let price = await this.orderRepository.execute(sql)
    const result: any = Object.values(JSON.parse(JSON.stringify(price)));

    console.log(result[0].price)

    order.Amount = order.quantity * Number(result[0].price)
    await this.orderRepository.replaceById(id, order);
  }

  @del('/orders/{id}')
  @response(204, {
    description: 'Order DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.orderRepository.deleteById(id);
  }
}
