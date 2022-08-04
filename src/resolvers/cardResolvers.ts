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
  },
  Mutation: {
    createCard: async (_, { card }) => {
      return await (new Card(card)).save();
    },
    updateCard: async (_, { id, card }) => {
      return await Card.findOneAndUpdate({ _id: id }, card, { new: true });
    },
    deleteCard: async (_, { id }) => {
      return await Card.findByIdAndDelete(id);
    },
  }
};
