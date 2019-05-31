import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import styled from 'styled-components';
import Header from '../components/Layout/Header';
import ItemsAddForm from '../components/Inventory/ItemsAddForm';
import ItemsList from '../components/Inventory/ItemsList';
import ItemsDetails from '../components/Inventory/ItemsDetails';
import Categories from '../components/Inventory/Categories';
import { actions as itemsActions } from '../redux/items';
import { actions as categoriesActions } from '../redux/categories';

const Title = styled.h3`
  color: #359fe0;
  text-transform: uppercase;
  font-size: 22px;
  font-weight: bold;
  border-bottom: 2px solid #359fe0;
  padding-bottom: 10px;
  margin: 15px auto;
`;

export class Inventory extends Component {
  state = {
    categoriesModal: false,
    currentItem: null,
  };

  handleCategoriesModal = e => {
    e.preventDefault();
    this.setState(prevState => ({
      categoriesModal: !prevState.categoriesModal,
    }));
  };

  handleDetails = id => this.setState({ currentItem: id });

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(itemsActions.get());
    dispatch(categoriesActions.get());
  }

  render() {
    const { pathname } = this.props.location;
    return (
      <div className="w-100 pt-5">
        <Header location={pathname} />
        <Container>
          <Card className="my-4 border-0 rounded-0 shadow">
            <CardBody>
              {pathname == '/inventory' ? (
                <Row>
                  <Col xs={12} lg={7}>
                    <Title>Product list</Title>
                    <ItemsList handleDetails={this.handleDetails} />
                  </Col>
                  <Col xs={12} lg={5}>
                    <Title>Product details</Title>
                    <ItemsDetails id={this.state.currentItem} />
                  </Col>
                </Row>
              ) : (
                <Fragment>
                  <Title>New product</Title>
                  <ItemsAddForm />
                  <a href="" onClick={this.handleCategoriesModal}>
                    Set up categories
                  </a>
                </Fragment>
              )}
            </CardBody>
          </Card>
        </Container>
        <Categories
          open={this.state.categoriesModal}
          toggle={this.handleCategoriesModal}
        />
      </div>
    );
  }
}

export default connect()(Inventory);
