import { UserInputError } from 'apollo-server';

export default {
  getMe: async (parent, args, context) => {
    try {
      const {
        dataSources: { userApi },
      } = context;
      const response = await userApi.getMe();
      return response.data;
    } catch (error) {
      return new UserInputError('Arguments are invalid', {
        invalidArgs: Object.keys(args),
      });
    }
  },
};
