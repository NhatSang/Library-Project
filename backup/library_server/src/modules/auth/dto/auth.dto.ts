import { IsEmail, IsString } from "class-validator";

export class AuthVerifyEmailDTO {
  @IsEmail()
  email: string;
  @IsString()
  verificationCode: string;
}
