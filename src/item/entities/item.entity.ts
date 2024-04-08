import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
export type ItemDocument = Item & Document;
@Schema({ autoIndex: true, timestamps: true })
export class Item {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String })
  discription: string;
  @Prop({ type: Number, required: true, min: 0 })
  price: number;
  @Prop({ type: Number, default: 0, min: 0, max: 100 })
  discount: number;
  @Prop({ type: Boolean, default: true })
  display: boolean;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  })
  category: string;
  @Prop({ type: Boolean, default: false })
  removed: boolean;
}
export const ItemSchema = SchemaFactory.createForClass(Item);
