import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Subcategory } from '../subcategories/subcategories.model';

type ProductCreationAttr = {
  name: string;
  price: number;
  calories: number;
  weight: number;
  protein: number;
  fats: number;
  carbohydrates: number;
  structure: string;
  producer: string;
  country: string;
  storageConditions: string;
  expirationDate: string;
  images: string[];
};

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор продукта',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Картофель фермерский',
    description: 'Название товара',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 5000,
    description: 'Цена товара',
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @ApiProperty({
    example: 124,
    description: 'Калории на 100 грамм продукта',
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  calories: number;

  @ApiProperty({
    example: 1200,
    description: 'Вес продукта в граммах',
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  weight: number;

  @ApiProperty({
    example: 14.5,
    description: 'Белки на 100 грамм продукта',
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  protein: number;

  @ApiProperty({
    example: 2.5,
    description: 'Жиры на 100 грамм продукта',
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  fats: number;

  @ApiProperty({
    example: 25.5,
    description: 'Углеводы на 100 грамм продукта',
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  carbohydrates: number;

  @ApiProperty({
    example: 'Мясо птицы, мука, соль...',
    description: 'Состав товара',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  structure: string;

  @ApiProperty({
    example: 'ООО "МясоТорг"',
    description: 'Производитель',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  producer: string;

  @ApiProperty({
    example: 'Россия',
    description: 'Страна производства',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @ApiProperty({
    example: 'В сухом месте, температура от +5 до +25 градусов',
    description: 'Условия хранения',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  storageConditions: string;

  @ApiProperty({
    example: '24 часа',
    description: 'Срок годности',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  expirationDate: string;

  @ApiProperty({
    example: '["someimageurl.png, someimageurl2.png"]',
    description: 'Массив фотографий товара',
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  images: string[];

  @ForeignKey(() => Subcategory)
  @Column
  subcategoryId: number;

  @BelongsTo(() => Subcategory)
  subcategory: Subcategory;
}
