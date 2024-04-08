import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type CategoryDocument = Category & Document;
@Schema({ autoIndex: true, timestamps: true })
export class Category {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Boolean, default: true })
  display: boolean;
  @Prop({ type: Boolean, default: false })
  removed: boolean;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
