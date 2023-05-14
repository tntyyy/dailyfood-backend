import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Готовая еда',
    description: 'Название категории',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({
    example: 'Готовая еда',
    description: 'Название категории',
  })
  @IsString({ message: 'Должно быть строкой' })
  imageUrl: string;
}
