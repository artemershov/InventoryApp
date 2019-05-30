import { inventoryApp } from './index';
import { actions as categoriesActions } from './categories';

export const actionTypes = {
  get: 'ITEM_GET',
  add: 'ITEM_ADD',
  edit: 'ITEM_EDIT',
  remove: 'ITEM_REMOVE',
};

const getData = () => {
  return inventoryApp.items ? inventoryApp.items.getItems() : null;
};

export const actions = {
  get: () => dispatch => {
    dispatch({ type: actionTypes.get, data: getData() });
  },
  add: data => dispatch => {
    inventoryApp.itemAdd(data);
    dispatch({ type: actionTypes.add, data: getData() });
    dispatch(categoriesActions.get());
  },
  edit: (id, data) => dispatch => {
    inventoryApp.itemEdit(id, data);
    dispatch({ type: actionTypes.edit, id, data: getData() });
    dispatch(categoriesActions.get());
  },
  remove: id => dispatch => {
    inventoryApp.itemRemove(id);
    dispatch({ type: actionTypes.remove, data: getData() });
    dispatch(categoriesActions.get());
  },
};

export const reducer = (state = null, action) => {
  if (Object.values(actionTypes).includes(action.type)) return action.data;
  return state;
};
