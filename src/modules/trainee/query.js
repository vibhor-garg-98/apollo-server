import userInstance from '../../service/user';

export default {
  getAllTrainees: () => userInstance.getAllUser(),
  getTrainee: (parent, args, context) => {
    const { id } = args;
    return userInstance.getUser(id);
  },
};
