import { Module } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesController } from './subcategories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subcategory } from './subcategories.model';

@Module({
  imports: [SequelizeModule.forFeature([Subcategory])],
  providers: [SubcategoriesService],
  controllers: [SubcategoriesController],
})
export class SubcategoriesModule {}
