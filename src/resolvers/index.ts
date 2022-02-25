import { prisma } from '../libs/prisma';
import { Resolvers } from '../types/generated/graphql';
import { dateScalar } from './scalar/date';

export const resolvers: Resolvers = {
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
        include: {},
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
  Mutation: {
    addUser: async (parent, args) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (user) {
        throw new Error('Alredy exists user');
      }

      const createUser = await prisma.user.create({
        data: {
          email: args.email,
          name: args.name,
          createdAt: new Date(),
          updateAt: new Date(),
        },
      });

      return createUser;
    },
  },
  Date: dateScalar,
};
