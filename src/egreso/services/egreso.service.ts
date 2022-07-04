import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BkEgresoDeletedAt,
  BkEgresoDeletedAtDocument,
} from 'src/bk_deletedAt/schemas/bk_egreso_deletedAt.schema';
import {
  BkEgresoRestoredAt,
  BkEgresoRestoredAtDocument,
} from 'src/bk_restoredAt/schemas/bk_egreso_restoredAt.schema';
import {
  BkEgresoUpdatedAt,
  BkEgresoUpdatedAtDocument,
} from 'src/bk_updatedAt/schemas/bk_egreso_updatedAt.schema';
import { Egreso, EgresoDocument } from '../schemas/egreso.schema';

@Injectable()
export class EgresoService {
  constructor(
    @InjectModel(Egreso.name) private egresoModel: Model<EgresoDocument>,
    @InjectModel(BkEgresoUpdatedAt.name)
    private bkUpdatedAfiliadoModel: Model<BkEgresoUpdatedAtDocument>,
    @InjectModel(BkEgresoDeletedAt.name)
    private bkDeletedAfiliadoModel: Model<BkEgresoDeletedAtDocument>,
    @InjectModel(BkEgresoRestoredAt.name)
    private bkRestoresAfiliadoModel: Model<BkEgresoRestoredAtDocument>,
  ) {}

  async findAll(): Promise<Egreso[]> {
    const egresos = await this.egresoModel.find();
    return egresos;
  }

  async findOne(id: string): Promise<Egreso> {
    const egreso: any = await this.egresoModel.findById(id).populate([
      {
        path: 'createBy',
      },
    ]);

    const getE = {
      ...egreso._doc,
      createBy: egreso.createBy.name + ' ' + egreso.createBy.lastname,
    };

    return getE;
  }

  async create(egreso: Egreso, user: any): Promise<Egreso> {
    const { findUser } = user;

    const sendData = {
      ...egreso,
      createBy: findUser._id,
      updateBy: null,
      deleteBy: null,
      restoreBy: null,
      status: true,
    };

    const createEgreso = new this.egresoModel(sendData);

    return await createEgreso.save();
  }

  async delete(id: string, motivo: string, user: any): Promise<Egreso> {
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

    const findIdEgreso = await this.egresoModel.findById(id);

    const sendDataAudi: BkEgresoDeletedAt = {
      motivo: Object.keys(motivo)[0],
      user: findUser._id,
      egreso: findIdEgreso,
    };

    await new this.bkDeletedAfiliadoModel(sendDataAudi).save();

    return await this.egresoModel.findByIdAndUpdate(id, sendData, {
      new: true,
    });
  }

  async update(id: string, egreso: Egreso, user: any): Promise<Egreso> {
    const { status } = egreso;
    const { findUser } = user;
    const valMotivo = (egreso as any).motivo;

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
      ...egreso,
    };

    const findIdEgres = await this.egresoModel.findById(id);
    const { fecha, nombre_destinatario, detalle_egreso, gastos } = findIdEgres;

    const ValFechaModified =
      new Date(egreso.fecha).toString() !== new Date(fecha).toString() &&
      egreso.fecha;

    const ValDestiModified =
      egreso.nombre_destinatario !== nombre_destinatario &&
      egreso.nombre_destinatario;
    const ValDetalleModified =
      egreso.detalle_egreso !== detalle_egreso && egreso.detalle_egreso;
    const ValPagosModified =
      JSON.stringify(egreso.gastos) !== JSON.stringify(gastos) && egreso.gastos;

    const gastosAdds = () => {
      const lengthInserting = ValPagosModified.length;
      const lengthCurrent = gastos.length;
      const formatedInserting = ValPagosModified.map((a) => a.nro);
      const formatedCurrent = gastos.map((a) => a.nro);
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
        const formated = items.map((a) => {
          return {
            nro: a.nro,
            gasto: {
              valorActual: 'ITEM NO EXISTIA',
              valorModificadoA: a.gasto,
            },
            monto: {
              valorActual: 0,
              valorModificadoA: a.monto,
            },
          };
        });
        items = formated;
      }
      if (lengthInserting < lengthCurrent) {
        const findRemovs = formatedCurrent.filter(
          (a) => !formatedInserting.includes(a),
        );
        gastos.filter((a) => {
          findRemovs.filter((b) => {
            if (a.nro === b) {
              items.push(a);
            }
          });
        });
        const formated = items.map((a) => {
          return {
            nro: a.nro,
            gasto: {
              valorActual: a.gasto,
              valorModificadoA: 'EL ITEM HA SIDO ELIMINADO',
            },
            monto: {
              valorActual: a.monto,
              valorModificadoA: 0,
            },
          };
        });
        items = formated;
      }
      return items;
    };

    const gastosModifieds = () => {
      // Se reduce el arreglo data2 para formar un indice
      const index = ValPagosModified.reduce((prev, curr) => {
        return {
          ...prev,
          [curr.nro]: {
            nro: curr.nro,
            gasto: curr.gasto,
            monto: curr.monto,
          },
        };
      }, {});

      // Se reduce el arreglo data1 comparandolo respecto al indice
      const res = gastos.reduce(
        (prev, curr) => {
          if (typeof index[curr.nro] === 'undefined') {
            return {
              valorActual_MANIN: prev.valorActual_MANIN,
            };
          }

          if (
            index[curr.nro].gasto !== curr.gasto ||
            index[curr.nro].monto !== curr.monto
          ) {
            return {
              valorActual_MANIN: [
                ...prev.valorActual_MANIN,
                {
                  nro: curr.nro,
                  gasto: curr.gasto !== index[curr.nro].gasto && {
                    valorActual: curr.gasto,
                    valorModificadoA: index[curr.nro].gasto,
                  },
                  monto: curr.monto !== index[curr.nro].monto && {
                    valorActual: curr.monto,
                    valorModificadoA: Number(index[curr.nro].monto),
                  },
                },
              ],
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

    const objectModifieds = {
      fecha: (ValFechaModified || typeof ValFechaModified === 'string') && {
        valorActual: fecha,
        valorModificadoA: ValFechaModified,
      },
      nombre_destinatario: (ValDestiModified ||
        typeof ValDestiModified === 'string') && {
        valorActual: nombre_destinatario,
        valorModificadoA: ValDestiModified,
      },
      detalle_egreso: (ValDetalleModified ||
        typeof ValDetalleModified === 'string') && {
        valorActual: detalle_egreso,
        valorModificadoA: ValDetalleModified,
      },
      gastos: ValPagosModified
        ? ValPagosModified.length === gastos.length
          ? gastosModifieds().valorActual_MANIN
          : gastosAdds().concat(gastosModifieds().valorActual_MANIN)
        : [],
    };

    const sendDataAudi: BkEgresoUpdatedAt = {
      motivo: valMotivo,
      user: findUser._id,
      egreso: findIdEgres,
      data: objectModifieds,
    };

    await new this.bkUpdatedAfiliadoModel(sendDataAudi).save();

    return await this.egresoModel.findByIdAndUpdate(
      id,
      { $set: sendData },
      { new: true },
    );
  }

  async restore(id: string, motivo: string, user: any): Promise<Egreso> {
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

    const findIdEgres = await this.egresoModel.findById(id);

    const sendDataAudi: BkEgresoRestoredAt = {
      motivo: Object.keys(motivo)[0],
      user: findUser._id,
      egreso: findIdEgres,
    };

    await new this.bkRestoresAfiliadoModel(sendDataAudi).save();

    return await this.egresoModel.findByIdAndUpdate(id, sendData, {
      new: true,
    });
  }
}
