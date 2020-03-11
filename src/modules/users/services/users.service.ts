import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../classes/user.model';
import { Model } from 'mongoose';
import * as password from 'password-hash-and-salt';


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

    findOne(options: any): Promise<User> {
        return this.userModel.findOne(options)
    }

    findMedics(): Promise<User[]> {
        return this.userModel.find({ roles: {$elemMatch:{$eq:"PROFESSIONAL"}}});
    }

    updateUser(userId: string, changes: Partial<User>): Promise<User>{
        return this.userModel.findOneAndUpdate({ _id: userId }, changes, { new: true })
    }

    UpdateUserReserve(userId: string, changes: any): Promise<User>{
        return this.userModel.updateOne({ _id: userId }, changes)
    }

    deleteUser(userId: string): Promise<User>{
        return this.userModel.deleteOne({ _id: userId });
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
}
