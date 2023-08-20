import { Role } from '@prisma/client';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from '@auth/guards/roles.guard';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => applyDecorators(UseGuards(RolesGuard), SetMetadata(ROLES_KEY, roles));
