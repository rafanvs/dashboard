import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTelegramBotDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
