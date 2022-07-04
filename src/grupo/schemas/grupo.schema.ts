import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type GrupoDocument = Grupo & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Grupo {
  @Prop({ type: Boolean, requerid: true })
  status: boolean;

  @Prop({
    type: String,
    uppercase: true,
    unique: true,
    requerid: true,
    trim: true,
  })
  nombre: string;

  @Prop({ type: String, uppercase: true, trim: true })
  descripcion: string;
}

export const GrupoSchema = SchemaFactory.createForClass(Grupo);
