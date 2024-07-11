import { Model, Schema, model } from "mongoose";
import TimeStampPlugin, { ITimeStampedDocument } from "./plugins/timestamp-plugin";

export type TImoovaCity = { id: string, name: string, state: string, region: string };

export type TImoova = {
	id: string;
	created_at: string;
	line: { reference: string; }
	status: string;
	count: number;
	available_from_date: string;
	available_to_date: string;
	currency: string;
	hire_unit_type: string;
	hire_unit_rate: number;
	hire_units_allowed: number;
	extra_hire_units_allowed: number;
	extra_hire_unit_rate: number;
	seatbelts: number;
    measurement: string;
    distance_allowed: number;
    booking_fee_amount: number;
    latest_departure_date: string;
    deliveryCity: TImoovaCity;
    departureCity: TImoovaCity;
    vehicle: {
		id: string;
		type: string;
		name: string;
		heroImage: string;
		code: string;
		transmission: string;
    };
    supplier: {
		id: string;
		name: string;
		minimum_age: number;
		age_surcharge_amount: number;
		minimum_no_surcharge_age: number;
    };
    inclusions: Array<string>;
};

const schema = new Schema<TImoova>({
	id: {
		type: String,
		index: true,
		required: true,
		unique: true,
	},
	created_at: {
		type: String,
		required: false,
	},
	line: {
		reference: {
			type: String,
			required: false,
		},
	},
	status: {
		type: String,
		required: false,
	},
	count: {
		type: Number,
		required: false,
	},
	available_from_date: {
		type: String,
		required: false,
	},
	available_to_date: {
		type: String,
		required: false,
	},
	currency: {
		type: String,
		required: false,
	},
	hire_unit_type: {
		type: String,
		required: false,
	},
	hire_unit_rate: {
		type: Number,
		required: false,
	},
	hire_units_allowed: {
		type: Number,
		required: false,
	},
	extra_hire_units_allowed: {
		type: Number,
		required: false,
	},
	extra_hire_unit_rate: {
		type: Number,
		required: false,
	},
	seatbelts: {
		type: Number,
		required: false,
	},
	measurement: {
		type: String,
		required: false,
	},
	distance_allowed: {
		type: Number,
		required: false,
	},
	booking_fee_amount: {
		type: Number,
		required: false,
	},
	latest_departure_date: {
		type: String,
		required: false,
	},
	deliveryCity: {
		type: {
			id: {
				type: String,
				required: false,
			},
			name: {
				type: String,
				required: false,
			},
			state: {
				type: String,
				required: false,
			},
			region: {
				type: String,
				required: false,
			},
		},
		required: false,
	},
	departureCity: {
		type: {
			id: {
				type: String,
				required: false,
			},
			name: {
				type: String,
				required: false,
			},
			state: {
				type: String,
				required: false,
			},
			region: {
				type: String,
				required: false,
			},
		},
		required: false,
	},
	vehicle: {
		type: {
			id: {
				type: String,
				required: false,
			},
			type: {
				type: String,
				required: false,
			},
			name: {
				type: String,
				required: false,
			},
			heroImage: {
				type: String,
				required: false,
			},
			code: {
				type: String,
				required: false,
			},
			transmission: {
				type: String,
				required: false,
			},
		},
		required: false,
	},
	supplier: {
		type: {
			id: {
				type: String,
				required: false,
			},
			name: {
				type: String,
				required: false,
			},
			minimum_age: {
				type: Number,
				required: false,
			},
			age_surcharge_amount: {
				type: Number,
				required: false,
			},
			minimum_no_surcharge_age: {
				type: Number,
				required: false,
			},
		},
		required: false,
	},
	inclusions: {
		type: [String],
		required: false,
	},
});

export type TImoovaDocument = TImoova & ITimeStampedDocument;

schema.plugin(TimeStampPlugin);

export const Imoova: Model<TImoovaDocument> = model<TImoovaDocument, Model<TImoovaDocument>>("Imoova", schema);

export default Imoova;
