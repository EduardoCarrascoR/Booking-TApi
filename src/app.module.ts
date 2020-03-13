import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './modules/users/controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GetUserMiddleware } from './middlewares/get-user.middleware';
import { SchedulesController } from './modules/schedules/controllers/schedules.controller';

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    SchedulesModule,
    MongooseModule.forRoot(process.env.DATABASE)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  
  configure(consumer: MiddlewareConsumer): void {

    consumer
      .apply(GetUserMiddleware)
      .forRoutes(
        UsersController,
        SchedulesController
      )

  }
}
