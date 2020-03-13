import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as password from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Controller('login')
export class AuthController {

  constructor(
    @InjectModel('User')
    private userModel: Model
  ) {}

  @Post()
  async login(
    @Body('email')email: string,
    @Body('password')plainTextPassword: string
  ){
    console.log('Login attempt, user:', email);

    const user = await this.userModel.findOne({ email });

    if (!user){
      console.log('User does not exist on the database');
      
      throw new UnauthorizedException();
    }

    return new Promise((resolve, reject) => {
      password(plainTextPassword).verifyAgainst(
        user.password,
        (err, verified) => {
          if (!verified) {
            reject(new UnauthorizedException());
          }else {
            console.log('Login success!');
          }

          const authJwtToken = jwt.sign({ email, roles: user.roles }, process.env.JWT_SECRET);

          resolve({ token: authJwtToken });
        }
      )

    });


  }

}