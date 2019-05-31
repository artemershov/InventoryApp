import App from '../classes/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { reducer as userReducer } from './user';
import { reducer as itemsReducer } from './items';
import { reducer as categoryReducer } from './categories';

export const inventoryApp = new App();

const initialState = {
  user: inventoryApp.user ? inventoryApp.user.name : null,
  items: inventoryApp.items ? inventoryApp.items.getItems() : null,
  categories: inventoryApp.categories
    ? inventoryApp.categories.getCategories()
    : null,
};

const reducers = combineReducers({
  user: userReducer,
  items: itemsReducer,
  categories: categoryReducer,
});

const middlewares = [thunk];
if (process.env.NODE_ENV == 'development') middlewares.push(logger);
const middleware = applyMiddleware(...middlewares);

const store = createStore(reducers, initialState, middleware);

export default store;
