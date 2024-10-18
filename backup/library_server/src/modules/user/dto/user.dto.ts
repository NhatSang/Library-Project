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
