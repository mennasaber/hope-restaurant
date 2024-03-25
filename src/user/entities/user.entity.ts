import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema({ timestamps: true, autoIndex: true })
export class User {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  email: string;
  @Prop({ type: String, required: true })
  phoneNumber: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: Boolean, default: false })
  removed: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});
UserSchema.pre('findOneAndUpdate', hashPasswordForUpdate);
async function hashPasswordForUpdate(next) {
  try {
    const userPassword =
      this.getUpdate().password || this.getUpdate().$set.password;
    if (userPassword) {
      this.getUpdate().$set.password = await bcrypt.hash(userPassword, 10);
      delete this.getUpdate().password;
    }
    next();
  } catch (error) {
    next(error);
  }
}
