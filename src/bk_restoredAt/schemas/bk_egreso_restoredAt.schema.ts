import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Egreso } from 'src/egreso/schemas/egreso.schema';
import { User } from 'src/user/schemas/user.schema';
export type BkEgresoRestoredAtDocument = BkEgresoRestoredAt & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class BkEgresoRestoredAt {
  @Prop({ type: String, uppercase: true, requerid: true, trim: true })
  motivo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Egreso' })
  egreso: Egreso;
}

export const BkEgresoRestoredAtSchema =
  SchemaFactory.createForClass(BkEgresoRestoredAt);
