import { ModulePermission } from '../enum/module.enum';
import { RolePermission } from '../enum/role.enum';
import { UserPermission } from '../enum/user.enum';
import { ResourcePermission } from '../enum/resource.enum';
import { MenuPermission } from '../enum/menu.enum';
import { EgresoPermission } from '../enum/egreso.enum';
import { IngresoPermission } from '../enum/ingreso.enum';
import { AfiliadoPermission } from '../enum/afiliado.enum';
import { GrupoPermission } from '../enum/grupo.enum';
import { PagoPermission } from '../enum/pago.enum';

const Permission = {
  ...UserPermission,
  ...RolePermission,
  ...ModulePermission,
  ...ResourcePermission,
  ...MenuPermission,
  ...EgresoPermission,
  ...IngresoPermission,
  ...AfiliadoPermission,
  ...GrupoPermission,
  ...PagoPermission,
};

type Permission =
  | UserPermission
  | RolePermission
  | ModulePermission
  | ResourcePermission
  | MenuPermission
  | EgresoPermission
  | IngresoPermission
  | AfiliadoPermission
  | GrupoPermission
  | PagoPermission;

export default Permission;
