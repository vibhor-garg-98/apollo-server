import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configurations';

class UserApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.serviceUrl}/api/user`;
  }

  loginUser(payload) {
    return this.post('/login', payload);
  }
}

export default UserApi;
