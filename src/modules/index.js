import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import path from "path";
import * as user from "./user/index";
import * as trainee from './trainee/index';

const typesArray = fileLoader(path.join(__dirname, "./**/*.graphql"));

const typeDefs = mergeTypes(typesArray, { all: true });

export default {
  resolvers: {
    Query: {
      ...user.Query,
      ...trainee.query
    },
    Mutation: {
      ...trainee.mutation,
    }
  },
  typeDefs,
};
