import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Patient } from 'src/patients/schemas/patient.schema';
import { User } from 'src/users/schemas/user.shema';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
    @Prop()
    name: string;

    @Prop()
    size: string;

    @Prop()
    key: string;

    @Prop()
    url: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    image: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' })
    patient: Patient;
}

export const ImageSchema = SchemaFactory.createForClass(Image);