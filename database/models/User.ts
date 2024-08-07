import { Model, Schema, model } from "mongoose";
import TimeStampPlugin, { ITimeStampedDocument } from "./plugins/timestamp-plugin";

export interface IUser {
	id: number;
	isSubscribed: boolean;
	minimumNights: number;
	is_bot?: boolean;
	first_name?: string;
	username?: string;
	language_code?: string;
	mintedPunksIds?: number[];
}

export type TUserDocument = IUser & ITimeStampedDocument;

const schema = new Schema<IUser>({
	id: {
		type: Number,
		index: true,
		required: true,
		unique: true,
	},
	is_bot: {
		type: Boolean,
		required: false,
	},
	first_name: {
		type: String,
		required: false,
	},
	username: {
		type: String,
		required: false,
	},
	language_code: {
		type: String,
		required: false,
	},
	isSubscribed: {
		type: Boolean,
		required: true,
		default: false,
	},
	minimumNights: {
		type: Number,
		required: false,
		default: 5,
	},
});

schema.plugin(TimeStampPlugin);

const User: Model<TUserDocument> = model<TUserDocument, Model<TUserDocument>>("User", schema);

export default User;
