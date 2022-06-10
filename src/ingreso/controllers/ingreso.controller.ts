import { Param, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CtxUser } from 'src/lib/decorators/ctx-user.decorators';
import PermissionGuard from 'src/lib/guards/resources.guard';
import Permission from 'src/lib/type/permission.type';
import { Ingreso } from '../schemas/Ingreso.schema';
import { IngresoService } from '../services/ingreso.service';

@Controller('api/v1/ingresos')
export class IngresoController {
  constructor(private readonly ingresoService: IngresoService) {}

  // Get Ingresos
  @Get()
  @UseGuards(PermissionGuard(Permission.ReadIngreso))
  async getIngresos(): Promise<Ingreso[]> {
    return await this.ingresoService.findAll();
  }

  // Get One Ingreso
  @Get('/find/:id')
  @UseGuards(PermissionGuard(Permission.ReadOneIngreso))
  async getOneIngreso(@Param('id') id: string) {
    return await this.ingresoService.findOne(id);
  }

  // Add Ingreso
  @Post()
  @UseGuards(PermissionGuard(Permission.CreateIngreso))
  async createIngreso(
    @Res() res,
    @Body() createBody: Ingreso,
    @CtxUser() user: any,
  ): Promise<Ingreso> {
    const created = await this.ingresoService.create(createBody, user);
    return res.status(HttpStatus.OK).json({
      message: 'Ingreso Successfully Created',
      created,
    });
  }

  // Update Ingreso: /ingresos/605ab8372ed8db2ad4839d87
  @Put(':id')
  @UseGuards(PermissionGuard(Permission.EditIngreso))
  async updateIngreso(
    @Res() res,
    @Param('id') id: string,
    @Body() createBody: Ingreso,
    @CtxUser() user: any,
  ): Promise<Ingreso> {
    const updated = await this.ingresoService.update(id, createBody, user);
    return res.status(HttpStatus.OK).json({
      message: 'Ingreso Successfully Updated',
      updated,
    });
  }

  // Delete Ingreso: /ingresos/605ab8372ed8db2ad4839d87
  @Put('/anular/:id')
  @UseGuards(PermissionGuard(Permission.DeleteIngreso))
  async deleteIngreso(
    @Param('id') id: string,
    @Body() motivo: string,
    @CtxUser() user: any,
  ): Promise<Ingreso> {
    return await this.ingresoService.delete(id, motivo, user);
  }

  // Restore Ingreso: /ingresos/restore/605ab8372ed8db2ad4839d87
  @Put('/restore/:id')
  @UseGuards(PermissionGuard(Permission.RestoreIngreso))
  async restoreIngreso(
    @Param('id') id: string,
    @Body() motivo: string,
    @CtxUser() user: any,
  ): Promise<Ingreso> {
    return await this.ingresoService.restore(id, motivo, user);
  }
}
