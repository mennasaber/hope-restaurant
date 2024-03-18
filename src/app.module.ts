import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/hope-restaurant'),
    StaffModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
