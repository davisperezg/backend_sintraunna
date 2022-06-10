import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Egreso, EgresoDocument } from '../schemas/egreso.schema';

@Injectable()
export class EgresoService {
  constructor(
    @InjectModel(Egreso.name) private egresoModel: Model<EgresoDocument>,
  ) {}

  async findAll(): Promise<Egreso[]> {
    return await this.egresoModel.find();
  }

  async findOne(id: string): Promise<Egreso> {
    const egreso: any = await this.egresoModel.findById(id).populate([
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

    const getE = {
      ...egreso._doc,
      createBy: egreso.createBy.name + ' ' + egreso.createBy.lastname,
      updateBy:
        egreso.updateBy !== null
          ? egreso.updateBy.name + ' ' + egreso.updateBy.lastname
          : 'NINGUNO',
      deleteBy:
        egreso.deleteBy !== null
          ? egreso.deleteBy.name + ' ' + egreso.deleteBy.lastname
          : 'NINGUNO',
      restoreBy:
        egreso.restoreBy !== null
          ? egreso.restoreBy.name + ' ' + egreso.restoreBy.lastname
          : 'NINGUNO',
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
      deleteBy: findUser._id,
      motivo_anulacion: Object.keys(motivo)[0],
    };

    return await this.egresoModel.findByIdAndUpdate(id, sendData, {
      new: true,
    });
  }

  async update(id: string, egreso: Egreso, user: any): Promise<Egreso> {
    const { status } = egreso;
    const { findUser } = user;

    if (
      !egreso.motivo_editacion ||
      egreso.motivo_editacion === undefined ||
      egreso.motivo_editacion === 'undefined' ||
      egreso.motivo_editacion === null ||
      egreso.motivo_editacion === 'null'
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
      updateBy: findUser._id,
    };

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
      restoreBy: findUser._id,
      motivo_restauracion: Object.keys(motivo)[0],
    };

    return await this.egresoModel.findByIdAndUpdate(id, sendData, {
      new: true,
    });
  }
}
