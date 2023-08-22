import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop()
    description: string;

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

    @Prop({ type: Object })
    deleteBy: {
        id: mongoose.Schema.Types.ObjectId,
        email: string
    }
}

export const CompanySchema = SchemaFactory.createForClass(Company);

