import { UserRoles } from '../constants/roles';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
