import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux';
import GlobalStyles from './components/Layout/Styles';
import Routes from './components/Routes';

const AppContainer = () => (
  <Provider store={store}>
    <GlobalStyles />
    <Routes />
  </Provider>
);

ReactDOM.render(<AppContainer />, document.querySelector('#app'));
