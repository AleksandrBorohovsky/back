import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto { 
    @ApiProperty({example:'aleksandrborohovskij@gmail.com', description:'user email'})//DTO - простой объект, который не содержит в себе никакой логики и имеет только поля
    @IsString({message: 'Must be a string'})                                           //Эти объекты предназачены для обмена данными между какими-то подсистемами (например клиент <-> cервер или сервер <-> сервер)
    @IsEmail({}, {message: 'Incorrect email'})
    readonly email: string;                                                               
    @ApiProperty({example:'1425', description:'user password'})
    @IsString({message: 'Must be a string'})
    @Length(4, 16, {message: 'Not less than 4 and more than 16'})
    readonly password: string;
}