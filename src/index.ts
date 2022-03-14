import express from 'express';
import cors from 'cors';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import { join } from 'path';

import { resolvers } from './resolvers/index';
// import { posts, users } from './data';

const app = express();
app.use(cors());

const initGraphqlServer = async () => {
  const schema = loadSchemaSync(join(__dirname, '../schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
  });

  const schemaWithResolvers = addResolversToSchema({ schema, resolvers });
  const server = new ApolloServer({
    schema: schemaWithResolvers,
    // context: ({ req }) => {
    //   return { user: req.headers.authorization };
    // },
  });

  await server.start();
  server.applyMiddleware({ app });

  return server;
};

initGraphqlServer().then((server) => {
  app.listen({ port: 4000 }, () => {
    console.info(
      `express server start http://localhost:4000${server.graphqlPath}`
    );
  });
});
