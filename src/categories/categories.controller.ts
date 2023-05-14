import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../files/files.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly fileService: FilesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image = await this.fileService.saveFile(file);
    createCategoryDto.imageUrl = image;
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Post(':categoryId/subcategory')
  async addSubcategoryToCategory(
    @Param('categoryId') categoryId: number,
    @Body() createSubcategoryDto: CreateSubcategoryDto,
  ) {
    return await this.categoriesService.addSubcategoryToCategory(
      categoryId,
      createSubcategoryDto,
    );
  }
}
