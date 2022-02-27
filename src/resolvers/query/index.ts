import { prisma } from '../../libs/prisma';
import { QueryResolvers } from '../../types/generated/graphql';

export const Query: QueryResolvers = {
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
};
