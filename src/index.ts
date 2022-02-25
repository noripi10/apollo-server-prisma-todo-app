import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server';
import { join } from 'path';

import { resolvers } from './resolvers/index';
// import { posts, users } from './data';

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

server.listen().then(({ url }) => {
  console.info(`Server ready at ${url}`);
});
