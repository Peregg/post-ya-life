import { model, Schema, models, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserEntity } from '@user/types';

const UserSchema = new Schema<IUserEntity>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  token: {
    type: Schema.Types.ObjectId,
    ref: 'Token',
    required: true,
  },
}, {
  toJSON: {
    /* eslint-disable */
    transform(_doc, ret) {
      const { _id, __v, password, ...user } = ret;

      return {
        id: _id,
        ...user,
      };
    },
    /* eslint-enable */
  },
},
);

UserSchema.pre('save', async function hashPwd() {
  const user = this;

  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(user.password, salt);
    this.password = hash;
  } catch (error) {
    throw Error(error);
  }
});

UserSchema.methods.comparePassword = async function matchPdw(candidatePwd: string) {
  const user = this;

  try {
    const result = await bcrypt.compare(candidatePwd, user.password);
    console.log({ result }, 'dkoo');

    return result;
  } catch (error) {
    throw Error(error);
  }
}

export interface IUserModel extends Model<IUserEntity> {
  comparePassword: (candidatePwd: string) => boolean
}

const User = (models.User || model<IUserEntity, IUserModel>('User', UserSchema) as IUserModel);

export default User;
