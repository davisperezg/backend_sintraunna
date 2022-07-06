import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Afiliado,
  AfiliadoDocument,
} from 'src/afiliado/schemas/afiliado.schema';
import { Pago, PagoDocument } from 'src/pago/schemas/pago.schema';

@Injectable()
export class ConsultaService {
  constructor(
    @InjectModel(Afiliado.name) private afiliadoModel: Model<AfiliadoDocument>,
    @InjectModel(Pago.name) private pagoModel: Model<PagoDocument>,
  ) {}

  async findXPago(id: string): Promise<any[]> {
    const afiliados = await this.afiliadoModel.find();
    const listPagos_afiliados = afiliados.map((a: any, i: number) => {
      return {
        index: i + 1,
        afiliado: a.nombres + ' ' + a.apellidos,
        pagos: a.pagos.filter((x) => String(x.pago) === id),
      };
    });

    return listPagos_afiliados;
  }

  async findPagos(): Promise<Pago[]> {
    const pagos = await this.pagoModel.find();
    return pagos;
  }

  async findAll(): Promise<any[]> {
    const afiliados = await this.afiliadoModel
      .find()
      .populate({ path: 'pagos', populate: { path: 'pago' } });
    const listPagos_afiliados = afiliados.map((a: any, i: number) => {
      return {
        index: i + 1,
        afiliado: a.nombres + ' ' + a.apellidos,
        pagos: a.pagos.map((x) => {
          return {
            importe: x.importe,
            concepto: x.pago.concepto,
            fecha: x.fecha,
          };
        }),
      };
    });
    return listPagos_afiliados;
  }
}
