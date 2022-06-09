import { model, Schema, models, Model } from 'mongoose';
import { IPost } from '@post/types';
import dayjs from 'dayjs';

const PostSchema = new Schema<IPost>({
  title: String,
  body: String,
  status: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Number,
    default: dayjs().valueOf(),
  }
});

const Post = (models.Post || model<IPost, Model<IPost>>('Post', PostSchema) as Model<IPost>);

export default Post;
