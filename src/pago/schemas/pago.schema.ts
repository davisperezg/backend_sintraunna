import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type PagoDocument = Pago & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Pago {
  @Prop({ type: Boolean, requerid: true })
  status: boolean;

  @Prop({
    type: String,
    uppercase: true,
    requerid: true,
    trim: true,
    unique: true,
  })
  concepto: string;

  @Prop({ type: Number, requerid: true })
  importe: number;
}

export const PagoSchema = SchemaFactory.createForClass(Pago);
