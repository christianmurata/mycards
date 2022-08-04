import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";

export const startServer = async (typeDefs: string, resolvers: any) => {
  const app = express();
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const httpServer = createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers, 
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  await server.start();

  server.applyMiddleware({ app });

  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));

  return server.graphqlPath;
}
