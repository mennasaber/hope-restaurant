import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    StaffModule,
    AuthModule,
    CategoryModule,
    ItemModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
