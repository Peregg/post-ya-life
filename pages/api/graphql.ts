import { ApolloServer } from 'apollo-server-micro';
import { schema } from '@app/infrastructure/graph/schema';
import User from '@user/models';

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const token = req.headers.authorization;

    return { session: token };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
