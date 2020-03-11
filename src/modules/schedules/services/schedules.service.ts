import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Schedule } from '../classes/schedule.model';
import { User } from 'src/modules/users/classes/user.model';
import { UserService } from 'src/modules/users/services/users.service';

@Injectable()
export class SchedulesService {

    constructor(
        @InjectModel('Schedule') private readonly scheduleModel: Model<Schedule>,/* 
        @InjectModel('User') private readonly userModel: Model<User>, */
        private readonly userService: UserService
    ) {}
    
    findAll(): Promise<Schedule[]> {
        return this.scheduleModel.find();
    }
      findUsersSchedules(uId: String): Promise<Schedule[]> {
        return this.scheduleModel.find({ mid: uId });
    }
    
      updateSchedule(scheduleId: string, changes: Partial<Schedule>): Promise<Schedule>{
        return this.scheduleModel.findOneAndUpdate({ _id: scheduleId }, changes, { new: true })
    }
    
      deleteSchedule(scheduleId: string): Promise<Schedule>{
        return this.scheduleModel.deleteOne({ _id: scheduleId });
    }
      //TODO: Buscar la manera correcta de hacer las peticiones 
    async addSchedule(schedule: Partial<Schedule>): Promise<Schedule>{
        let scheduleId
        //const medic = this.UserModel.findOne(schedule.mid)
        console.log(schedule.uid)
        const medic = await this.userService.findUserById(schedule.mid)
        console.log(medic)
        const newSchedule = this.scheduleModel(schedule, { speciality: medic.speciality,  medicName: medic.speciality })
        newSchedule.save();
        console.log(newSchedule)
        const beforeNewSchedule = this.scheduleModel({})
       
        return new Promise((resolve, reject) => {
            const res = newSchedule.toObject({ versionKey: false }).them(( schedule ) => { scheduleId = schedule._id });
            this.userService.findOneUpdateUser(newSchedule.uid,{ reserves: { $elemMatch:{ $eq: scheduleId }}}).catch((err) => {
                if(err){
                    reject(new Error('Error en agregar reserva en User!'));
                }
            })
            this.userService.findOneUpdateUser(newSchedule.mid,{ schedule: { $elemMatch:{ $eq: scheduleId }}}).catch((err) => {
                if(err){
                    reject(new Error('Error en agregar reserva en Medic!'));
                }
            })
            console.log('Updated')
            resolve(res) 
                
            
        })

    }
}
