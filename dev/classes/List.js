import omit from 'lodash/omit';
import without from 'lodash/without';

export default class List {
  constructor(data = null) {
    this.list = {};
    this.order = [];
    this.lastId = 0;
    if (data) this.setData(data);
  }
  getList() {
    return { ...this.list };
  }
  getOrder() {
    return [...this.order];
  }
  getLastId() {
    return this.lastId;
  }
  getData() {
    return {
      list: this.getList(),
      order: this.getOrder(),
      lastId: this.getLastId(),
    };
  }
  setList(data) {
    this.list = data;
  }
  setOrder(data) {
    this.order = data;
  }
  setLastId(id) {
    this.lastId = id;
  }
  setData({ list = null, order = null, lastId = null }) {
    if (list) this.setList(list);
    if (order) this.setOrder(order);
    if (lastId) this.setLastId(lastId);
  }
  add(data) {
    const lastId = this.lastId + 1;
    const list = { ...this.list, [lastId]: data };
    const order = [...this.order, lastId];
    this.setData({ list, order, lastId });
    return lastId;
  }
  edit(id, data) {
    const item = this.list[id];
    this.setList({ ...this.list, [id]: { ...item, ...data } });
    return id;
  }
  remove(id) {
    const list = omit(this.list, id);
    const order = without(this.order, id);
    this.setData({ list, order });
    return id;
  }
}
