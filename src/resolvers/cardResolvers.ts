import { Resolvers } from "../../generated/graphql";
import { Card } from "../models/Card";

export const cardResolvers: Resolvers = {
  Query: {
    card: async (_, { id }) => {
      return await Card.findById(id);
    },
    cards: async (_, { }) => {
      return await Card.find({});
    },
    cardsByType: async (_, { type }) => {
      return await Card.find({ type });
    },
  }
};