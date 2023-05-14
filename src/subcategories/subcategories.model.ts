import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../categories/categories.model';
import { Product } from '../product/product.model';

type SubcategoryCreationAttr = {
  name: string;
  categoryId: number;
};

@Table({ tableName: 'subcategory' })
export class Subcategory extends Model<Subcategory, SubcategoryCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор подкатегории',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Суп',
    description: 'Название подкатегории',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => Product)
  products: Product[];
}
