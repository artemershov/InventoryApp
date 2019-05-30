import { inventoryApp } from './index';
import { actions as categoriesActions } from './categories';
import { actions as itemsActions } from './items';

export const actionTypes = {
  get: 'USER_GET',
  add: 'USER_ADD',
  edit: 'USER_EDIT',
  remove: 'USER_REMOVE',
};

const getData = () => {
  return inventoryApp.user ? inventoryApp.user.name : null;
};

export const actions = {
  get: () => dispatch => {
    dispatch({ type: actionTypes.get, data: getData() });
  },
  add: data => dispatch => {
    inventoryApp.userAdd(data);
    dispatch({ type: actionTypes.add, data: getData() });
  },
  edit: data => dispatch => {
    inventoryApp.userEdit(data);
    dispatch({ type: actionTypes.edit, data: getData() });
  },
  remove: password => dispatch => {
    inventoryApp.userRemove(password);
    dispatch({ type: actionTypes.remove, data: getData() });
    dispatch(categoriesActions.get());
    dispatch(itemsActions.get());
  },
};

export const reducer = (state = null, action) => {
  if (Object.values(actionTypes).includes(action.type)) return action.data;
  return state;
};
