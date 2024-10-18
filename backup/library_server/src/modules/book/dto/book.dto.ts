import { Exclude, Expose, plainToInstance, Transform } from "class-transformer";

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