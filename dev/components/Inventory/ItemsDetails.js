import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { actions as itemsActions } from '../../redux/items';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Badge from 'reactstrap/lib/Badge';
import Button from 'reactstrap/lib/Button';
import ButtonGroup from 'reactstrap/lib/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import ItemsImage from './ItemsImage';
import styled from 'styled-components';

const Title = styled.h4`
  font-size: 24px;
  font-weight: bold;
  margin: 10px auto;
`;

const Description = styled.p`
  font-size: 24px;
  color: #868686;
`;

const Price = styled(Badge)`
  border-radius: 15px;
  background: #6b6b6b;
  color: #dedede;
  font-size: 28px;
`;

const Quantity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin: auto;
  margin-bottom: 15px;
  background: #359fe0;
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
`;

const BorderBox = styled.div`
  border-top: 2px solid #d9d9d9;
  @media (min-width: 576px) {
    & .row > div:first-child {
      border-right: 2px solid #d9d9d9;
    }
  }
`;

export class ItemsDetails extends Component {
  state = { item: null };
  handleQuantiy = increment => () => {
    const { id, quantity } = this.state.item;
    const newQuantity = quantity + increment;
    this.props.dispatch(
      itemsActions.edit(id, { quantity: newQuantity < 0 ? 0 : newQuantity })
    );
  };
  getItem = () => {
    const { id, items } = this.props;
    if (items) {
      const item = items.filter(i => i.id == id)[0];
      this.setState({ item });
    }
  };
  componentDidMount() {
    this.getItem();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.id !== prevProps.id ||
      this.props.items !== prevProps.items
    ) {
      this.getItem();
    }
  }
  render() {
    const { item } = this.state;
    if (!item)
      return (
        <div className="text-center text-secondary mt-3 py-4 bg-light">
          <FontAwesomeIcon icon={faFileAlt} size="3x" />
          <h4>Select product</h4>
        </div>
      );
    return (
      <Fragment>
        <Title>{item.name}</Title>
        {item.image && <ItemsImage className="mb-3" src={item.image} />}
        <BorderBox>
          <Row>
            <Col xs={12} sm={8} className="pt-3">
              <Price>${item.price.toFixed(2)}</Price>
              <Description>{item.description}</Description>
            </Col>
            <Col xs={12} sm={4} className="pt-3 text-center">
              <Quantity title="Quantity">{item.quantity}</Quantity>
              <ButtonGroup>
                <Button
                  color="primary"
                  size="lg"
                  onClick={this.handleQuantiy(-1)}>
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <Button
                  color="primary"
                  size="lg"
                  onClick={this.handleQuantiy(+1)}>
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </BorderBox>
      </Fragment>
    );
  }
}

const mapState = ({ items }) => ({ items });
export default connect(mapState)(ItemsDetails);
