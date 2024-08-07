/* eslint-disable no-console */

import User, { IUser } from "../models/User";

const writeUser = async (userToWrite: Omit<IUser, "isSubscribed" | "minimumNights">): Promise<boolean> => {
	try {
		const userInDB = await User.findOne({ id: userToWrite.id });

		if (userInDB) {
			userInDB.is_bot = userToWrite.is_bot;
			userInDB.first_name = userToWrite.first_name;
			userInDB.username = userToWrite.username;
			userInDB.language_code = userToWrite.language_code;

			await userInDB.save();
		} else {
			const user = new User({
				id: userToWrite.id,
				is_bot: userToWrite.is_bot,
				first_name: userToWrite.first_name,
				username: userToWrite.username,
				language_code: userToWrite.language_code,
				isSubscribed: false,
			});

			await user.save();
		}

		return true;
	} catch (err) {
		console.error(err);

		return false;
	}
};

export { writeUser };
export default writeUser;
