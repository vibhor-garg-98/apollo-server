class User {
  constructor() {
    this.users = new Map();
    this.id = 0;
  }
  getAllUser() {
    const mapToArray = Array.from(this.users.values());
    return mapToArray;
  }
  getUser(id) {
    return this.users.get(Number(id));
  }
  createUser(user) {
    this.id += 1;
    this.users.set(this.id, { ...user, id: this.id });
    return this.users.get(this.id);
  }
  updateUser(data) {
    const { id, role } = data;
    const user = this.users.get(Number(id));
    this.users.set(Number(id), { ...user, role });
    return this.users.get(Number(id));
  }
  deleteUser(id) {
    this.users.delete(Number(id));
    return id;
  }
}

export default new User();
