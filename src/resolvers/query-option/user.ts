import { prisma } from '../../libs/prisma';
import { UserResolvers } from '../../types/generated/graphql';

export const User: UserResolvers = {
  posts: (parent) => {
    const res = prisma.post.findMany({
      where: {
        authorId: parent.id ?? -1,
      },
    });
    return res;
  },
};
