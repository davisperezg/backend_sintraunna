import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Module, ModuleDocument } from '../schemas/module.schema';
import { Model } from 'mongoose';
import { MenuService } from 'src/menu/services/menu.service';
import { RoleDocument } from 'src/role/schemas/role.schema';
import { ServicesUsersService } from 'src/services-users/services/services-users.service';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ModuleService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Module.name) private moduleModel: Model<ModuleDocument>,
    @InjectModel('Role') private roleModel: Model<RoleDocument>,
    private readonly menuService: MenuService,
    @Inject(forwardRef(() => ServicesUsersService))
    private readonly suService: ServicesUsersService,
    private readonly userService: UserService,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.moduleModel.estimatedDocumentCount();
    if (count > 0) return;
    try {
      //ADD MODULES
      const getMenus = await this.menuService.findbyName([
        'Usuarios',
        'Roles',
        'Modulos',
        'Permisos',
      ]);

      const findMenus = getMenus.map((men) => men._id);

      const getMenusOthers = await this.menuService.findbyName([
        // 'Ingresos',
        'Egresos',
        'Afiliados',
        'Pagos',
        'Grupos',
      ]);

      const findMenusOthers = getMenusOthers.map((men) => men._id);

      await Promise.all([
        new this.moduleModel({
          name: 'Administración de sistema - PRINCIPAL',
          status: true,
          menu: findMenus,
          creator: null,
        }).save(),
        new this.moduleModel({
          name: 'Administracion',
          status: true,
          menu: findMenusOthers,
          creator: null,
        }).save(),
      ]);

      //ADD ROL
      const getModules = await this.findbyNames([
        'Administración de sistema - PRINCIPAL',
        'Administracion',
      ]);

      await Promise.all([
        new this.roleModel({
          name: 'OWNER',
          status: true,
          module: getModules,
          creator: null,
        }).save(),
      ]);

      const findOwner = await this.roleModel.findOne({ name: 'OWNER' });

      setTimeout(async () => {
        const findUser = await this.userService.findUserByIdRol(findOwner._id);
        const dataUser = {
          user: findUser._id,
          module: getModules,
        };

        await this.suService.create(dataUser);
      }, 15000);
    } catch (e) {
      throw new Error(`Error en ModuleService.onModuleInit ${e}`);
    }
  }

  //lista los modulos en roles
  async findAll(user: any): Promise<Module[] | any> {
    const { findUser } = user;
    let formated = [];
    if (findUser.role === 'OWNER') {
      const modules = await this.moduleModel
        .find({
          $or: [{ creator: findUser._id }, { creator: null }],
        })
        .populate({
          path: 'menu',
        });

      formated = modules
        .map((mod) => {
          if (mod.name === 'Administración de sistema - PRINCIPAL') {
            return {
              label: mod.name,
              value: mod._id,
              disabled: true,
            };
          } else {
            return {
              label: mod.name,
              value: mod._id,
              disabled: mod.status ? false : true,
            };
          }
        })
        .sort((a, b) => {
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
    } else {
      const modulesCreateds = await this.moduleModel
        .find({
          creator: findUser._id,
        })
        .populate({
          path: 'menu',
        });

      const myModulesAssigneds = await this.suService.findModulesByUser(
        findUser._id,
      );

      const modules = myModulesAssigneds.concat(modulesCreateds);

      formated = modules
        .map((mod) => ({
          label: mod.name,
          value: mod._id,
          disabled: mod.status ? false : true,
        }))
        .sort((a, b) => {
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
    }

    return formated;
  }

  //lista los modulos en el crud
  async listModules(user: any): Promise<Module[]> {
    const { findUser } = user;
    let modules = [];
    if (findUser.role === 'OWNER') {
      modules = await this.moduleModel
        .find({
          $or: [{ creator: null }, { creator: findUser._id }],
        })
        .populate({
          path: 'menu',
        });
    } else {
      const modulesByCreator = await this.moduleModel
        .find({
          creator: findUser._id,
        })
        .populate({
          path: 'menu',
        });

      modules = modulesByCreator;
    }

    const formated = modules.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    return formated;
  }

  async findOne(id: string): Promise<Module> {
    const module = await this.moduleModel
      .findOne({ _id: id, status: true })
      .populate({
        path: 'menu',
      });

    if (!module) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          type: 'BAD_REQUEST',
          message: 'El modulo no existe o está inactivo.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return module;
  }

  async findAllDeleted(): Promise<Module[]> {
    return await this.moduleModel.find({ status: false }).populate({
      path: 'menu',
    });
  }

  //Find modules by names
  async findbyNames(name: any[]): Promise<ModuleDocument[]> {
    const modules = await this.moduleModel.find({
      name: { $in: name },
      status: true,
    });

    if (!modules || modules.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          type: 'BAD_REQUEST',
          message: 'Hay un modulo inactivo o no existe.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return modules;
  }

  //Find modules by names
  async findbyName(name: string): Promise<ModuleDocument> {
    const module = await this.moduleModel.findOne({ name, status: true });

    if (!module) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          type: 'BAD_REQUEST',
          message: 'Hay un modulo inactivo o no existe.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return module;
  }

  //Add a single module
  async create(createMenu: Module, user: any): Promise<Module> {
    const { menu, name } = createMenu;
    const { findUser } = user;

    //Si name no existe
    if (!name) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          type: 'BAD_REQUEST',
          message: 'Completar el campo Nombre.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const findModule = await this.moduleModel.findOne({ name });

    //Si no hay modulos ingresados
    if (!menu || menu.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          type: 'BAD_REQUEST',
          message: 'El modulo debe tener al menos un menu.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (findModule) {
      //No se puede crear el elemento
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          type: 'UNIQUE',
          message: 'Este modulo ya existe. Por favor cambie de nombre.',
        },
        HttpStatus.CONFLICT,
      );
    }

    const getMenus = await this.menuService.findbyName(menu);
    const findMenus = getMenus.map((men) => men._id);

    const modifyData: Module = {
      ...createMenu,
      status: true,
      menu: findMenus,
      creator: findUser._id,
    };

    const createdModule = new this.moduleModel(modifyData);
    return createdModule.save();
  }

  //Delete a single module
  async delete(id: string): Promise<boolean> {
    let result = false;

    //el modulo as-principal no se puede eliminar
    const findModuleForbidden = await this.moduleModel.findById(id);
    if (findModuleForbidden.name === 'Administración de sistema - PRINCIPAL') {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          type: 'UNAUTHORIZED',
          message: 'Unauthorized Exception',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      await this.moduleModel.findByIdAndUpdate(id, { status: false });
      result = true;
    } catch (e) {
      throw new Error(`Error en ModuleService.delete ${e}`);
    }

    return result;
  }

  //Put a single module
  async update(id: string, bodyModule: Module, user: any): Promise<Module> {
    const { status, menu, name } = bodyModule;
    const { findUser } = user;

    if (status) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          type: 'UNAUTHORIZED',
          message: 'Unauthorized Exception',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    //Si no hay modulos ingresados
    if (!menu || menu.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          type: 'BAD_REQUEST',
          message: 'El modulo debe tener al menos un menu.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const findModulesForbidden = await this.findOne(id);
    if (
      findUser.role !== 'OWNER' &&
      String(findModulesForbidden.creator).toLowerCase() !==
        String(findUser._id).toLowerCase()
    ) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          type: 'UNAUTHORIZED',
          message: 'Unauthorized Exception',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const getMenus = await this.menuService.findbyName(menu);
    const findMenus = getMenus.map((men) => men._id);

    //const findModuleForbidden = await this.moduleModel.findById(id);
    //el modulo as-principal no se puede actualizar ni modificar sus menus
    if (
      (findModulesForbidden.name === 'Administración de sistema - PRINCIPAL' &&
        findModulesForbidden.name !== name) ||
      (findModulesForbidden.name === 'Administración de sistema - PRINCIPAL' &&
        findModulesForbidden.menu.length !== getMenus.length)
    ) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          type: 'UNAUTHORIZED',
          message: 'Unauthorized Exception',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const findModule = await this.moduleModel.findOne({ name });
    const getModuleById = await this.moduleModel.findById(id);

    //el nombre ASP no se puede modificar y no se permite el ingreso de un mismo nombre ya registrado
    if (
      (findModule && findModule.name !== getModuleById.name) ||
      (findModule &&
        String(name).trim() !== 'Administración de sistema - PRINCIPAL' &&
        getModuleById.name === 'Administración de sistema - PRINCIPAL')
    ) {
      //No se puede crear el elemento
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          type: 'UNIQUE',
          message: 'Este modulo ya existe. Por favor cambie de nombre.',
        },
        HttpStatus.CONFLICT,
      );
    }

    const modifyData: Module = {
      ...bodyModule,
      menu: findMenus,
    };

    return await this.moduleModel.findByIdAndUpdate(id, modifyData, {
      new: true,
    });
  }

  //Restore a single module
  async restore(id: string): Promise<boolean> {
    let result = false;

    try {
      await this.moduleModel.findByIdAndUpdate(id, { status: true });
      result = true;
    } catch (e) {
      throw new Error(`Error en ModuleService.restore ${e}`);
    }

    return result;
  }

  async findModulesIds(ids: string[]): Promise<ModuleDocument[]> {
    const modules = await this.moduleModel.find({
      _id: { $in: ids },
      status: true,
    });

    // if (validate || validate === undefined) {
    //   const modulesDesctivateds = modules.filter((mod) => mod.status === false);
    //   if (modulesDesctivateds.length > 0) {
    //     const showNames = modulesDesctivateds.map((mod) => mod.name);
    //     throw new HttpException(
    //       {
    //         status: HttpStatus.BAD_REQUEST,
    //         type: 'BAD_REQUEST',
    //         message: `Los modulos [${showNames}] no existen o esta inactivos.`,
    //       },
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   }
    // }

    return modules;
  }
}
