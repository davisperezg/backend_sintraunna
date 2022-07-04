import { HttpStatus } from '@nestjs/common';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingreso, IngresoDocument } from '../schemas/ingreso.schema';

@Injectable()
export class IngresoService {
  constructor(
    @InjectModel(Ingreso.name) private ingresoModel: Model<IngresoDocument>,
  ) {}

  async findAll(): Promise<Ingreso[]> {
    const ingresos = await this.ingresoModel.find().populate('afiliado');
    const newFormated = ingresos.map((a: any, i: number) => {
      return {
        ...a._doc,
        index: i + 1,
        afiliado: a.afiliado.nombres + ' ' + a.afiliado.apellidos,
      };
    });
    return newFormated;
  }

  async findOne(id: string): Promise<Ingreso> {
    const ingreso: any = await this.ingresoModel.findById(id).populate([
      {
        path: 'afiliado',
      },
      {
        path: 'createBy',
      },
      {
        path: 'updateBy',
      },
      {
        path: 'deleteBy',
      },
      {
        path: 'restoreBy',
      },
    ]);

    const getI = {
      ...ingreso._doc,
      createBy: ingreso.createBy.name + ' ' + ingreso.createBy.lastname,
      updateBy:
        ingreso.updateBy !== null
          ? ingreso.updateBy.name + ' ' + ingreso.updateBy.lastname
          : 'NINGUNO',
      deleteBy:
        ingreso.deleteBy !== null
          ? ingreso.deleteBy.name + ' ' + ingreso.deleteBy.lastname
          : 'NINGUNO',
      restoreBy:
        ingreso.restoreBy !== null
          ? ingreso.restoreBy.name + ' ' + ingreso.restoreBy.lastname
          : 'NINGUNO',
    };

    return getI;
  }

  async create(ingreso: Ingreso, user: any): Promise<Ingreso> {
    const { findUser } = user;

    const sendData = {
      ...ingreso,
      createBy: findUser._id,
      updateBy: null,
      deleteBy: null,
      restoreBy: null,
      status: true,
    };

    const createIngreso = new this.ingresoModel(sendData);

    return await createIngreso.save();
  }

  async delete(id: string, motivo: string, user: any): Promise<Ingreso> {
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
      motivo_anulacion: Object.keys(motivo)[0],
      deleteBy: findUser._id,
    };

    return await this.ingresoModel.findByIdAndUpdate(id, sendData, {
      new: true,
    });
  }

  async update(id: string, ingreso: Ingreso, user: any): Promise<Ingreso> {
    const { status } = ingreso;
    const { findUser } = user;

    if (
      !ingreso.motivo_editacion ||
      ingreso.motivo_editacion === undefined ||
      ingreso.motivo_editacion === 'undefined' ||
      ingreso.motivo_editacion === null ||
      ingreso.motivo_editacion === 'null'
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
      ...ingreso,
      updateBy: findUser._id,
    };

    return await this.ingresoModel.findByIdAndUpdate(
      id,
      { $set: sendData },
      { new: true },
    );
  }

  async restore(id: string, motivo: string, user: any): Promise<Ingreso> {
    const { findUser } = user;

    const sendData = {
      status: true,
      restoreBy: findUser._id,
      motivo_restauracion: Object.keys(motivo)[0],
    };

    return await this.ingresoModel.findByIdAndUpdate(id, sendData, {
      new: true,
    });
  }
}
