import { PubSub } from 'graphql-subscriptions';

import { Resolvers } from "../../generated/graphql";
import { Card } from "../models/Card";

export const pubsub = new PubSub();

export const cardResolvers: Resolvers = {
  Query: {
    card: async (_, { id }) => await Card.findById(id),
    cards: async (_, { }) => await Card.find({}),
    cardsByType: async (_, { type }) => await Card.find({ type }),
  },
  Mutation: {
    createCard: async (_, { card }) => {
      const newCard = await (new Card(card)).save();
      pubsub.publish('CARD_CREATED', { cardCreated: newCard }); 

      return card;
    },
    updateCard: async (_, { id, card }) => {
      const newCard = await Card.findOneAndUpdate({ _id: id }, card, { new: true });
      pubsub.publish('CARD_UPDATED', { cardUpdated: newCard }); 

      return newCard;
    },
    deleteCard: async (_, { id }) => {
      const card = await Card.findByIdAndDelete(id);
      pubsub.publish('CARD_DELETED', { cardDeleted: card }); 

      return card;
    },
  },
  Subscription: {
    cardCreated: {
      // @ts-ignore
      subscribe: () => pubsub.asyncIterator('CARD_CREATED'),
    },
    cardUpdated: {
      // @ts-ignore
      subscribe: () => pubsub.asyncIterator('CARD_UPDATED'),
    },
    cardDeleted: {
      // @ts-ignore
      subscribe: () => pubsub.asyncIterator('CARD_DELETED'),
    },
  },
};
