import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';

import { startServer } from './server';
import { mongoConnection } from './database/connections';
import { cardResolvers } from './resolvers/cardResolvers';

dotenv.config();

const typeDefs = readFileSync(__dirname + '/schema/schema.graphql', {
  encoding: 'utf-8'
});

mongoConnection().then(() => {
  startServer(typeDefs, cardResolvers).then(path => {
    console.log(`🚀 Server ready at http://localhost:4000${path}`); 
  }); 
})
.catch(err => console.log(err));
