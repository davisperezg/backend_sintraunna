import {
  BkUpdatedAt,
  BkUpdatedAtDocument,
} from './../../bk_updatedAt/schemas/bk_updatedAt.schema';
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  BkDeletedAt,
  BkDeletedAtDocument,
} from 'src/bk_deletedAt/schemas/bk_deletedAt.schema';
import { Afiliado, AfiliadoDocument } from '../schemas/afiliado.schema';
import {
  BkRestoredAt,
  BkRestoredAtDocument,
} from 'src/bk_restoredAt/schemas/bk_restoredAt.schema';

@Injectable()
export class AfiliadoService {
  constructor(
    @InjectModel(Afiliado.name) private afiliadoModel: Model<AfiliadoDocument>,
    @InjectModel(BkUpdatedAt.name)
    private bkUpdatedAfiliadoModel: Model<BkUpdatedAtDocument>,
    @InjectModel(BkDeletedAt.name)
    private bkDeletedAfiliadoModel: Model<BkDeletedAtDocument>,
    @InjectModel(BkRestoredAt.name)
    private bkRestoresAfiliadoModel: Model<BkRestoredAtDocument>,
  ) {}

  async findAll(): Promise<Afiliado[]> {
    const afiliados = await this.afiliadoModel.find();
    const newFormated = afiliados.map((a: any, i: number) => {
      return {
        ...a._doc,
        index: i + 1,
        full_name: a.nombres + ' ' + a.apellidos,
      };
    });
    return newFormated;
  }

  async findOne(id: string): Promise<Afiliado> {
    const afiliado = await this.afiliadoModel.findById(id);
    return afiliado;
  }

  async create(afiliado: Afiliado, user: any): Promise<Afiliado> {
    const { findUser } = user;

    const sendData = {
      ...afiliado,
      createBy: findUser._id,
      status: true,
    };

    const createAfiliado = new this.afiliadoModel(sendData);

    return await createAfiliado.save();
  }

  async delete(id: string, motivo: string, user: any): Promise<Afiliado> {
    const { findUser } = user;

    if (
      Object.keys(motivo)[0] === undefined ||
      Object.keys(motivo)[0] === 'undefined' ||
      Object.keys(motivo)[0] === null ||
      Object.keys(motivo)[0] === 'null'
    ) {
      throw new HttpException('Ingrese el motivo', HttpStatus.BAD_REQUEST);
    }

    const sendData = {
      status: false,
    };

    const findIdAfiliado = await this.afiliadoModel.findById(id);

    const sendDataAudi: BkDeletedAt = {
      motivo: Object.keys(motivo)[0],
      user: findUser._id,
      afiliado: findIdAfiliado,
    };

    await new this.bkDeletedAfiliadoModel(sendDataAudi).save();

    return await this.afiliadoModel.findByIdAndUpdate(id, sendData, {
      new: true,
    });
  }

  async update(id: string, afiliado: Afiliado, user: any): Promise<Afiliado> {
    const { status } = afiliado;
    const { findUser } = user;
    const valMotivo = (afiliado as any).motivo;

    if (
      !valMotivo ||
      valMotivo === undefined ||
      valMotivo === 'undefined' ||
      valMotivo === null ||
      valMotivo === 'null'
    ) {
      throw new HttpException('Ingrese el motivo', HttpStatus.BAD_REQUEST);
    }

    if (status === false || status === true) {
      throw new HttpException(
        'No se puede actualizar el estado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const sendData = {
      ...afiliado,
    };

    const findIdAfiliado = await this.afiliadoModel.findById(id);
    const {
      grupo,
      dni,
      nombres,
      apellidos,
      proyecto,
      puesto_trabajo,
      situacion_afiliado,
      celular,
      pagos,
    } = findIdAfiliado;
    const ValGrupoModified =
      String(afiliado.grupo) !== String(grupo) && afiliado.grupo;
    const ValDNIModified = afiliado.dni !== dni && afiliado.dni;
    const ValNombresModified = afiliado.nombres !== nombres && afiliado.nombres;
    const ValApellidosModified =
      afiliado.apellidos !== apellidos && afiliado.apellidos;
    const ValProyectoModified =
      afiliado.proyecto !== proyecto && afiliado.proyecto;
    const ValPuestoTrabajoModified =
      afiliado.puesto_trabajo !== puesto_trabajo && afiliado.puesto_trabajo;
    const ValSitucaionAfiModified =
      afiliado.situacion_afiliado !== situacion_afiliado &&
      afiliado.situacion_afiliado;
    const ValCelModified = afiliado.celular !== celular && afiliado.celular;
    const ValPagosModified =
      JSON.stringify(afiliado.pagos) !== JSON.stringify(pagos) &&
      afiliado.pagos;

    const pagosAdds = () => {
      const lengthInserting = ValPagosModified.length;
      const lengthCurrent = pagos.length;
      const formatedInserting = ValPagosModified.map((a) => a.nro);
      const formatedCurrent = pagos.map((a) => a.nro);
      let items = [];
      if (lengthInserting > lengthCurrent) {
        const findAdds = formatedInserting.filter(
          (a) => !formatedCurrent.includes(a),
        );
        ValPagosModified.filter((a) => {
          findAdds.filter((b) => {
            if (a.nro === b) {
              items.push(a);
            }
          });
        });
        console.log(items);
        const formated = items.map((a) => {
          return {
            nro: a.nro,
            fecha: {
              valorActual: new Date('1900-01-01T00:00:00.812+00:00'),
              valorModificadoA: a.fecha,
            },
            pago: {
              valorActual: new Types.ObjectId('000000000000000000000000'),
              valorModificadoA: a.pago,
            },
            importe: {
              valorActual: 0,
              valorModificadoA: a.importe,
            },
          };
        });
        items = formated;
      }
      if (lengthInserting < lengthCurrent) {
        const findRemovs = formatedCurrent.filter(
          (a) => !formatedInserting.includes(a),
        );
        pagos.filter((a) => {
          findRemovs.filter((b) => {
            if (a.nro === b) {
              items.push(a);
            }
          });
        });
        const formated = items.map((a) => {
          return {
            nro: a.nro,
            fecha: {
              valorActual: a.fecha,
              valorModificadoA: new Date('1900-01-01T00:00:00.812+00:00'),
            },
            pago: {
              valorActual: a.pago,
              valorModificadoA: new Types.ObjectId('000000000000000000000000'),
            },
            importe: {
              valorActual: a.importe,
              valorModificadoA: 0,
            },
          };
        });
        items = formated;
      }
      return items;
    };

    const pagosModifieds = () => {
      // Se reduce el arreglo data2 para formar un indice
      const index = ValPagosModified.reduce((prev, curr) => {
        return {
          ...prev,
          [curr.nro]: {
            nro: curr.nro,
            fecha: String(curr.fecha),
            pago: curr.pago,
            importe: curr.importe,
          },
        };
      }, {});
      // Se reduce el arreglo data1 comparandolo respecto al indice
      const res = pagos.reduce(
        (prev, curr) => {
          if (typeof index[curr.nro] === 'undefined') {
            return {
              valorActual_MANIN: prev.valorActual_MANIN,
            };
          }

          // Si las cantidades son iguales se agrega el objeto a los correctos
          if (
            new Date(index[curr.nro].fecha).toString() !==
              new Date(String(curr.fecha)).toString() ||
            index[curr.nro].importe !== curr.importe ||
            String(curr.pago) !== String(index[curr.nro].pago)
          ) {
            return {
              valorActual_MANIN: [
                ...prev.valorActual_MANIN,
                {
                  nro: curr.nro,
                  fecha: new Date(index[curr.nro].fecha).toString() !==
                    new Date(String(curr.fecha)).toString() && {
                    valorActual: curr.fecha,
                    valorModificadoA: new Date(index[curr.nro].fecha),
                  },
                  pago: String(curr.pago) !== String(index[curr.nro].pago) && {
                    valorActual: curr.pago,
                    valorModificadoA: index[curr.nro].pago,
                  },
                  importe: curr.importe !== index[curr.nro].importe && {
                    valorActual: curr.importe,
                    valorModificadoA: index[curr.nro].importe,
                  },
                },
              ],
              // valorNO_MANIN: prev.valorNO_MANIN,
            };
          }
          // De lo contrario se agrega a los incorrectos
          return {
            valorActual_MANIN: prev.valorActual_MANIN,
            // valorNO_MANIN: [...prev.valorNO_MANIN, curr],
          };
        },
        {
          valorActual_MANIN: [],
          // valorNO_MANIN: [],
        },
      );

      return res;
    };
    console.log(ValGrupoModified && typeof ValGrupoModified === 'string');
    const objectModifieds = {
      grupo: (ValGrupoModified || typeof ValGrupoModified === 'string') && {
        valorActual: grupo,
        valorModificadoA: ValGrupoModified,
      },
      dni: (ValDNIModified || typeof ValDNIModified === 'string') && {
        valorActual: dni,
        valorModificadoA: ValDNIModified,
      },
      nombres: (ValNombresModified ||
        typeof ValNombresModified === 'string') && {
        valorActual: nombres,
        valorModificadoA: ValNombresModified,
      },
      apellidos: (ValApellidosModified ||
        typeof ValApellidosModified === 'string') && {
        valorActual: apellidos,
        valorModificadoA: ValApellidosModified,
      },
      proyecto: (ValProyectoModified ||
        typeof ValProyectoModified === 'string') && {
        valorActual: proyecto,
        valorModificadoA: ValProyectoModified,
      },
      puesto_trabajo: (ValPuestoTrabajoModified ||
        typeof ValPuestoTrabajoModified === 'string') && {
        valorActual: puesto_trabajo,
        valorModificadoA: ValPuestoTrabajoModified,
      },
      situacion_afiliado: (ValSitucaionAfiModified ||
        typeof ValSitucaionAfiModified === 'string') && {
        valorActual: situacion_afiliado,
        valorModificadoA: ValSitucaionAfiModified,
      },
      celular: (ValCelModified || typeof ValCelModified === 'string') && {
        valorActual: celular,
        valorModificadoA: ValCelModified,
      },
      pagos: ValPagosModified
        ? ValPagosModified.length === pagos.length
          ? pagosModifieds().valorActual_MANIN
          : pagosAdds().concat(pagosModifieds().valorActual_MANIN)
        : [],
    };

    const sendDataAudi: BkUpdatedAt = {
      motivo: valMotivo,
      user: findUser._id,
      afiliado: findIdAfiliado,
      data: objectModifieds,
    };

    await new this.bkUpdatedAfiliadoModel(sendDataAudi).save();

    return await this.afiliadoModel.findByIdAndUpdate(
      id,
      { $set: sendData },
      { new: true },
    );
  }

  async restore(id: string, motivo: string, user: any): Promise<Afiliado> {
    const { findUser } = user;

    if (
      Object.keys(motivo)[0] === undefined ||
      Object.keys(motivo)[0] === 'undefined' ||
      Object.keys(motivo)[0] === null ||
      Object.keys(motivo)[0] === 'null'
    ) {
      throw new HttpException('Ingrese el motivo', HttpStatus.BAD_REQUEST);
    }

    const sendData = {
      status: true,
    };

    const findIdAfiliado = await this.afiliadoModel.findById(id);

    const sendDataAudi: BkRestoredAt = {
      motivo: Object.keys(motivo)[0],
      user: findUser._id,
      afiliado: findIdAfiliado,
    };

    await new this.bkRestoresAfiliadoModel(sendDataAudi).save();

    return await this.afiliadoModel.findByIdAndUpdate(id, sendData, {
      new: true,
    });
  }
}
