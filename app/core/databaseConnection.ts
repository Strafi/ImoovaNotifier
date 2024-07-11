/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
import SafeMongooseConnection from "@lib/safe-mongoose-connection";

let safeMongooseConnection: SafeMongooseConnection;

const openDBConnection = (): Promise<boolean> => {
	return new Promise<boolean>((res) => {
		safeMongooseConnection = new SafeMongooseConnection({
			mongoUrl: process.env.MONGO_URL!,
			onStartConnection: (mongoUrl) => console.info(`Connecting to MongoDB at ${mongoUrl}`),
			onConnectionError: (error, mongoUrl) => {
				console.error({
					level: "error",
					message: `Could not connect to MongoDB at ${mongoUrl}`,
					error,
				});

				res(false);
			},
			onConnectionRetry: (mongoUrl) => console.log(`Retrying to MongoDB at ${mongoUrl}`),
		});

		if (process.env.MONGO_URL == null) {
			console.error("MONGO_URL not specified in environment");

			process.exit(1);
		} else {
			safeMongooseConnection.connect((mongoUrl) => {
				console.info(`Connected to MongoDB at ${mongoUrl}`);

				res(true);
			});
		}
	});
};

const closeDBConnection = (): void => {
	if (!safeMongooseConnection) {
		return;
	}

	console.info("Closing the MongoDB connection");

	safeMongooseConnection.close((err) => {
		if (err) {
			console.error({
				level: "error",
				message: "Error shutting closing mongo connection",
				error: err,
			});
		} else {
			console.info("Mongo connection closed successfully");
		}

		process.exit(0);
	}, true);
};

export { openDBConnection, closeDBConnection };
export default openDBConnection;
