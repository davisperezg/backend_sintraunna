import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Afiliado } from 'src/afiliado/schemas/afiliado.schema';
import { User } from 'src/user/schemas/user.schema';
export type BkDeletedAtDocument = BkDeletedAt & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class BkDeletedAt {
  @Prop({ type: String, uppercase: true, requerid: true, trim: true })
  motivo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Afiliado' })
  afiliado: Afiliado;
}

export const BkDeletedAtSchema = SchemaFactory.createForClass(BkDeletedAt);
