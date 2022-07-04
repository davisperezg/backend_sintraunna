import { Afiliado } from './../../afiliado/schemas/afiliado.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export type IngresoDocument = Ingreso & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Ingreso {
  @Prop({ type: Boolean, requerid: true })
  status: boolean;

  @Prop({ type: Date, requerid: true })
  fecha: Date;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  detalle_ingreso: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Afiliado' })
  afiliado: Afiliado;

  @Prop({
    type: [
      {
        nro: { type: Number },
        proyecto: { type: String },
        concepto: { type: String },
        importe: { type: Number },
      },
    ],
  })
  ingresos_afiliado: {
    nro: number;
    proyecto: string;
    concepto: string;
    monto: number;
  }[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createBy: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updateBy: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  deleteBy: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  restoreBy: User;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  motivo_editacion?: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  motivo_anulacion?: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  motivo_restauracion?: string;
}

export const IngresoSchema = SchemaFactory.createForClass(Ingreso);
