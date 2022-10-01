import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import models from "./sequelize/models";
import { sequelize } from './sequelize/models';

//Importing new merge GraphQL 
import path from 'path';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';


const startApolloServer = async () => {

  console.log('Checking database connection....');

  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
  } catch(e) {
    console.log('Database connection failed', e);
    process.exit(1);
  }

  const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema')));
  const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));


  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    context: {models, 
      user:{
        id: 1
      }},
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  models.sequelize.sync({force: true}).then(x => {
    const port = Number(process.env.PORT ?? 4000)
    new Promise(resolve => httpServer.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  })


};

startApolloServer();