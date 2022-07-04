import { Module } from '@nestjs/common';
import { GrupoService } from './services/grupo.service';
import { GrupoController } from './controllers/grupo.controller';
import { Grupo, GrupoSchema } from './schemas/grupo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grupo.name, schema: GrupoSchema }]),
  ],
  providers: [GrupoService],
  controllers: [GrupoController],
})
export class GrupoModule {}
