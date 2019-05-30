import List from './List';

export class Item {
  constructor(
    id,
    { name, description = '', quantity = 0, price, image = null, gid, uid }
  ) {
    this.id = id;
    this.gid = Number(gid);
    this.uid = Number(uid);
    this.name = name;
    this.description = description;
    this.quantity = Number(quantity);
    this.price = Number(price);
    this.image = image;
  }
}

export default class ItemsList extends List {
  constructor(data) {
    super(data);
  }
  add(data) {
    const item = new Item(this.lastId + 1, data);
    return super.add(item);
  }
  edit(id, data) {
    const item = new Item(id, { ...this.list[id], ...data });
    this.setList({ ...this.list, [id]: item });
    return id;
  }
  getItems() {
    return this.order.map(i => this.list[i]);
  }
  search(query) {
    const regexp = new RegExp(query, 'gi');
    return this.getItems().filter(
      item => regexp.test(item.name) || regexp.test(item.description)
    );
  }
}
