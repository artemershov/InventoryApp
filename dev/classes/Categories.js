import List from './List';
import without from 'lodash/without';

export class Category {
  constructor(id, { name, items = [], uid }) {
    this.id = id;
    this.name = name;
    this.items = items;
    this.uid = uid;
  }
}

export default class CategoriesList extends List {
  constructor(data) {
    super(data);
  }
  add(data) {
    const item = new Category(this.lastId + 1, data);
    return super.add(item);
  }
  edit(id, data) {
    const item = new Category(id, { ...this.list[id], ...data });
    this.setList({ ...this.list, [id]: item });
    return id;
  }
  getCategories() {
    return this.order.map(i => this.list[i]);
  }
  itemAdd(gid, id) {
    const category = this.list[gid];
    const items = [...category.items, id];
    this.setList({ ...this.list, [gid]: { ...category, items } });
    return id;
  }
  itemRemove(gid, id) {
    const category = this.list[gid];
    const items = without(category.items, id);
    this.setList({ ...this.list, [gid]: { ...category, items } });
    return id;
  }
}
