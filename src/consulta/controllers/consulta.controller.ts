import { Param, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Afiliado } from 'src/afiliado/schemas/afiliado.schema';
import { CtxUser } from 'src/lib/decorators/ctx-user.decorators';
import PermissionGuard from 'src/lib/guards/resources.guard';
import Permission from 'src/lib/type/permission.type';
import { Pago } from 'src/pago/schemas/pago.schema';
import { ConsultaService } from '../services/consulta.service';

@Controller('api/v1/consultas')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @Get('/pago/:id')
  @UseGuards(PermissionGuard(Permission.ReadConsultaXpago))
  async getConsultaXPago(@Param('id') id: string): Promise<Afiliado[]> {
    return await this.consultaService.findXPago(id);
  }

  @Get('/list/pagos')
  @UseGuards(PermissionGuard(Permission.ReadConsultaXpago))
  async getPagos(): Promise<Pago[]> {
    return await this.consultaService.findPagos();
  }

  @Get('/pagos')
  @UseGuards(PermissionGuard(Permission.ReadConsultaGeneral))
  async getConsultaPagos(): Promise<Afiliado[]> {
    return await this.consultaService.findAll();
  }
}
