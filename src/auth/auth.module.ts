import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from './auth.controller';
import { UsersSchema } from "../modules/users/classes/user.model";

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'User', schema: UsersSchema }
    ])
  ],
  controllers: [
    AuthController
  ]
})
  
export class AuthModule {}
