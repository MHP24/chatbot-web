import { IsString } from 'class-validator';

export class GetFileDto {
  @IsString()
  directory: string;

  @IsString()
  file: string;
}
