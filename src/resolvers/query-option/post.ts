import { prisma } from '../../libs/prisma';
import { PostResolvers } from '../../types/generated/graphql';

export const Post: PostResolvers = {
  author: (parent) => {
    const res = prisma.user.findUnique({
      where: {
        id: parent.authorId ?? -1,
      },
    });

    return res;
  },
};
