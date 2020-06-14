import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { TraineeApi, UserApi } from './dataSource/index';

class Server {
  constructor(config) {
    this.app = express();
    this.config = config;
  }

  bootstrap = () => {
    this.initBodyParser();
    this.setupRoutes();
    return this;
  };

  run = () => {
    const {
      config: { port },
    } = this;
    this.httpServer.listen(port, (err) => {
      if (err) {
        console.log('error');
        throw err;
      }
      console.log(`App is running successfully on port  ${port}`);
    });
  };

  initBodyParser = () => {
    const { app } = this;
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  };

  setupRoutes = () => {
    const { app } = this;
    app.use('/health-check', (req, res) => {
      console.log(' Inside health check ');
      res.send(' I am OK ');
    });
  };

  setupApolloServer(schema) {
    const { app } = this;
    this.server = new ApolloServer({
      ...schema,
      dataSources: () => ({
        userApi: new UserApi(),
        traineeApi: new TraineeApi(),
      }),
      context: ({ req }) => {
        if (req) {
          return { token: req.headers.authorization };
        }
        return {};
      },
    });
    this.server.applyMiddleware({ app });
    this.httpServer = createServer(app);
    this.server.installSubscriptionHandlers(this.httpServer);
    this.run();
  }
}

export default Server;
