import { prisma } from '../../libs/prisma';
import { QueryResolvers } from '../../types/generated/graphql';

export const Query: QueryResolvers = {
  getUsers: () => prisma.user.findMany({ orderBy: { id: 'asc' } }),
  getUser: async (parent, args, context) => {
    console.info({ parent });
    console.info({ args });
    console.info({ context });
    if (!args.id && !args.name) {
      return null;
    }
    const user = await prisma.user.findFirst({
      where: {
        id: args.id ?? 0,
      },
      // include: {},
    });
    return user;
  },
  getPosts: () => prisma.post.findMany(),
  getUserPosts: async (_, args) => {
    const posts = await prisma.post.findMany({
      where: {
        authorId: args.userId,
      },
    });

    return posts;
  },
};
