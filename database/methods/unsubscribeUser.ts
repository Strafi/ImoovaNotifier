/* eslint-disable no-console */

import User from "../models/User";

const unsubscribeUser = async (userId: number): Promise<boolean> => {
	try {
		const userInDB = await User.findOne({ id: userId });

		if (!userInDB) {
			return false;
		}

		userInDB.isSubscribed = false;

		await userInDB.save();

		return true;
	} catch (err) {
		console.error(err);

		return false;
	}
};

export { unsubscribeUser };
export default unsubscribeUser;
