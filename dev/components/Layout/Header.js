import React, { Component } from 'react';
import Container from 'reactstrap/lib/Container';
import Collapse from 'reactstrap/lib/Collapse';
import Navbar from 'reactstrap/lib/Navbar';
import NavbarToggler from 'reactstrap/lib/NavbarToggler';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons/faBoxOpen';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import styled from 'styled-components';
import UserMenu from './UserMenu';

const Brand = styled(Link)`
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
`;

export class Header extends Component {
  state = { isOpen: false };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const linkClass = url =>
      `nav-link ${this.props.location == url && 'active'}`;
    return (
      <Navbar fixed="top" dark color="primary" expand="md" className="shadow">
        <Container>
          <Brand className="navbar-brand" to="/inventory">
            Inventory App
          </Brand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className={linkClass('/inventory')} to="/inventory">
                  <FontAwesomeIcon icon={faBoxOpen} className="mr-2" />
                  Inventory
                </Link>
              </NavItem>
              <NavItem>
                <Link className={linkClass('/newproduct')} to="/newproduct">
                  <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                  New product
                </Link>
              </NavItem>
              <UserMenu nav inNavbar />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
