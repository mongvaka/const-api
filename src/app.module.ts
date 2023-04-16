import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { DeliverysModule } from './deliverys/deliverys.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { DeliveryFeeModule } from './delivery-fee/delivery-fee.module';
import { ShopInfoModule } from './shop-info/shop-info.module';
import { GeneralSettingModule } from './general-setting/general-setting.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ChatGateway } from './chat.gateway';
import { EspModule } from './iot/esp.module';

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
          logging: true,
        };
      },
    }),
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    DeliverysModule,
    PaymentMethodsModule,
    DeliveryFeeModule,
    ShopInfoModule,
    GeneralSettingModule,
    NotificationsModule,
    UsersModule ,
    EspModule
  ],
  controllers: [AppController],
  providers: [AppService
    ,
    // ChatGateway
  ],
})
export class AppModule {}
