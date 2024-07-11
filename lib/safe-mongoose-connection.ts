/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsdoc/require-param */
import mongoose, { ConnectionOptions } from "mongoose";

/** Callback for establishing or re-stablishing mongo connection */
interface IOnConnectedCallback {
	(mongoUrl: string): void;
}

interface SafeMongooseConnectionOptions {
	mongoUrl: string;
	mongooseConnectionOptions?: ConnectionOptions;
	retryDelayMs?: number;
	debugCallback?: (collectionName: string, method: string, query: unknown, doc: string) => void;
	onStartConnection?: (mongoUrl: string) => void;
	onConnectionError?: (error: Error, mongoUrl: string) => void;
	onConnectionRetry?: (mongoUrl: string) => void;
}

const defaultMongooseConnectionOptions: ConnectionOptions = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
};

/**
 * A Mongoose Connection wrapper class to
 * help with mongo connection issues.
 *
 * This library tries to auto-reconnect to
 * MongoDB without crashing the server.
 * @author Sidhant Panda
 */
class SafeMongooseConnection {
	/** Safe Mongoose Connection options */
	private readonly options: SafeMongooseConnectionOptions;

	/** Callback when mongo connection is established or re-established */
	private onConnectedCallback: IOnConnectedCallback | undefined;

	/**
	 * Internal flag to check if connection established for
	 * first time or after a disconnection
	 */
	private isConnectedBefore = false;

	private shouldCloseConnection = false;

	/** Delay between retrying connecting to Mongo */
	private retryDelayMs = 2000;

	/** Mongo connection options to be passed Mongoose */
	private readonly mongoConnectionOptions: ConnectionOptions = defaultMongooseConnectionOptions;

	private connectionTimeout: ReturnType<typeof setTimeout> | undefined;

	// eslint-disable-next-line jsdoc/require-param
	/**
	 * Start mongo connection
	 * @param {string} mongoUrl - MongoDB URL
	 * @param {Function} onConnectedCallback - callback to be called when mongo connection is successful
	 */
	constructor(options: SafeMongooseConnectionOptions) {
		this.options = options;

		mongoose.connection.on("error", this.onError);
		mongoose.connection.on("connected", this.onConnected);
		mongoose.connection.on("disconnected", this.onDisconnected);
		mongoose.connection.on("reconnected", this.onReconnected);

		if (options.debugCallback) {
			mongoose.set("debug", options.debugCallback);
		}

		if (options.retryDelayMs) {
			this.retryDelayMs = options.retryDelayMs;
		}
	}

	/** Close mongo connection */
	public close(onClosed: (err: Error | null) => void = () => false, force = false): void {
		if (this.connectionTimeout) {
			clearTimeout(this.connectionTimeout);
		}

		this.shouldCloseConnection = true;

		mongoose.connection.close(force, onClosed);
	}

	/** Start mongo connection */
	public connect(onConnectedCallback: IOnConnectedCallback): void {
		this.onConnectedCallback = onConnectedCallback;

		this.startConnection();
	}

	private startConnection = () => {
		if (this.options.onStartConnection) {
			this.options.onStartConnection(this.options.mongoUrl);
		}

		mongoose.connect(this.options.mongoUrl, this.mongoConnectionOptions).catch(() => false);
	};

	/**
	 * Handler called when mongo connection is established
	 */
	private onConnected = () => {
		this.isConnectedBefore = true;

		this.onConnectedCallback?.(this.options.mongoUrl);
	};

	/** Handler called when mongo gets re-connected to the database */
	private onReconnected = () => {
		this.onConnectedCallback?.(this.options.mongoUrl);
	};

	/** Handler called for mongo connection errors */
	private onError = () => {
		if (this.options.onConnectionError) {
			const error = new Error(`Could not connect to MongoDB at ${this.options.mongoUrl}`);

			this.options.onConnectionError(error, this.options.mongoUrl);
		}
	};

	/** Handler called when mongo connection is lost */
	private onDisconnected = () => {
		if (!this.isConnectedBefore && !this.shouldCloseConnection) {
			this.connectionTimeout = setTimeout(() => {
				this.startConnection();

				clearTimeout(this.connectionTimeout!);
			}, this.retryDelayMs);

			if (this.options.onConnectionRetry) {
				this.options.onConnectionRetry(this.options.mongoUrl);
			}
		}
	};
}

export default SafeMongooseConnection;
