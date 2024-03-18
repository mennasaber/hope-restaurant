import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type StaffDocument = Staff & Document;
@Schema({ timestamps: true, autoIndex: true })
export class Staff {
  @Prop({ type: String, required: true })
  firstName: string;
  @Prop({ type: String, required: true })
  lastName: string;
  @Prop({ type: String, required: true, minlength: 11, maxlength: 11 })
  phoneNumber: string;
  @Prop({ type: String, required: true })
  email: string;
  @Prop({ type: String, required: true })
  pin: string;
  @Prop({ type: Boolean, default: false })
  removed: boolean;
}
export const StaffSchema = SchemaFactory.createForClass(Staff);
