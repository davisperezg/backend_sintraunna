import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { ModuleModule } from './module/module.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ResourceModule } from './resource/resource.module';
import { AuthModule } from './auth/auth.module';
import { ResourcesRolesModule } from './resources-roles/resources-roles.module';
import { ResourcesUsersModule } from './resources-users/resources-users.module';
import { ServicesUsersModule } from './services-users/services-users.module';
import { EgresoModule } from './egreso/egreso.module';
import { IngresoModule } from './ingreso/ingreso.module';
import { ConfigModule } from '@nestjs/config';
import { AfiliadoModule } from './afiliado/afiliado.module';
import { PagoModule } from './pago/pago.module';
import { GrupoModule } from './grupo/grupo.module';
import { ConsultaModule } from './consulta/consulta.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(process.env.URL_DATABASE, {
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    UserModule,
    RoleModule,
    ResourceModule,
    MenuModule,
    ModuleModule,
    AuthModule,
    ResourcesRolesModule,
    ResourcesUsersModule,
    ServicesUsersModule,
    EgresoModule,
    IngresoModule,
    AfiliadoModule,
    PagoModule,
    GrupoModule,
    ConsultaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
