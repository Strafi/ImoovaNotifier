/* eslint-disable no-console */

import User from "../models/User";

const subscribeUser = async (userId: number): Promise<boolean> => {
	try {
		const userInDB = await User.findOne({ id: userId });

		if (!userInDB) {
			return false;
		}

		userInDB.isSubscribed = true;

		await userInDB.save();

		return true;
	} catch (err) {
		console.error(err);

		return false;
	}
};

export { subscribeUser };
export default subscribeUser;
