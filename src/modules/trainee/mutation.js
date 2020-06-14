import { UserInputError } from 'apollo-server';
import pubsub from '../pubsub';
import constant from '../../libs/constant';

export default {
  createTrainee: async (parent, args, context) => {
    try {
      const {
        payload: { name, email, role, password },
      } = args;
      const {
        dataSources: { traineeApi },
      } = context;
      const response = await traineeApi.createTrainee({
        name,
        email,
        role,
        password,
      });
      pubsub.publish(constant.subscriptions.TRAINEE_ADDED, {
        traineeAdded: response.data,
      });
      return response.data;
    } catch (error) {
      return new UserInputError('Arguments are invalid', {
        invalidArgs: Object.keys(args),
      });
    }
  },
  updateTrainee: async (parent, args, context) => {
    try {
      const {
        payload: { id, name, email, password },
      } = args;
      const {
        dataSources: { traineeApi },
      } = context;
      const response = await traineeApi.updateTrainee({
        id,
        name,
        email,
        password,
      });
      pubsub.publish(constant.subscriptions.TRAINEE_UPDATED, {
        traineeUpdated: response.data.id,
      });
      return response.data.id;
    } catch (error) {
      return new UserInputError('Arguments are invalid', {
        invalidArgs: Object.keys(args),
      });
    }
  },
  deleteTrainee: async (parent, args, context) => {
    try {
      const { id } = args;
      const {
        dataSources: { traineeApi },
      } = context;
      const response = await traineeApi.deleteTrainee(id);
      pubsub.publish(constant.subscriptions.TRAINEE_DELETED, {
        traineeDeleted: response.data.id,
      });
      return response.data.id;
    } catch (error) {
      return new UserInputError('Arguments are invalid', {
        invalidArgs: Object.keys(args),
      });
    }
  },
};
