import { generateUsername } from "unique-username-generator";

import User from "@user/models";
import Token from "@user/models/token";
import { IUser, IUserCredentials } from "@user/types";

export const signin = async (_: unknown, { input }: { input: IUserCredentials }) => {
  try {
    const { email, password } = input;
    const user = await User.findOne({ email }).populate("token");

    if (!user) {
      const token = new Token({ jwt: "" });
      token.jwt = await token.encrypt(email);
      await token.save();

      const user = await User.create({
        ...input,
        name: generateUsername(),
        token: token._id,
      });

      return {
        ...user.toJSON(),
        token,
      };
    }

    if (await user.comparePassword(password)) {
      return user;
    }

    throw new Error("Invalid credentials");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByToken = async (_: unknown, __: unknown, context: { session: string }) => {
  try {
    console.log('token', context.session.split(' ')[1])
    const token = await Token.findOne({ jwt: context.session.split(' ')[1] });
    console.log(token)

    if (token) {
      const user = await User.findOne({ token: token._id }).populate("token");

      return user;
    }
    throw new Error("Invalid token");

  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (_: unknown, { input }: { input: IUser }, context: { session: string }) => {
  try {
    const token = await Token.findOne({ jwt: context.session.split(' ')[1] });
    const user = await User.findOneAndUpdate({ token: token._id }, { $set: input });
    console.log(user, 'user');
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}
