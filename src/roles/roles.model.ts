import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { UserRoles } from './user-roles.model';

type RoleCreationAttr = {};

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор роли',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Роль',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @ApiProperty({
    example: 'Администратор',
    description: 'Строковое описание роли',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
