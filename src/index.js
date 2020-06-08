import schema from './modules';
import configuration from './config/configurations';
import Server from './server';

const server = new Server(configuration);
server.bootstrap().run();
server.setupApolloServer(schema);
