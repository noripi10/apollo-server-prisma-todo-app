import { prisma } from '../../libs/prisma';
import { MutationResolvers } from '../../types/generated/graphql';

export const Mutaiton: MutationResolvers = {
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

    await Promise.all(
      [...Array(10)].map(async () => {
        await prisma.post.create({
          data: {
            title: 'title' + Math.floor(Math.random() * 100),
            body: 'body',
            authorId: createUser.id,
            createdAt: new Date(),
            updateAt: new Date(),
          },
        });
      })
    );

    return createUser;
  },
};
