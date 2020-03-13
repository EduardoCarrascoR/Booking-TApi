import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Schedule } from '../classes/schedule.model';
import { User } from 'src/modules/users/classes/user.model';
import { UserService } from 'src/modules/users/services/users.service';
import { async } from 'rxjs/internal/scheduler/async';

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
    findMedicsSchedules(uId: String): Promise<Schedule[]> {
        return this.scheduleModel.find({ mid: uId });
    }
    findUsersReserves(uId: String): Promise<Schedule[]> {
        return this.scheduleModel.find({ uid: uId });
    }
    
      updateSchedule(scheduleId: string, changes: Partial<Schedule>): Promise<Schedule>{
        return this.scheduleModel.findOneAndUpdate({ _id: scheduleId }, changes, { new: true })
    }
    
      deleteSchedule(scheduleId: string): Promise<Schedule>{
        return this.scheduleModel.deleteOne({ _id: scheduleId });
    }

    async addSchedule(schedule: Partial<Schedule>): Promise<Schedule>{
        const medic = await this.userService.findUserById(schedule.mid)
        console.log(schedule)
        const Schedule = await this.scheduleModel.findOne({mid: schedule.mid, uid: schedule.uid, hour: schedule.hour, date: schedule.date})
        console.log(Schedule)

        if( Schedule !== null) {
          console.log("ERROR EN RESERVA, ESTA YA EXISTE")
        }else if(Schedule === null) {

          schedule.speciality = medic[0].speciality
          schedule.medicName = medic[0].displayName
           
          const newSchedule = this.scheduleModel(schedule)
          newSchedule.save()
          const MedicSchedule = await this.userService.UserReserveAdd(newSchedule.mid, {$push:{schedules:newSchedule._id}})
          console.log( MedicSchedule)
          const UserSchedule = await this.userService.UserReserveAdd(newSchedule.uid, {$push:{reserves:newSchedule._id}})
          console.log( UserSchedule)
          console.log(newSchedule.uid)
          
       
          return new Promise((resolve, reject) => {
            const res = newSchedule.toObject({ versionKey: false });
            console.log('Updated')
            resolve(res) 
                
            
          })
        }
        

    }
}
