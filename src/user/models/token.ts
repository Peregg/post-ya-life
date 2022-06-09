import { model, Schema, models, Model } from 'mongoose';
import { IToken } from '@user/types';
import jwt from 'jsonwebtoken';

const TokenSchema = new Schema<IToken>({
  jwt: String,
});


TokenSchema.methods.encrypt = async function encrypt(message: string) {
  const token = await jwt.sign(message, String(process.env.JWT_SECRET));
  return token;
}

export type TokenModel = Model<IToken> & {
  encrypt: (message: string) => string;
};

const Token = (models.Token || model<IToken, TokenModel>('Token', TokenSchema) as TokenModel);

export default Token;
