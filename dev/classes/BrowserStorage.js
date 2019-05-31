export default class BrowserStorage {
  constructor(name, isSession = false) {
    this.name = name;
    try {
      this.storage = isSession ? sessionStorage : localStorage;
    } catch (e) {
      throw new Error('No access to storage');
    }
  }

  get() {
    return JSON.parse(this.storage.getItem(this.name));
  }

  set(data) {
    return this.storage.setItem(this.name, JSON.stringify(data));
  }

  remove() {
    return this.storage.removeItem(this.name);
  }

  get data() {
    return this.get();
  }

  set data(data) {
    return this.set(data);
  }
}
