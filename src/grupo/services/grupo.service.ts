import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grupo, GrupoDocument } from '../schemas/grupo.schema';

@Injectable()
export class GrupoService {
  constructor(
    @InjectModel(Grupo.name) private grupoModel: Model<GrupoDocument>,
  ) {}

  async findAll(): Promise<Grupo[]> {
    const afiliados = await this.grupoModel.find();
    const newFormated = afiliados.map((a: any, i: number) => {
      return {
        ...a._doc,
        index: i + 1,
      };
    });
    return newFormated;
  }

  async findOne(id: string): Promise<Grupo> {
    const afiliado = await this.grupoModel.findById(id);
    return afiliado;
  }

  async create(grupo: Grupo): Promise<Grupo> {
    const sendData = {
      ...grupo,
      status: true,
    };

    const createGrupo = new this.grupoModel(sendData);

    return await createGrupo.save();
  }

  async delete(id: string): Promise<Grupo> {
    const sendData = {
      status: false,
    };

    return await this.grupoModel.findByIdAndUpdate(id, sendData, {
      new: true,
    });
  }

  async update(id: string, grupo: Grupo): Promise<Grupo> {
    const { status } = grupo;

    if (status === false || status === true) {
      throw new HttpException(
        'No se puede actualizar el estado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const sendData = {
      ...grupo,
    };

    return await this.grupoModel.findByIdAndUpdate(
      id,
      { $set: sendData },
      { new: true },
    );
  }

  async restore(id: string): Promise<Grupo> {
    const sendData = {
      status: true,
    };

    return await this.grupoModel.findByIdAndUpdate(id, sendData, {
      new: true,
    });
  }
}
