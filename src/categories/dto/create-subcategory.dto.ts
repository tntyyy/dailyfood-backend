import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateSubcategoryDto {
  @ApiProperty({
    example: 'Суп',
    description: 'Название название подкатегории',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({
    example: '23',
    description: 'ID родительской категории',
  })
  @IsNumber()
  readonly categoryId: number;
}
