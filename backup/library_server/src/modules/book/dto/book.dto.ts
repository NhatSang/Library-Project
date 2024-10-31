import {
  Exclude,
  Expose,
  plainToInstance,
  Transform,
  Type,
} from "class-transformer";

export class BookTotalViewDTO {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;
  @Expose()
  title: string;
  @Exclude()
  author: string;
  @Exclude()
  pdfLink: string;
  @Exclude()
  genre: string;
  @Exclude()
  image: string;
  @Exclude()
  pageNumber: number;
  @Exclude()
  majors: string;
  @Exclude()
  summary: string;
  @Expose()
  totalViews: number;

  static transformBook(params: any | any[]) {
    return plainToInstance(BookTotalViewDTO, params, {
      excludeExtraneousValues: true,
    });
  }
}

export class BookAvgRatingDTO {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;
  @Expose()
  title: string;
  @Expose()
  avgRating: number;

  static transformBook(params: any | any[]) {
    return plainToInstance(BookAvgRatingDTO, params, {
      excludeExtraneousValues: true,
    });
  }
}
class Content {
  page: number;
  content: string;

  constructor(page: number, content: string) {
    this.page = page;
    this.content = content;
  }
}
export class BookResponseDTO {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;
  @Expose()
  title: string;
  @Expose()
  author: string;
  @Expose()
  pdfLink: string;
  @Expose()
  @Transform(({ obj }) => obj.genre?.name || null)
  genre: string;
  @Expose()
  image: string;
  @Expose()
  pageNumber: number;
  @Expose()
  @Transform(({ obj }) => obj.majors?.name || null)
  majors: string | null;
  @Type(() => Content)
  contents: Content[];
  @Expose()
  summary: string;
  @Expose()
  yob: string;
  @Expose()
  publisher: string;

  static transformBook(params: any | any[]) {
    return plainToInstance(BookResponseDTO, params, {
      excludeExtraneousValues: true,
    });
  }
}
