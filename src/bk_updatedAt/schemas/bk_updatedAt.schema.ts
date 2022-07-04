import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Afiliado } from 'src/afiliado/schemas/afiliado.schema';
import { User } from 'src/user/schemas/user.schema';
export type BkUpdatedAtDocument = BkUpdatedAt & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class BkUpdatedAt {
  @Prop({ type: String, uppercase: true, requerid: true, trim: true })
  motivo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Afiliado' })
  afiliado: Afiliado;

  @Prop(
    raw({
      grupo: {
        valorActual: { type: mongoose.Schema.Types.ObjectId, ref: 'Grupo' },
        valorModificadoA: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Grupo',
        },
      },
      dni: {
        valorActual: { type: String, uppercase: true, trim: true },
        valorModificadoA: { type: String, uppercase: true, trim: true },
      },
      nombres: {
        valorActual: { type: String, uppercase: true, trim: true },
        valorModificadoA: { type: String, uppercase: true, trim: true },
      },
      apellidos: {
        valorActual: { type: String, uppercase: true, trim: true },
        valorModificadoA: { type: String, uppercase: true, trim: true },
      },
      proyecto: {
        valorActual: { type: String, uppercase: true, trim: true },
        valorModificadoA: { type: String, uppercase: true, trim: true },
      },
      puesto_trabajo: {
        valorActual: { type: String, uppercase: true, trim: true },
        valorModificadoA: { type: String, uppercase: true, trim: true },
      },
      situacion_afiliado: {
        valorActual: { type: String, uppercase: true, trim: true },
        valorModificadoA: { type: String, uppercase: true, trim: true },
      },
      celular: {
        valorActual: { type: String, uppercase: true, trim: true },
        valorModificadoA: { type: String, uppercase: true, trim: true },
      },
      pagos: [
        {
          nro: { type: Number },
          fecha: {
            valorActual: { type: Date || String },
            valorModificadoA: { type: Date || String },
          },
          pago: {
            valorActual: { type: mongoose.Schema.Types.ObjectId, ref: 'Pago' },
            valorModificadoA: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Pago',
            },
          },
          importe: {
            valorActual: { type: Number },
            valorModificadoA: { type: Number },
          },
        },
      ],
    }),
  )
  data: Record<string, any>;
}

export const BkUpdatedAtSchema = SchemaFactory.createForClass(BkUpdatedAt);
