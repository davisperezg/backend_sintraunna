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
import { Grupo } from '../schemas/grupo.schema';
import { GrupoService } from '../services/grupo.service';

@Controller('api/v1/grupos')
export class GrupoController {
  constructor(private readonly afiliadoService: GrupoService) {}

  // Get Grupos
  @Get()
  @UseGuards(PermissionGuard(Permission.ReadGrupos))
  async getGrupos(): Promise<Grupo[]> {
    return await this.afiliadoService.findAll();
  }

  // Get One Grupo
  @Get('/find/:id')
  @UseGuards(PermissionGuard(Permission.ReadOneGrupo))
  async getOneGrupo(@Param('id') id: string) {
    return await this.afiliadoService.findOne(id);
  }

  // Add Grupo
  @Post()
  @UseGuards(PermissionGuard(Permission.CreateGrupo))
  async createGrupo(@Res() res, @Body() createBody: Grupo): Promise<Grupo> {
    const created = await this.afiliadoService.create(createBody);
    return res.status(HttpStatus.OK).json({
      message: 'Grupo Successfully Created',
      created,
    });
  }

  // Update Grupo: /afiliados/605ab8372ed8db2ad4839d87
  @Put(':id')
  @UseGuards(PermissionGuard(Permission.EditGrupo))
  async updateGrupo(
    @Res() res,
    @Param('id') id: string,
    @Body() createBody: Grupo,
  ): Promise<Grupo> {
    const updated = await this.afiliadoService.update(id, createBody);
    return res.status(HttpStatus.OK).json({
      message: 'Grupo Successfully Updated',
      updated,
    });
  }

  // Delete Grupo: /afiliados/605ab8372ed8db2ad4839d87
  @Delete(':id')
  @UseGuards(PermissionGuard(Permission.DeleteGrupo))
  async deleteGrupo(@Param('id') id: string): Promise<Grupo> {
    return await this.afiliadoService.delete(id);
  }

  // Restore Grupo: /afiliados/restore/605ab8372ed8db2ad4839d87
  @Put('/restore/:id')
  @UseGuards(PermissionGuard(Permission.RestoreGrupo))
  async restoreGrupo(@Param('id') id: string): Promise<Grupo> {
    return await this.afiliadoService.restore(id);
  }
}
