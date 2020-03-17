import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserClient } from '../classes/user.model';
import { Model } from 'mongoose';
import * as password from 'password-hash-and-salt';
import { response } from 'express';
import { rejects } from 'assert';


@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) {
        
    }
    findAll(): Promise<User[]> {
        return this.userModel.find();
    }
    
    findUserById(userId: string): Promise<User> {
        return this.userModel.find({_id: userId})
    }

    findMedicById(userId: string): Promise<User> {
        let value
        const medic = this.userModel.findOne({_id: userId, roles: {$elemMatch:{$eq:"PROFESSIONAL"}}}).then((reserva) => {
            if(!reserva){
              console.log('medico no encontrado')
              throw new HttpException("Medic not found", HttpStatus.BAD_REQUEST)
            } else {
              value = true
              return reserva
            }
          }
        );
        if( value !== false) {
          return new Promise((resolve, reject) => {
            console.log('Medic found')
            resolve(medic) 
          })
        }
    }

    findOne(options: any): Promise<User> {
        return this.userModel.findOne(options)
    }

    findMedics(): Promise<User[]> {
        return this.userModel.find({ roles: {$elemMatch:{$eq:"PROFESSIONAL"}}});
    }

    updateUser(userId: string, changes: Partial<User>): Promise<User>{
        return this.userModel.findOneAndUpdate({ _id: userId }, changes, { new: true })
    }
    
    deleteUser(userId: string): Promise<User>{
        return this.userModel.deleteOne({ _id: userId });
    }
    
    UserReserveAdd(userId: string, changes: any): Promise<User>{
        return this.userModel.updateOne({ _id: userId }, changes)
    }

    async addUser(user: Partial<User>): Promise<User>{
      let newUser
  
      return new Promise((resolve, reject) => {
        password(user.password).hash((err, hash) => {
          if(err){
            reject(new Error('Something went wrong!'));
          }
          user.password = hash;
          newUser = this.userModel(user);
          newUser.save();
          resolve(newUser.toObject({ versionKey: false }));
        });
      });
    }

    async addUserClient(user: UserClient): Promise<User> {
      let newUser

      return new Promise((resolve, reject) => {
        password(user.password).hash((err, hash) => {
          if(err){
            reject( new Error('Something went wrong!'))
          }
          user.password = hash;
          newUser = this.userModel(user);
          newUser.save();
          resolve(newUser.toObject({ versionKey: false }));
        });
      })
  
    }


}
