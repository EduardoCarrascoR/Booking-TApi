import { Module, forwardRef } from '@nestjs/common';
import { SchedulesService } from './services/schedules.service';
import { SchedulesController } from './controllers/schedules.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulesSchema } from './classes/schedule.model';
import { UserService } from '../users/services/users.service';
import { UserModule } from '../users/user.module';
import { User } from '../users/classes/user.model';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: 'Schedule', schema: SchedulesSchema }
    ])
  ],
  providers: [SchedulesService],
  controllers: [SchedulesController]
})
export class SchedulesModule {}
