import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Николай',
    description: 'Имя пользователя',
  })
  readonly name: string;

  @ApiProperty({
    example: 'email@mail.ru',
    description: 'Электронная почта',
  })
  readonly email: string;

  @ApiProperty({
    example: 'qwerty123',
    description: 'Пароль пользователя',
  })
  readonly password: string;
}
