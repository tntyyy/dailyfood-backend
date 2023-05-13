import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Николай',
    description: 'Имя пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({
    example: 'email@mail.ru',
    description: 'Электронная почта',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный e-mail' })
  readonly email: string;

  @ApiProperty({
    example: 'qwerty123',
    description: 'Пароль пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  @Length(6, 20, { message: 'Пароль должен содержать более 6 символов' })
  readonly password: string;
}
