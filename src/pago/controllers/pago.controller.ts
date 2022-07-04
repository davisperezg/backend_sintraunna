import { Param, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import PermissionGuard from 'src/lib/guards/resources.guard';
import Permission from 'src/lib/type/permission.type';
import { Pago } from '../schemas/pago.schema';
import { PagoService } from '../services/pago.service';

@Controller('api/v1/pagos')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  // Get Pagos
  @Get()
  @UseGuards(PermissionGuard(Permission.ReadPagos))
  async getPagos(): Promise<Pago[]> {
    return await this.pagoService.findAll();
  }

  // Get One Pago
  @Get('/find/:id')
  @UseGuards(PermissionGuard(Permission.ReadOnePago))
  async getOnePago(@Param('id') id: string) {
    return await this.pagoService.findOne(id);
  }

  // Add Pago
  @Post()
  @UseGuards(PermissionGuard(Permission.CreatePago))
  async createPago(@Res() res, @Body() createBody: Pago): Promise<Pago> {
    const created = await this.pagoService.create(createBody);
    return res.status(HttpStatus.OK).json({
      message: 'Pago Successfully Created',
      created,
    });
  }

  // Update Pago: /Pagos/605ab8372ed8db2ad4839d87
  @Put(':id')
  @UseGuards(PermissionGuard(Permission.EditPago))
  async updatePago(
    @Res() res,
    @Param('id') id: string,
    @Body() createBody: Pago,
  ): Promise<Pago> {
    const updated = await this.pagoService.update(id, createBody);
    return res.status(HttpStatus.OK).json({
      message: 'Pago Successfully Updated',
      updated,
    });
  }

  // Delete Pago: /Pagos/605ab8372ed8db2ad4839d87
  @Delete(':id')
  @UseGuards(PermissionGuard(Permission.DeletePago))
  async deletePago(@Param('id') id: string): Promise<Pago> {
    return await this.pagoService.delete(id);
  }

  // Restore Pago: /Pagos/restore/605ab8372ed8db2ad4839d87
  @Put('/restore/:id')
  @UseGuards(PermissionGuard(Permission.RestorePago))
  async restorePago(@Param('id') id: string): Promise<Pago> {
    return await this.pagoService.restore(id);
  }
}
