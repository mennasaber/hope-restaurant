import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
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

StaffSchema.pre('save', async function hashPin(next) {
  try {
    this.pin = await bcrypt.hash(this.pin, 10);
    next();
  } catch (error) {
    next(error);
  }
});
StaffSchema.pre('findOneAndUpdate', hashPinForUpdate);

async function hashPinForUpdate(next) {
  try {
    const staffPin = this.getUpdate().pin || this.getUpdate().$set.pin;
    if (staffPin) {
      this.getUpdate().$set.pin = await bcrypt.hash(staffPin, 10);
      delete this.getUpdate().pin;
    }
    next();
  } catch (error) {
    next(error);
  }
}
