import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { SchedulesService } from '../services/schedules.service';
import { Schedule } from '../classes/schedule.model';

@Controller('schedules')
export class SchedulesController {

    constructor(
        private scheduleService: SchedulesService
    ) {}

    @Get(':UserId')
    async findAllUsersSchedules(@Param('UserId') uId: string): Promise<Schedule[]> {
        console.log(`Searching all the doctor's schedules`);
        return this.scheduleService.findUsersSchedules(uId)
    }

    @Post('reserve')
    async createSchedule(@Body() schedule: Partial<Schedule>): Promise<Schedule> {
        console.log('Creating new schedule')
        return this.scheduleService.addSchedule(schedule)
    }
}
