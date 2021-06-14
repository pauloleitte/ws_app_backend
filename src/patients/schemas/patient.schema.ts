import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Image } from 'src/images/schemas/image.schema';
import { User } from 'src/users/schemas/user.shema';

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
    @Prop()
    name: string;

    @Prop()
    naturalness: string;

    @Prop()
    maritalStatus: string;

    @Prop()
    birthDate: string;

    @Prop()
    genre: string;

    @Prop()
    profession: string;

    @Prop()
    cpf: string;

    @Prop()
    rg: string;

    @Prop()
    email: string;

    @Prop()
    cellphone: string;

    @Prop()
    telephone: string;

    @Prop()
    cep: string;

    @Prop()
    address: string;

    @Prop()
    district: string;

    @Prop()
    city: string;

    @Prop()
    state: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image' })
    image: Image;

}

export const PatientSchema = SchemaFactory.createForClass(Patient);