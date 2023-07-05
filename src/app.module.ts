import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ChatGateway } from './chat.gateway';
import { EspModule } from './iot/esp.module';
import { SupportModule } from './supports/support.module';
import { AddressModule } from './address/address.module';
import { ProductModule } from './products/product.module';
import { ImageModule } from './images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const baseDir = __dirname;
        const entitiesPath = path.join(baseDir, '**/**.entity{.ts,.js}');
        const migrationPath = path.join(baseDir, '/../db/seed/*.{.ts,.js}');
        return {
          type: 'postgres' as const,
          host: process.env.DB_HOST,
          port: +process.env.POSTGRES_PORT,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: "postgres",
          synchronize: true,
          entities: [entitiesPath],
          migrations: [migrationPath],
          logging: false,
        };
      },
    }),
    UsersModule ,
    EspModule,
    SupportModule,
    AddressModule,
    ProductModule,
    AddressModule,
    ImageModule
  ],
  controllers: [AppController],
  providers: [AppService
    ,
    // ChatGateway
  ],
})
export class AppModule {}
