import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Date, Document } from 'mongoose';
import { Image } from '../../images/schemas/image.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ required: false })
    passwordResetToken: string;

    @Prop({ required: false })
    passwordResetExpires: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: false })
    image: Image;

}

export const UserSchema = SchemaFactory.createForClass(User);