import List from './List';
import filter from 'lodash/filter';

export class User {
  constructor(id, { login, password, name, items, categories }) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
    this.items = items;
    this.categories = categories;
  }
}

export default class UserList extends List {
  add(data) {
    const user = new User(this.lastId + 1, data);
    return super.add(user);
  }

  edit(id, data) {
    const user = new User(id, { ...this.list[id], ...data });
    this.setList({ ...this.list, [id]: user });
    return id;
  }

  getUserByLogin(login) {
    return filter(this.list, user => user.login == login)[0];
  }

  checkPassword(login, password) {
    const user = this.getUserByLogin(login);
    if (!user) return false;
    return user.password == password;
  }
}

export const responseCodes = {
  '0': 'Success',
  '1': 'Login is already registered',
  '2': 'Login does not registered',
  '3': 'Incorrect login or password',
  '4': 'Wrong password',
};
