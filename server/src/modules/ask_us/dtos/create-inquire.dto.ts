import { IsEnum, IsString } from 'class-validator';
import { Status } from '../enums';

export class CreateInquireDto {
  @IsString()
  question: string;

  @IsEnum(Status)
  status: Status;
}
