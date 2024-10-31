import { IsNumber, IsString } from "class-validator";

export class HistoryCreateDTO {
  @IsString()
  book: string;
  @IsString()
  userId: string;
  @IsString()
  chapter: string;
  @IsNumber()
  page: number;
}
