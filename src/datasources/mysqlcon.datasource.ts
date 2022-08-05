import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mysqlcon',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'arduino2.0pk18',
  database: 'co_db'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MysqlconDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mysqlcon';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mysqlcon', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
