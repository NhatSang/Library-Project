import { Expose, plainToInstance, Transform } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  matches,
} from "class-validator";

export class UserRegisterDTO {
  @IsString()
  name: string;
  @IsString()
  gender: string;
  @IsString()
  dob: Date;
  @Matches(
    /^[a-zA-Z0-9._%+-]+@student\.iuh\.edu\.vn$|^[a-zA-Z0-9._%+-]+@iuh\.edu\.vn$/,
    {
      message: "Email phải có định dạng @student.iuh.edu.vn hoặc @iuh.edu.vn",
    }
  )
  email: string;
  @IsString()
  password: string;
  @IsString()
  repassword: String;
  @IsString()
  majors: string;
  @IsString()
  code: string;
}

export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  gender: string;
  @IsOptional()
  @IsDate()
  dob: Date;
  @IsOptional()
  @IsString()
  majors: string;
  @IsOptional()
  @IsString()
  code: string;
  @IsOptional()
  @IsString()
  image: string;
}

export class UserVerifyEmailDTO {
  @Matches(
    /^[a-zA-Z0-9._%+-]+@student\.iuh\.edu\.vn$|^[a-zA-Z0-9._%+-]+@iuh\.edu\.vn$/,
    {
      message: "Email phải có định dạng @student.iuh.edu.vn hoặc @iuh.edu.vn",
    }
  )
  email: string;
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
  @Expose()
  @Transform(({ obj }) => obj.majors?.name || null)
  majors: string | null;
  @Expose()
  image: string;
  static transformUser(params: any | any[]) {
    return plainToInstance(UserResponseDTO, params, {
      excludeExtraneousValues: true,
    });
  }
}

export class UserLoginDTO {
  email: string;
  @IsString()
  password: string;
}
