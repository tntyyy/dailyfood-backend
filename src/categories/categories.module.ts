import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { Subcategory } from '../subcategories/subcategories.model';
import { SubcategoriesModule } from '../subcategories/subcategories.module';
import { Product } from '../product/product.model';
import { FilesService } from '../files/files.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Category, Subcategory, Product]),
    SubcategoriesModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, FilesService],
})
export class CategoriesModule {}
