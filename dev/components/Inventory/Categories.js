import React, { Component } from 'react';
import { connect } from 'react-redux';
import Col from 'reactstrap/lib/Col';
import Button from 'reactstrap/lib/Button';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/faFolderOpen';
import { RowXS as Row } from '../Layout/Row';
import Form from '../Form';
import Input from '../Form/Input';
import { errorMessages } from '../Form/validation';
import { actions as categoriesActions } from '../../redux/categories';

export class Categories extends Component {
  onSubmit = data => {
    this.props.dispatch(categoriesActions.add(data));
    this.form.reset();
  };

  handleRemove = id => () => {
    if (
      confirm(
        'Are you sure you want to delete this category? \n' +
          'All products in this category will be deleted'
      )
    ) {
      this.props.dispatch(categoriesActions.remove(id));
    }
  };

  render() {
    const { open, toggle, categories } = this.props;
    return (
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Set up categories</ModalHeader>
        {categories && categories.length ? (
          <ListGroup flush>
            {categories.map(i => (
              <ListGroupItem
                key={i.id}
                className="d-flex justify-content-between align-items-center">
                {i.name}
                <Button
                  color="danger"
                  size="sm"
                  onClick={this.handleRemove(i.id)}>
                  <FontAwesomeIcon icon={faTimes} fixedWidth />
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        ) : (
          <ModalBody>
            <div className="text-center text-secondary py-4 bg-light">
              <FontAwesomeIcon icon={faFolderOpen} size="3x" />
              <h4>No categories</h4>
            </div>
          </ModalBody>
        )}
        <ModalFooter className="d-block pb-0">
          <Form onSubmit={this.onSubmit} innerRef={node => (this.form = node)}>
            <Row>
              <Col xs={8} sm={9}>
                <Input
                  type="text"
                  name="name"
                  validations="notEmpty,maxTrimLength:128"
                  validationErrors={{
                    ...errorMessages,
                    maxTrimLength: errorMessages.maxLength(128),
                  }}
                  required
                />
              </Col>
              <Col xs={4} sm={3}>
                <Button type="submit" color="primary" block>
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapState = ({ categories }) => ({ categories });
export default connect(mapState)(Categories);
