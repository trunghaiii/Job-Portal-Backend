
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema({ timestamps: true })
export class Resume {
    @Prop()
    email: string;

    @Prop()
    userId: mongoose.Schema.Types.ObjectId;

    @Prop()
    url: string;

    @Prop()
    status: string;

    @Prop()
    companyId: mongoose.Schema.Types.ObjectId;

    @Prop()
    jobId: mongoose.Schema.Types.ObjectId;


    @Prop({ type: Object })
    createdBy: {
        id: mongoose.Schema.Types.ObjectId,
        email: string
    }

    @Prop({ type: Object })
    updatedBy: {
        id: mongoose.Schema.Types.ObjectId,
        email: string
    }
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);

