import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pago, PagoDocument } from '../schemas/pago.schema';

@Injectable()
export class PagoService {
  constructor(@InjectModel(Pago.name) private pagoModel: Model<PagoDocument>) {}

  async findAll(): Promise<Pago[]> {
    const pagos = await this.pagoModel.find();
    const newFormated = pagos.map((a: any, i: number) => {
      return {
        ...a._doc,
        index: i + 1,
      };
    });
    return newFormated;
  }

  async findOne(id: string): Promise<Pago> {
    const pago = await this.pagoModel.findById(id);
    return pago;
  }

  async create(pago: Pago): Promise<Pago> {
    const sendData = {
      ...pago,
      status: true,
    };

    const createPago = new this.pagoModel(sendData);

    return await createPago.save();
  }

  async delete(id: string): Promise<Pago> {
    const sendData = {
      status: false,
    };

    return await this.pagoModel.findByIdAndUpdate(id, sendData, {
      new: true,
    });
  }

  async update(id: string, pago: Pago): Promise<Pago> {
    const { status } = pago;

    if (status === false || status === true) {
      throw new HttpException(
        'No se puede actualizar el estado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const sendData = {
      ...pago,
    };

    return await this.pagoModel.findByIdAndUpdate(
      id,
      { $set: sendData },
      { new: true },
    );
  }

  async restore(id: string): Promise<Pago> {
    const sendData = {
      status: true,
    };

    return await this.pagoModel.findByIdAndUpdate(id, sendData, {
      new: true,
    });
  }
}
