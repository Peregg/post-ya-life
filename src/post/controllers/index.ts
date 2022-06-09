import Post from "@post/models";
import { IPostBody } from "@post/types";
import User from "@user/models";
import Token from "@user/models/token";

export const getPosts = async () => {
  const posts = await Post.find().populate('author');
  return posts.reverse();
}

export const createPost = async (_: unknown, { input }: { input: IPostBody }, ctx: { session: string }) => {
  const [, _token] = ctx.session.split(" ");
  const token = await Token.findOne({ jwt: _token });
  const user = await User.findOne({ token: token._id });
  const newPost = await Post.create({ ...input, author: user._id });

  return newPost;
};
