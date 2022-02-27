import { Resolvers } from '../types/generated/graphql';
import { Mutaiton } from './mutaion';
import { Query } from './query';
import { User } from './user';
import { dateScalar } from './scalar/date';

export const resolvers: Resolvers = {
  Query: Query,
  User: User,
  Mutation: Mutaiton,
  Date: dateScalar,
};
