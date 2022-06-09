import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Theme {
    id: ID
    name: String
  }

  type Post {
    id: ID
    title: String
    theme: Theme
    body: String
    author: User
    status: String
    createdAt: Int
  }

  type Token {
    jwt: String
  }

  type User {
    id: ID
    name: String
    email: String
    password: String
    token: Token
  }

  input PostInput {
    title: String
    body: String
    author: String
  }

  input SigninInput {
    email: String
    password: String
  }

  input UpdateUserInput {
    name: String
  }

  type Query {
    getPosts: [Post]
    getUserByToken: User
  }

  type Mutation {
    createPost(input: PostInput): Post
    signin(input: SigninInput): User
    updateUser(input: UpdateUserInput): User
  }
`
