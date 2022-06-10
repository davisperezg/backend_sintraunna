import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export type EgresoDocument = Egreso & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Egreso {
  @Prop({ type: Date, requerid: true })
  fecha: Date;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  partido_vs: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  local_visita: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  fase_copaPeru: string;

  @Prop({ type: Boolean, requerid: true })
  status: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createBy: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updateBy: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  deleteBy: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  restoreBy: User;

  @Prop({
    type: [
      {
        nro: { type: Number },
        gasto: { type: String },
        monto: { type: Number },
      },
    ],
  })
  gastos: { nro: number; gasto: string; monto: number }[];

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  motivo_editacion?: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  motivo_anulacion?: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  motivo_restauracion?: string;
}

export const EgresoSchema = SchemaFactory.createForClass(Egreso);
