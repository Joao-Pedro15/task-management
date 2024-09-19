import { ConfigService } from "@nestjs/config";
import { config } from "dotenv"; 
import { DataSource, DataSourceOptions } from "typeorm";

config()

const configService = new ConfigService()

const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>("DB_HOST"),
  port: +configService.get<number>("DB_PORT"),
  username: configService.get<string>("DB_USERNAME"),
  password: configService.get<string>("DB_PASSWORD"),
  database: configService.get<string>("DB_NAME"),
  entities: [],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false // habilita o true somente em producao
}

export default new DataSource(datasourceOptions)