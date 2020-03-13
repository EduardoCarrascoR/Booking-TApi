import { Controller, Get, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { SchedulesService } from '../services/schedules.service';
import { Schedule, ScheduleChange } from '../classes/schedule.model';
import { ValidationPipe } from 'src/pipes/validation.pipes';

@Controller('schedules')
export class SchedulesController {

    constructor(
        private scheduleService: SchedulesService
    ) {}

    @Get(':MedicId')
    async findAllMedicsSchedules(@Param('MedicId') mId: string): Promise<Schedule[]> {
        console.log(`Searching all the doctor's schedules`);
        return this.scheduleService.findMedicsSchedules(mId)
    }
    @Get(':UserId')
    async findAllUsersReserves(@Param('UserId') uId: string): Promise<Schedule[]> {
        console.log(`Searching all the user's schedules`);
        return this.scheduleService.findUsersReserves(uId)
            .then((result) => {
                if(result){
                    return result
                } else {
                    throw new HttpException('reserve no found', HttpStatus.NOT_FOUND)
                }
            }).catch(() => {
                throw new HttpException('reserve no found', HttpStatus.NOT_FOUND)
            })
    }

    @Post('reserve')
    async createSchedule(@Body(ValidationPipe) schedule: ScheduleChange): Promise<ScheduleChange> {
        console.log('Creating new schedule')
        if(!schedule) throw Error("ERROR CON SCHEDULE")
        return this.scheduleService.addSchedule(schedule)
            .then((result) => {
                if(result){
                    return result
                } else {
                    throw new HttpException("the reservation was not created, because it already exists", HttpStatus.BAD_REQUEST)
                }
            }).catch(() => {
                throw new HttpException('the reservation was not created, because it already exists', HttpStatus.BAD_REQUEST)
        })
    }
}
