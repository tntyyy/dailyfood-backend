import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Subcategory } from '../subcategories/subcategories.model';

type CategoryCreationAttr = {
  name: string;
  imageUrl: string;
};

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор категории',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Готовая еда',
    description: 'Название категории',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'https://dailyfood.ru/images/someimage.png',
    description: 'Ссылка на изображение',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imageUrl: string;

  @HasMany(() => Subcategory)
  subcategories: Subcategory[];
}
