import { createPost, getPosts } from "@post/controllers";
import { getUserByToken, signin, updateUser } from "@user/resolvers";

export const resolvers = {
  Query: {
    getPosts,
    getUserByToken,
  },
  Mutation: {
    createPost,
    signin,
    updateUser,
  },
}
