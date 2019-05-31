import React, { Component } from 'react';
import { connect } from 'react-redux';
import UncontrolledDropdown from 'reactstrap/lib/UncontrolledDropdown';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle';
import { inventoryApp } from '../../redux/';
import { actions as userActions } from '../../redux/user';
import { actions as itemsActions } from '../../redux/items';
import { actions as categoriesActions } from '../../redux/categories';

export class UserMenu extends Component {
  handleSignOut = () => {
    inventoryApp.signOut();
    this.props.dispatch(userActions.get());
    this.props.dispatch(itemsActions.get());
    this.props.dispatch(categoriesActions.get());
  };

  render() {
    const { nav, inNavbar, color } = this.props;
    return (
      <UncontrolledDropdown nav={nav} inNavbar={inNavbar}>
        <DropdownToggle nav={nav} color={color} caret>
          <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
          {this.props.user}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.handleSignOut}>Sign Out</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

const mapState = ({ user }) => ({ user });
export default connect(mapState)(UserMenu);
