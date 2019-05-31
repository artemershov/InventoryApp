import UserList from './Users';
import SessionList from './Session';
import ItemsList from './Items';
import CategoriesList from './Categories';
import BrowserStorage from './BrowserStorage';
import sha256 from 'sha-256-js';

export default class App {
  constructor() {
    this.storage = new BrowserStorage('InventoryApp');
    // Init empty data
    if (!this.storage.data) {
      this.storage.data = {
        sessions: new SessionList().getData(),
        users: new UserList().getData(),
      };
    }
    // Load User and Session data
    const { users, sessions, token } = this.storage.data;
    this.users = new UserList(users);
    this.sessions = new SessionList(sessions);
    this.token = token;
    // Authorization
    const session = this.sessions.getSessionByToken(this.token);
    if (session) {
      this.user = this.users.list[session.uid];
      this.items = new ItemsList(this.user.items);
      this.categories = new CategoriesList(this.user.categories);
    } else {
      this.user = null;
      this.items = null;
      this.categories = null;
    }
  }

  itemAdd(data) {
    if (!this.user) return;
    const id = this.items.add({ ...data, uid: this.user.id });
    this.categories.itemAdd(data.gid, id);
    this.updateStorage();
    return id;
  }

  itemEdit(id, data) {
    if (!this.user) return;
    const item = this.items.list[id];
    if (data.gid && item.gid !== data.gid) {
      this.categories.itemRemove(item.gid, id);
      this.categories.itemAdd(data.gid, id);
    }
    this.items.edit(id, data);
    this.updateStorage();
    return id;
  }

  itemRemove(id) {
    if (!this.user) return;
    const item = this.items.list[id];
    this.items.remove(id);
    this.categories.itemRemove(item.gid, id);
    this.updateStorage();
    return id;
  }

  categoryAdd(data) {
    if (!this.user) return;
    const id = this.categories.add({ ...data, uid: this.user.id });
    this.updateStorage();
    return id;
  }

  categoryEdit(id, data) {
    if (!this.user) return;
    this.categories.edit(id, data);
    this.updateStorage();
    return id;
  }

  categoryRemove(id) {
    if (!this.user) return;
    const category = this.categories.list[id];
    category.items.forEach(id => this.items.remove(id));
    this.categories.remove(id);
    this.updateStorage();
    return id;
  }

  userAdd(data) {
    const id = this.users.add({
      login: data.login,
      password: sha256(data.login + data.password),
      name: data.name,
      items: new ItemsList().getData(),
      categories: new CategoriesList().getData(),
    });
    this.updateStorage();
    return id;
  }

  userEdit(data) {
    if (!this.user) return;
    this.users.edit(this.user.id, data);
    this.updateStorage();
    return this.user.id;
  }

  userRemove(password) {
    if (!this.user) return false;
    const { id, login } = this.user;
    if (this.users.checkPassword(login, sha256(login + password))) {
      this.users.remove(id);
      this.updateStorage();
      this.signOut();
      return true;
    }
    return false;
  }

  signIn(data) {
    const { login, password } = data;
    if (!login || !password) return '3';
    const user = this.users.getUserByLogin(login);
    if (!user) return '2';
    if (user.password == sha256(String(login + password))) {
      this.user = user;
      this.items = new ItemsList(user.items);
      this.categories = new CategoriesList(user.categories);
      const uid = user.id;
      this.token = sha256(String(uid + Date.now()));
      this.sessions.add({ uid, token: this.token });
      this.updateStorage();
      return '0';
    }
    return '4';
  }

  signUp(data) {
    if (this.users.getUserByLogin(data.login)) {
      return '1';
    } else {
      this.userAdd(data);
      return this.signIn(data);
    }
  }

  signOut() {
    const session = this.sessions.getSessionByToken(this.storage.data.token);
    this.sessions.remove(session.id);
    this.user = null;
    this.items = null;
    this.categories = null;
    this.token = undefined;
    this.updateStorage();
  }

  updateStorage() {
    if (this.user) {
      this.users.edit(this.user.id, {
        items: this.items.getData(),
        categories: this.categories.getData(),
      });
    }
    const users = this.users.getData();
    const sessions = this.sessions.getData();
    const token = this.token;
    this.storage.data = { users, sessions, token };
  }
}
