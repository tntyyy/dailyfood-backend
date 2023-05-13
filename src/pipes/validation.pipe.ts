import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

export class ValidationPipe implements PipeTransform {
  async transform(
    value: Promise<any>,
    metadata: ArgumentMetadata,
  ): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      let messages = errors.map((error) => {
        return `${Object.values(error.constraints).join(', ')}`;
      });

      throw new ValidationException(messages);
    }
  }
}
