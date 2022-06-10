import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export type IngresoDocument = Ingreso & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Ingreso {
  @Prop({ type: Date, requerid: true })
  fecha: Date;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  partido_vs: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  local_visita: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  fase_copaPeru: string;

  @Prop({ type: String, trim: true, requerid: true })
  realizo_actividad: string;

  @Prop({ type: String, uppercase: true, trim: true })
  nombre_actividad: string;

  @Prop({ type: Number })
  ingreso_total_actividad: number;

  @Prop({ type: Number, requerid: true })
  ingreso_apoyo_tribuna: number;

  @Prop({ type: Number, requerid: true })
  ingreso_cuota_dirigentes: number;

  @Prop({ type: Number, requerid: true })
  otros_ingresos: number;

  @Prop({ type: Number, requerid: true })
  ingreso_taquilla: number;

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

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  motivo_editacion?: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  motivo_anulacion?: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  motivo_restauracion?: string;
}

export const IngresoSchema = SchemaFactory.createForClass(Ingreso);
