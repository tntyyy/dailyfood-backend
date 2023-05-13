import { UserRoles } from '../../constants/roles';

export class AddRoleDto {
  readonly value: UserRoles;
  readonly userId: string;
}
