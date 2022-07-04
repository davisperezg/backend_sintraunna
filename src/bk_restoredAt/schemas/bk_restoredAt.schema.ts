import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Afiliado } from 'src/afiliado/schemas/afiliado.schema';
import { User } from 'src/user/schemas/user.schema';
export type BkRestoredAtDocument = BkRestoredAt & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class BkRestoredAt {
  @Prop({ type: String, uppercase: true, requerid: true, trim: true })
  motivo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Afiliado' })
  afiliado: Afiliado;
}

export const BkRestoredAtSchema = SchemaFactory.createForClass(BkRestoredAt);
