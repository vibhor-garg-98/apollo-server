import { UserInputError } from 'apollo-server';

export default {
  getTrainee: async (parent, args, context) => {
    try {
      const {
        dataSources: { traineeApi },
      } = context;
      const response = await traineeApi.getTrainee(args);
      return response.data;
    } catch (error) {
      return new UserInputError('Arguments are invalid', {
        invalidArgs: Object.keys(args),
      });
    }
  },
};
