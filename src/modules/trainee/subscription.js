import constant from '../../libs/constant';
import pubsub from '../pubsub';

export default {
  traineeAdded: {
    subscribe: () =>
      pubsub.asyncIterator([constant.subscriptions.TRAINEE_ADDED]),
  },
  traineeUpdated: {
    subscribe: () =>
      pubsub.asyncIterator([constant.subscriptions.TRAINEE_UPDATED]),
  },
  traineeDeleted: {
    subscribe: () =>
      pubsub.asyncIterator([constant.subscriptions.TRAINEE_DELETED]),
  },
};
