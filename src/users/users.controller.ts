import { Body, Controller, Post, Get, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private UserService: UsersService){}

    @ApiOperation({summary: 'Creating a user'})
    @ApiResponse({status: 200, type:User})
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.UserService.createUser(userDto);
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type:[User]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    findAll(){
        return this.UserService.getAllUsers();
    }

    @ApiOperation({summary: 'Give out the role'})
    @ApiResponse({status: 200, type:[User]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
        return this.UserService.addRole(dto);
    }

    @ApiOperation({summary: 'Ban users'})
    @ApiResponse({status: 200, type:[User]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto){
        return this.UserService.ban(dto);
    }
}
