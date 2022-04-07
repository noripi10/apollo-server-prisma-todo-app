import { Resolvers } from '../types/generated/graphql';
import { Query } from './query';
import { User } from './query-option/user';
import { Post } from './query-option/post';
import { Mutaiton } from './mutaion';
import { dateScalar } from './scalar/date';

export const resolvers: Resolvers = {
  Query: Query,
  User: User,
  Post: Post,
  Mutation: Mutaiton,
  Date: dateScalar,
};
