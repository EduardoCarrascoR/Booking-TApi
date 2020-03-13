import { Controller, Get, UseGuards, Put, BadRequestException, Param, Body, Post, Delete } from '@nestjs/common';
import { User } from '../classes/user.model';
import { AdminGuard } from 'src/guards/admin.guard';
import { UserService } from '../services/users.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Controller('user')
export class UsersController {

    constructor(
        private readonly usersService: UserService
    ) { }
    
    @Get('/all')
    @UseGuards(AdminGuard)
    async findAllUsers(): Promise<User[]> {
        console.log('Searching all users');
        
        return this.usersService.findAll();
    }
    
    @Get('/medic') 
    async findAllMedics(): Promise<User[]> {
        console.log('Searching all medics');
    
        return this.usersService.findMedics();
    }
    @Get(':userId')
    @UseGuards(AdminGuard)
    async findOneUser(@Param('userId')  userId: string): Promise<User> {
        console.log('Searching all users');
    
        return this.usersService.findUserById(userId);
    }

    @Get('medic/:userId')
    async findOneMedic(@Param('userId')  userId: string): Promise<User> {
        console.log('Searching all users');
    
        return this.usersService.findMedicById(userId);
    }
    @Put(':userId')
    @UseGuards(AuthenticationGuard)
    async updateUser(@Param('userId') userId: string, @Body() changes: User): Promise<User> {
        console.log('Updating user');
    
        if (changes._id) {
            throw new BadRequestException("Can't update user id");
        }
    
        return this.usersService.updateUser(userId, changes)

    }

    @Delete(':userId')
    @UseGuards(AdminGuard)
    async deleteUser(@Param('userId') userId: string) {
        console.log('Deleting user');
        return this.usersService.deleteUser(userId);
    }
    

    @Post('signup')
    async createUser(@Body() user: Partial<User>): Promise<User> {
        console.log('Creating new user');
        return this.usersService.addUser(user);
    }
}
