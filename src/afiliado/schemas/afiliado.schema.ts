import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Grupo } from 'src/grupo/schemas/grupo.schema';
import { Pago } from 'src/pago/schemas/pago.schema';
import { User } from 'src/user/schemas/user.schema';
export type AfiliadoDocument = Afiliado & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Afiliado {
  @Prop({ type: Boolean, requerid: true })
  status: boolean;

  @Prop({ type: String, requerid: true, trim: true })
  dni: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  nombres: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  apellidos: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  proyecto: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  situacion_afiliado: string;

  @Prop({ type: String, uppercase: true, trim: true })
  puesto_trabajo: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  celular: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Grupo', requerid: false })
  grupo: Grupo;

  @Prop({
    requerid: false,
    type: [
      {
        nro: { type: Number },
        fecha: { type: Date },
        pago: { type: mongoose.Schema.Types.ObjectId, ref: 'Pago' },
        importe: { type: Number },
      },
    ],
  })
  pagos: {
    nro: number;
    fecha: Date;
    pago: Pago;
    importe: number;
  }[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createBy: User;
}

export const AfiliadoSchema = SchemaFactory.createForClass(Afiliado);
