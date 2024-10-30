import { IsNumber, IsString } from "class-validator";

export class HistoryCreateDTO {
  @IsString()
  book: string;
  @IsString()
  user: string;
  @IsString()
  chapter: string;
  @IsNumber()
  page: number;
}
