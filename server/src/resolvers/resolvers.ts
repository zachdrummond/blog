import { mutations } from "./Mutation.js";
import { queries } from "./Query.js";
import { formatDate } from "../utils.js";
import { Resolvers } from "../../shared/types.js";

// GraphQL Resolvers = A collection of functions that fetch the data for the schema
export const resolvers: Resolvers = {
  Query: queries,
  Mutation: mutations,
  Author: {
    date_created: formatDate,
    date_updated: formatDate,
  },
  Post: {
    date_created: formatDate,
    date_updated: formatDate,
  },
};
