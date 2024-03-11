import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
    @IsString()
    firstName: string

    @IsString()
    username: string

    @IsString()
    email: string
  
    @IsString()
    password: string
}