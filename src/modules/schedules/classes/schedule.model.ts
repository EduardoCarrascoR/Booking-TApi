import * as mongoose from 'mongoose';
import { Document } from "mongoose";
import { IsString, IsMongoId, IsDate, IsMilitaryTime } from "class-validator";

export const SchedulesSchema = new mongoose.Schema({
    mid: { type: String, required: true },
    uid: { type: String, required: true },
    date: { type: Date, required: true },
    hour: { type: String, required: true },
    medicName: { type: String, trim: true },
    speciality: { type: String, required: true },
    state: { type: String, default: 'RESERVE', uppercase: true }

});

export class Schedule extends Document{
    @IsString() @IsMongoId() _id: string;
    @IsString() @IsMongoId() mid: string;
    @IsString() @IsMongoId() uid: string;
    @IsDate() date: Date;
    @IsMilitaryTime() @IsString() hour: string;
    @IsString() medicName: string;
    @IsString() speciality: string;
    @IsString() state: string;
}
