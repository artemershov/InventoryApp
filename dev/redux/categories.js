import { inventoryApp } from './index';
import { actions as itemsActions } from './items';

export const actionTypes = {
  get: 'CATEGORY_GET',
  add: 'CATEGORY_ADD',
  edit: 'CATEGORY_EDIT',
  remove: 'CATEGORY_REMOVE',
};

const getData = () => {
  return inventoryApp.categories
    ? inventoryApp.categories.getCategories()
    : null;
};

export const actions = {
  get: () => dispatch => {
    dispatch({ type: actionTypes.get, data: getData() });
  },
  add: data => dispatch => {
    inventoryApp.categoryAdd(data);
    dispatch({ type: actionTypes.add, data: getData() });
  },
  edit: (id, data) => dispatch => {
    inventoryApp.categoryEdit(id, data);
    dispatch({ type: actionTypes.edit, id, data: getData() });
  },
  remove: id => dispatch => {
    inventoryApp.categoryRemove(id);
    dispatch({ type: actionTypes.remove, data: getData() });
    dispatch(itemsActions.get());
  },
};

export const reducer = (state = null, action) => {
  if (Object.values(actionTypes).includes(action.type)) return action.data;
  return state;
};
