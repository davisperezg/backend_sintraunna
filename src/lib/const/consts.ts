export const jwtConstants = {
  secret: process.env.TOKEN || 'TOKEN_DEV',
};

export const resourcesByDefault = [
  // MODULES
  {
    name: 'Leer Modulos', //add
    key: 'canRead_modulesList',
    description: 'Te permite leer todos los modulos en su tabla.',
    status: true,
  },
  {
    name: 'Leer Modulos en otras entidades', //add
    key: 'canRead_modulesItem',
    description: 'Te permite leer los modulos en la entidad usuario o roles.',
    status: true,
  },
  {
    name: 'Obtener informacion por modulo', //add
    key: 'canGetModule',
    description:
      'Te permite obtener la data de los modulos asignados al usuario al logearte y al editar un modulo.',
    status: true,
  },
  {
    name: 'Crear Modulos', //add
    key: 'canCreate_modules',
    description: 'Te permite crear un modulo.',
    status: true,
  },
  {
    name: 'Editar Modulos', //add
    key: 'canEdit_modules',
    description: 'Te permite editar un modulo.',
    status: true,
  },
  {
    name: 'Eliminar Modulos', //add
    key: 'canDelete_modules',
    description:
      'Te permite desactivar un modulo esto afecta a todos los usuarios que tienen el modulo asignado.',
    status: true,
  },
  {
    name: 'Restaurar Modulos', //add
    key: 'canRestore_modules',
    description: 'Te permite restaurar el modulo desactivado.',
    status: true,
  },
  // ROLES
  {
    name: 'Crear Roles', //add
    key: 'canCreate_roles',
    description: 'Te permite crear un rol.',
    status: true,
  },
  {
    name: 'Editar Roles', //add
    key: 'canEdit_roles',
    description: 'Te permite editar un rol.',
    status: true,
  },
  {
    name: 'Eliminar Roles', //add
    key: 'canDelete_roles',
    description:
      'Te permite desactivar un rol esto afectara al registrar un nuevo usuario o al editar un usuario con el mismo rol desactivado.',
    status: true,
  },
  {
    name: 'Leer Roles', //add
    key: 'canRead_roles',
    description: 'Te permite leer todos los roles en su tabla.',
    status: true,
  },
  {
    name: 'Obtener informacion por rol', //add
    key: 'canGetRole',
    description: 'Te permite obtener la data de un rol.',
    status: true,
  },
  {
    name: 'Imprimir Roles', //add
    key: 'canPrint_roles',
    description: 'Te permite imprimir la tabla roles.',
    status: true,
  },
  {
    name: 'Restaurar Roles', //add
    key: 'canRestore_roles',
    description: 'Te permite resturar un rol desactivado.',
    status: true,
  },
  // USERS
  {
    name: 'Leer Usuarios', //add
    key: 'canRead_users',
    description: 'Te permite leer usuarios en su tabla.',
    status: true,
  },
  {
    name: 'Obtener informacion por usuario', //add
    key: 'canGetUser',
    description: 'Te permite obtener data de un usuario.',
    status: true,
  },
  {
    name: 'Crear Usuarios', //add
    key: 'canCreate_users',
    description: 'Te permite crear un usuario.',
    status: true,
  },
  {
    name: 'Editar Usuarios', //add
    key: 'canEdit_users',
    description: 'Te permite editar un usuario.',
    status: true,
  },
  {
    name: 'Eliminar Usuarios', //add
    key: 'canDelete_users',
    description: 'Te permite desactivar un usuario esto afectara al loguearse.',
    status: true,
  },
  {
    name: 'Cambiar contraseña de usuarios', //add
    key: 'canChangePassword_users',
    description: 'Te permite cambiar la password del usuario.',
    status: true,
  },
  {
    name: 'Restaurar Usuarios', //add
    key: 'canRestore_users',
    description: 'Te permite restaurar un usuario desactivado.',
    status: true,
  },
  // RESOURCES
  {
    name: 'Crear Permiso(DESARROLLADOR)', //add
    key: 'canCreate_Resource',
    description:
      'Te permite crear un permiso(Se recomienda solo para desarrolladores).',
    status: true,
  },
  {
    name: 'Leer Permisos(DESARROLLADOR)', //add
    key: 'canRead_ResourcesList',
    description:
      'Te permite leer todos los permisos de su tabla(Se recomienda solo para desarrolladores).',
    status: true,
  },
  {
    name: 'Leer Permisos en otras entidades', //add
    key: 'canRead_ResourcesItem',
    description: 'Te permite leer los permisos en las entidades usuario o rol',
    status: true,
  },
  {
    name: 'Editar Permisos(DESARROLLADOR)', //add
    key: 'canEdit_Resource',
    description:
      'Te permite editar un permiso(Se recomienda solo para desarrolladores).',
    status: true,
  },
  {
    name: 'Obtener informacion por permiso(DESARROLLADOR)', //add
    key: 'canGetResource',
    description:
      'Te permite obtener la data por permiso(Se recomienda solo para desarrolladores).',
    status: true,
  },
  // RR
  {
    name: 'Leer los recursos por rol en la entidad rol', //add
    key: 'canRead_ResourcebyRol',
    description:
      'Te permite leer los recursos o permisos en la entidad solo rol.',
    status: true,
  },
  {
    name: 'Crear y/o actualizar recursos por roles', //add
    key: 'canCreate_ResourceR',
    description:
      'Te permite crear y/o actualizar los recrusos o permisos en la entidad solo rol.',
    status: true,
  },
  // MENU
  {
    name: 'Leer Menus', //add
    key: 'canRead_menus',
    description: 'Te permite leer menus en la entidad modulos.',
    status: true,
  },
  {
    name: 'Crear Menu(DESARROLLADOR)', //add
    key: 'canCreate_menus',
    description:
      'Te permite crear un menu(Se recomienda solo para desarrolladores).',
    status: true,
  },
  {
    name: 'Editar Menu(DESARROLLADOR)', //add
    key: 'canEdit_menus',
    description:
      'Te permite crear un menu(Se recomienda solo para desarrolladores).',
    status: true,
  },
  {
    name: 'Eliminar Menu(DESARROLLADOR)', //add
    key: 'canDelete_menus',
    description:
      'Te permite crear un menu(Se recomienda solo para desarrolladores).',
    status: true,
  },
  {
    name: 'Restaurar Menu(DESARROLLADOR)', //add
    key: 'canRestore_menus',
    description:
      'Te permite crear un menu(Se recomienda solo para desarrolladores).',
    status: true,
  },
  // RU
  {
    name: 'Leer los recursos por usuario en otras entidades', //add
    key: 'canRead_ResourcebyUser',
    description:
      'Te permite leer los recursos o permisos por usuario solo en la entidad usuario.',
    status: true,
  },
  {
    name: 'Crear y/o actualizar recursos por usuario', //add
    key: 'canCreate_ResourceU',
    description:
      'Te permite crear y/o actualizar los permisos o recusos por usuario solo en la entidad usuario.',
    status: true,
  },
  // SU
  {
    name: 'Leer los modulos o servicios por usuario en otras entidades', //add
    key: 'canRead_ServicebyUser',
    description:
      'Te permite leer los modulos o servicios por usuario esto afecta al usuario al loguearse y en la entidad usuario',
    status: true,
  },
  {
    name: 'Crear y/o actualizar modulos o servicios por usuario', //add
    key: 'canCreate_ServiceU',
    description:
      'Te permite crear y/o actualizar los modulos o servicios por usuario solo en la entidad usuario.',
    status: true,
  },
];

export const resourcesAdds = [
  //GRUPO
  {
    name: 'Leer Grupos', //add
    key: 'canRead_grupos',
    description: 'Te permite listar todos los grupos.',
    status: true,
  },
  {
    name: 'Obtener la informacion X grupo', //add
    key: 'canReadOne_grupos',
    description: 'Te permite leer la informacion X cada grupo.',
    status: true,
  },
  {
    name: 'Crear Grupo', //add
    key: 'canCreate_grupos',
    description: 'Te permite crear un grupo.',
    status: true,
  },
  {
    name: 'Editar Grupo', //add
    key: 'canEdit_grupos',
    description: 'Te permite editar un grupo.',
    status: true,
  },
  {
    name: 'Eliminar Grupo', //add
    key: 'canDelete_grupos',
    description: 'Te permite eliminar un grupo.',
    status: true,
  },
  {
    name: 'Restaurar Grupo', //add
    key: 'canRestore_grupos',
    description: 'Te permite restaurar un grupo.',
    status: true,
  },
  //PAGOS
  {
    name: 'Leer Pagos', //add
    key: 'canRead_pagos',
    description: 'Te permite listar todos los pagos.',
    status: true,
  },
  {
    name: 'Obtener la informacion X pago', //add
    key: 'canReadOne_pagos',
    description: 'Te permite leer la informacion X cada pago.',
    status: true,
  },
  {
    name: 'Crear Pago', //add
    key: 'canCreate_pagos',
    description: 'Te permite crear un pago.',
    status: true,
  },
  {
    name: 'Editar Pago', //add
    key: 'canEdit_pagos',
    description: 'Te permite editar un pago.',
    status: true,
  },
  {
    name: 'Eliminar Pago', //add
    key: 'canDelete_pagos',
    description: 'Te permite eliminar un pago.',
    status: true,
  },
  {
    name: 'Restaurar Pago', //add
    key: 'canRestore_pagos',
    description: 'Te permite restaurar un pago.',
    status: true,
  },
  //Afiliado
  {
    name: 'Leer Afiliados', //add
    key: 'canRead_afiliados',
    description: 'Te permite listar todos los afiliados.',
    status: true,
  },
  {
    name: 'Obtener la informacion X afiliado', //add
    key: 'canReadOne_afiliados',
    description: 'Te permite leer la informacion X cada afiliado.',
    status: true,
  },
  {
    name: 'Crear Afiliado', //add
    key: 'canCreate_afiliados',
    description: 'Te permite crear un afiliado.',
    status: true,
  },
  {
    name: 'Editar Afiliado', //add
    key: 'canEdit_afiliados',
    description: 'Te permite editar un afiliado.',
    status: true,
  },
  {
    name: 'Eliminar Afiliado', //add
    key: 'canDelete_afiliados',
    description: 'Te permite eliminar un afiliado.',
    status: true,
  },
  {
    name: 'Restaurar Afiliado', //add
    key: 'canRestore_afiliados',
    description: 'Te permite restaurar un afiliado.',
    status: true,
  },
  //EGREESO
  {
    name: 'Leer Egresos', //add
    key: 'canRead_egresos',
    description: 'Te permite listar todos los egresos.',
    status: true,
  },
  {
    name: 'Obtener la informacion X egresos', //add
    key: 'canReadOne_egresos',
    description: 'Te permite leer la informacion X cada egresos.',
    status: true,
  },
  {
    name: 'Crear Egresos', //add
    key: 'canCreate_egresos',
    description: 'Te permite crear un egresos.',
    status: true,
  },
  {
    name: 'Editar Egresos', //add
    key: 'canEdit_egresos',
    description: 'Te permite editar un egresos.',
    status: true,
  },
  {
    name: 'Eliminar Egresos', //add
    key: 'canDelete_egresos',
    description: 'Te permite eliminar un egresos.',
    status: true,
  },
  {
    name: 'Restaurar Egresos', //add
    key: 'canRestore_egresos',
    description: 'Te permite restaurar un egresos.',
    status: true,
  },
];
