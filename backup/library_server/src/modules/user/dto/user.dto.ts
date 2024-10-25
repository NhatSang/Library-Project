import { Expose, plainToInstance, Transform } from "class-transformer";
import { IsDate, IsEmail, IsOptional, IsString } from "class-validator";

export class UserRegisterDTO {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  gender: string;
  @IsOptional()
  @IsDate()
  dob: Date;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  repassword: String;
  @IsOptional()
  @IsString()
  majors: string;
  @IsOptional()
  @IsString()
  code: string;
}

export class UserResponseDTO {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;
  @Expose()
  name: string;
  @Expose()
  gender: string;
  @Expose()
  email: string;
  @Expose()
  @Transform(({ obj }) => obj.dob?.toString())
  dob: string;
  @Expose()
  status: string;
  @Expose()
  code: string;
  static transformUser(params: any | any[]) {
    return plainToInstance(UserResponseDTO, params, {
      excludeExtraneousValues: true,
    });
  }
}
