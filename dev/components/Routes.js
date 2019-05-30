import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Inventory from '../views/Inventory';
import Auth from '../views/Auth';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        {this.props.user ? (
          <Switch>
            <Route path="/inventory" component={Inventory} />
            <Route path="/newproduct" component={Inventory} />
            <Redirect to="/inventory" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/signin" component={Auth} />
            <Route path="/signup" component={Auth} />
            <Redirect to="/signin" />
          </Switch>
        )}
      </BrowserRouter>
    );
  }
}

const mapState = ({ user }) => ({ user });
export default connect(mapState)(Routes);
