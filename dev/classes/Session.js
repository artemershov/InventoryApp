import List from './List';
import filter from 'lodash/filter';

export class Session {
  constructor(id, { uid, token }) {
    this.id = id;
    this.uid = uid;
    this.token = token;
  }
}

export default class SessionList extends List {
  constructor(data) {
    super(data);
  }
  add(data) {
    const item = new Session(this.lastId + 1, data);
    return super.add(item);
  }
  getSessionByToken(token) {
    if (!token) return;
    return filter(this.list, session => session.token == token)[0];
  }
}
