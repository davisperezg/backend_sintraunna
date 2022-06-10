import { Param, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CtxUser } from 'src/lib/decorators/ctx-user.decorators';
import PermissionGuard from 'src/lib/guards/resources.guard';
import Permission from 'src/lib/type/permission.type';
import { Egreso } from '../schemas/egreso.schema';
import { EgresoService } from '../services/egreso.service';

@Controller('api/v1/egresos')
export class EgresoController {
  constructor(private readonly egresoService: EgresoService) {}

  // Get Egresos
  @Get()
  @UseGuards(PermissionGuard(Permission.ReadEgreso))
  async getEgresos(): Promise<Egreso[]> {
    return await this.egresoService.findAll();
  }

  // Get One Egreso
  @Get('/find/:id')
  @UseGuards(PermissionGuard(Permission.ReadOneEgreso))
  async getOneEgreso(@Param('id') id: string) {
    return await this.egresoService.findOne(id);
  }

  // Add Egresos
  @Post()
  @UseGuards(PermissionGuard(Permission.CreateEgreso))
  async createEgreso(
    @Res() res,
    @Body() createBody: Egreso,
    @CtxUser() user: any,
  ): Promise<Egreso> {
    const created = await this.egresoService.create(createBody, user);
    return res.status(HttpStatus.OK).json({
      message: 'Egreso Successfully Created',
      created,
    });
  }

  // Update Egreso: /egresos/605ab8372ed8db2ad4839d87
  @Put(':id')
  @UseGuards(PermissionGuard(Permission.EditEgreso))
  async updateEgreso(
    @Res() res,
    @Param('id') id: string,
    @Body() createBody: Egreso,
    @CtxUser() user: any,
  ): Promise<Egreso> {
    const updated = await this.egresoService.update(id, createBody, user);
    return res.status(HttpStatus.OK).json({
      message: 'Egreso Successfully Updated',
      updated,
    });
  }

  // Delete Egreso: /egresos/605ab8372ed8db2ad4839d87
  @Put('/anular/:id')
  @UseGuards(PermissionGuard(Permission.DeleteEgreso))
  async deleteEgreso(
    @Param('id') id: string,
    @Body() motivo: string,
    @CtxUser() user: any,
  ): Promise<Egreso> {
    return await this.egresoService.delete(id, motivo, user);
  }

  // Restore Egreso: /egresos/restore/605ab8372ed8db2ad4839d87
  @Put('/restore/:id')
  @UseGuards(PermissionGuard(Permission.RestoreEgreso))
  async restoreEgreso(
    @Param('id') id: string,
    @Body() motivo: string,
    @CtxUser() user: any,
  ): Promise<Egreso> {
    return await this.egresoService.restore(id, motivo, user);
  }
}
