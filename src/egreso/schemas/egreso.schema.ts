import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export type EgresoDocument = Egreso & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Egreso {
  @Prop({ type: Date, requerid: true })
  fecha: Date;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  nombre_destinatario: string;

  @Prop({ type: String, uppercase: true, trim: true, requerid: true })
  detalle_egreso: string;

  @Prop({ type: Boolean, requerid: true })
  status: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createBy: User;

  @Prop({
    type: [
      {
        nro: { type: Number },
        proviene_dinero: { type: String, uppercase: true, trim: true },
        gasto: { type: String, uppercase: true, trim: true },
        monto: { type: Number },
      },
    ],
  })
  gastos: {
    nro: number;
    proviene_dinero: string;
    gasto: string;
    monto: number;
  }[];
}

export const EgresoSchema = SchemaFactory.createForClass(Egreso);
