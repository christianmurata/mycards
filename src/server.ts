import { readFileSync } from 'fs';
import { ApolloServer } from 'apollo-server';
import * as dotenv from 'dotenv';

import { mongoConnection } from './database/connections';
import { cardResolvers } from './resolvers/cardResolvers';

dotenv.config();

const typeDefs = readFileSync(__dirname + '/schema/schema.graphql', {
  encoding: 'utf-8'
});

const server = new ApolloServer({ typeDefs, resolvers: cardResolvers });

server.listen().then(({ url }) => {
  mongoConnection()
    .then(() => {
      console.log(`🚀  Server ready at ${url}`);
    })
    .catch(err => console.log(err));
});