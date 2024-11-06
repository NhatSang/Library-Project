import { IsNumber, IsString } from "class-validator";

export class HistoryCreateDTO {
  @IsString()
  book: string;
  userId: string;
  @IsString()
  chapter: string;
  @IsNumber()
  page: number;
}
