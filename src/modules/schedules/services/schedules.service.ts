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
      //TODO: Buscar la manera correcta de guardar datos de schedule
    async addSchedule(schedule: Partial<Schedule>): Promise<Schedule>{
        let scheduleId
        //const medic = this.UserModel.findOne(schedule.mid)
        
        const medic = await this.userService.findUserById(schedule.mid)
 
        schedule.speciality = medic[0].speciality
        schedule.medicName = medic[0].displayName
         
        const newSchedule = this.scheduleModel(schedule)
        newSchedule.save();
        console.log(newSchedule.uid)
        const MedicSchedule = await this.userService.UpdateUserReserve(newSchedule.mid, {$push:{schedules:newSchedule._id}})
        console.log( MedicSchedule)
        const UserSchedule = await this.userService.UpdateUserReserve(newSchedule.uid, {$push:{reserves:newSchedule._id}})
        console.log( UserSchedule)
       
        return new Promise((resolve, reject) => {
            const res = newSchedule.toObject({ versionKey: false });
            console.log('Updated')
            resolve(res) 
                
            
        })

    }
}
