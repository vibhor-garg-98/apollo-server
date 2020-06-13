import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configurations';

class TraineeApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.serviceUrl}/api/trainee`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async getTrainee(options) {
    const { data: { skip, limit } } = options;
    return await this.get('/', { skip, limit });
  }
  async createTrainee(payload) {
    return await this.post('/', payload);
  }
  async updateTrainee(payload) {
    return await this.put('/', payload);
  }
  async deleteTrainee(id) {
    return await this.delete(`/${id}`);
  }
}

export default TraineeApi;
