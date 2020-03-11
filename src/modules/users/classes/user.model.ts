import * as mongoose from 'mongoose';
import { Document } from "mongoose";
import { IsString, IsBoolean, IsMongoId, IsDate, IsEmail, IsUrl, IsArray } from "class-validator";

export class User extends Document {
  @IsString() displayName: string;
  @IsEmail() email: string;
  @IsBoolean() emailVerified: boolean;
  @IsString() phoneNumber: string;
  @IsString() speciality: string;
  @IsUrl() photoURL: string;
  @IsString() rol: string
  @IsString() dni: string;
  @IsDate() birthday: Date;
  @IsArray() schedules: String[];
  @IsArray() reserves: String[];
  @IsString() state: string;
  @IsDate() createdAt: Date;
  @IsString() @IsMongoId() _id: string;
  @IsString() password: string;
}

export const UsersSchema = new mongoose.Schema({
  displayName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, unique: true, trim: true },
  emailVerified: { type: Boolean, default: false },
  phoneNumber: { type: String, required: true, trim: true },
  photoURL: { type: String, required: true },
  roles: { type: [String], default: ['CLIENT'] },
  reserves: { type: [mongoose.Schema.Types.ObjectId],
    ref: 'Schedule' 
  },
  dni: { type: String, required: true, lowercase: true, unique: true, trim: true },
  birthday: { type: Date, required: true },
  speciality: { type: String, default: 'N/A'},
  schedules: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Schedule' // nombre del schema que tiene la coleccion desde donde viene la relacion
  },
  status: { type: String, default: 'ACTIVE', uppercase: true },
  createdAt: { type: Date, default: Date.now },
  password: { type: String, required: true }
  
});

