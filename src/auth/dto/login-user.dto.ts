import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
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
