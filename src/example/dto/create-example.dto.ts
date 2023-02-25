import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateExampleDto {
  @IsUUID()
  uuid: string;

  @IsString()
  name: string;

  @IsNumber()
  value: number;
}
