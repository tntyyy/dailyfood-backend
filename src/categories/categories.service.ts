import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { Subcategory } from '../subcategories/subcategories.model';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private readonly categoryRepository: typeof Category,
    @InjectModel(Subcategory)
    private readonly subcategoryRepository: typeof Subcategory,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    const { name, imageUrl } = dto;
    return await this.categoryRepository.create({ name, imageUrl });
  }

  async addSubcategoryToCategory(
    categoryId: number,
    createSubcategoryDto: CreateSubcategoryDto,
  ) {
    const { name } = createSubcategoryDto;
    const subcategory = await this.subcategoryRepository.create({ name });
    const category = await this.categoryRepository.findByPk(categoryId);
    await category.$add('subcategories', subcategory);
    subcategory.categoryId = categoryId;
    return subcategory;
  }

  async findAll() {
    return await this.categoryRepository.findAll({ include: { all: true } });
  }
}
