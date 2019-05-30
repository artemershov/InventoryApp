import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux';
import GlobalStyles from './components/Layout/Styles';
import Routes from './components/Routes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const AppContainer = () => (
  <Provider store={store}>
    <GlobalStyles />
    <Routes />
  </Provider>
);

ReactDOM.render(<AppContainer />, document.querySelector('#app'));
