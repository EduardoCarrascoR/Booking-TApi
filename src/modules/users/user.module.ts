import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './classes/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UsersSchema }
    ])
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
