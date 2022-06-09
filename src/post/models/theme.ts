import { model, Schema, models, Model } from 'mongoose';
import { ITheme } from '@post/types';

const ThemeSchema = new Schema<ITheme>({
  name: String,
});

const Post = (models.Post || model<ITheme, Model<ITheme>>('Post', ThemeSchema) as Model<ITheme>);

export default Post;
