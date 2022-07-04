import { Param, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CtxUser } from 'src/lib/decorators/ctx-user.decorators';
import PermissionGuard from 'src/lib/guards/resources.guard';
import Permission from 'src/lib/type/permission.type';
import { Afiliado } from '../schemas/afiliado.schema';
import { AfiliadoService } from '../services/afiliado.service';

@Controller('api/v1/afiliados')
export class AfiliadoController {
  constructor(private readonly afiliadoService: AfiliadoService) {}

  // Get Afiliados
  @Get()
  @UseGuards(PermissionGuard(Permission.ReadAfiliados))
  async getAfiliados(): Promise<Afiliado[]> {
    return await this.afiliadoService.findAll();
  }

  // Get One Afiliado
  @Get('/find/:id')
  @UseGuards(PermissionGuard(Permission.ReadOneAfiliado))
  async getOneAfiliado(@Param('id') id: string) {
    return await this.afiliadoService.findOne(id);
  }

  // Add Afiliado
  @Post()
  @UseGuards(PermissionGuard(Permission.CreateAfiliado))
  async createAfiliado(
    @Res() res,
    @Body() createBody: Afiliado,
    @CtxUser() user: any,
  ): Promise<Afiliado> {
    const created = await this.afiliadoService.create(createBody, user);
    return res.status(HttpStatus.OK).json({
      message: 'Afiliado Successfully Created',
      created,
    });
  }

  // Update Afiliado: /afiliados/605ab8372ed8db2ad4839d87
  @Put(':id')
  @UseGuards(PermissionGuard(Permission.EditAfiliado))
  async updateAfiliado(
    @Res() res,
    @Param('id') id: string,
    @Body() createBody: Afiliado,
    @CtxUser() user: any,
  ): Promise<Afiliado> {
    const updated = await this.afiliadoService.update(id, createBody, user);
    return res.status(HttpStatus.OK).json({
      message: 'Afiliado Successfully Updated',
      updated,
    });
  }

  // Delete Afiliado: /afiliados/605ab8372ed8db2ad4839d87
  @Put('/anular/:id')
  @UseGuards(PermissionGuard(Permission.DeleteAfiliado))
  async deleteAfiliado(
    @Param('id') id: string,
    @Body() motivo: string,
    @CtxUser() user: any,
  ): Promise<Afiliado> {
    return await this.afiliadoService.delete(id, motivo, user);
  }

  // Restore Afiliado: /afiliados/restore/605ab8372ed8db2ad4839d87
  @Put('/restore/:id')
  @UseGuards(PermissionGuard(Permission.RestoreAfiliado))
  async restoreAfiliado(
    @Param('id') id: string,
    @Body() motivo: string,
    @CtxUser() user: any,
  ): Promise<Afiliado> {
    return await this.afiliadoService.restore(id, motivo, user);
  }
}
