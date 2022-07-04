import { Egreso } from './../../egreso/schemas/egreso.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export type BkEgresoDeletedAtDocument = BkEgresoDeletedAt & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class BkEgresoDeletedAt {
  @Prop({ type: String, uppercase: true, requerid: true, trim: true })
  motivo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Egreso' })
  egreso: Egreso;
}

export const BkEgresoDeletedAtSchema =
  SchemaFactory.createForClass(BkEgresoDeletedAt);
