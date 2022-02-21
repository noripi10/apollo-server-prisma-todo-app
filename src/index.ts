import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server';
import { join } from 'path';
import { Resolvers } from './types/generated/graphql';

import { PrismaClient } from '@prisma/client';

// mock data
// import { posts, users } from './data';

const prisma = new PrismaClient();

const schema = loadSchemaSync(join(__dirname, '../schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const resolvers: Resolvers = {
  Query: {
    users: () => prisma.user.findMany({ orderBy: { id: 'asc' } }),
    user: async (parent, args, context) => {
      console.info(parent);
      console.info(args);
      console.info(context);
      if (!args.id && !args.name) {
        return null;
      }
      const user = await prisma.user.findFirst({
        where: {
          id: args.id ?? 0,
        },
      });
      return user;
    },
    posts: () => prisma.post.findMany(),
  },
  User: {
    posts: (parent) => {
      const res = prisma.post.findMany({
        where: {
          authorId: parent.id ?? 0,
        },
      });
      return res;
    },
  },
};

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
