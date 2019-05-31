import React, { Component } from 'react';
import { connect } from 'react-redux';
import Col from 'reactstrap/lib/Col';
import Alert from 'reactstrap/lib/Alert';
import Button from 'reactstrap/lib/Button';
import ItemsImage from './ItemsImage';
import { RowXS as Row } from '../Layout/Row';
import Form from '../Form';
import Input from '../Form/Input';
import Select from '../Form/Select';
import { errorMessages } from '../Form/validation';
import { actions as itemsActions } from '../../redux/items';

export class ItemsAddForm extends Component {
  state = {
    data: null,
    alert: null,
  };

  onChange = data => this.setState({ data });

  onSubmit = data => {
    this.props.dispatch(itemsActions.add(data));
    this.form.reset();
    this.showAlert();
  };

  showAlert = () => {
    this.setState({
      alert: setTimeout(() => this.setState({ alert: null }), 3000),
    });
  };

  componentWillUnmount() {
    if (this.state.alert) clearTimeout(this.state.alert);
  }

  render() {
    const { categories } = this.props;
    return (
      <Row>
        <Col xs={12} lg={7}>
          <Form
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            innerRef={node => (this.form = node)}>
            {this.state.alert && (
              <Alert className="border-0 rounded-0" color="success">
                Product successfully added
              </Alert>
            )}
            <Row>
              <Col xs={12} sm={6}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  validations="notEmpty,maxTrimLength:128"
                  validationErrors={{
                    ...errorMessages,
                    maxTrimLength: errorMessages.maxLength(128),
                  }}
                  required
                />
              </Col>
              <Col xs={6} sm={3}>
                <Input
                  type="number"
                  name="price"
                  placeholder="Price"
                  step="0.01"
                  min="0"
                  validations="isNumeric,min:0"
                  validationErrors={{
                    ...errorMessages,
                    min: errorMessages.min(0),
                  }}
                  required
                />
              </Col>
              <Col xs={6} sm={3}>
                <Input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  step="1"
                  min="0"
                  validations="isNumeric,min:0"
                  validationErrors={{
                    ...errorMessages,
                    min: errorMessages.min(0),
                  }}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6}>
                <Select name="gid" required>
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories &&
                    categories.map(i => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                </Select>
              </Col>
              <Col xs={12} sm={6}>
                <Input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  validations="isUrl"
                  validationErrors={errorMessages}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={9}>
                <Input
                  type="textarea"
                  name="description"
                  placeholder="Description"
                  validations="notEmpty,maxTrimLength:500"
                  validationErrors={{
                    ...errorMessages,
                    maxTrimLength: errorMessages.maxLength(500),
                  }}
                  required
                />
              </Col>
              <Col xs={12} sm={3}>
                <div className="form-group">
                  <Button type="submit" color="primary" block>
                    Add
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col xs={12} lg={5}>
          <div className="form-group">
            <ItemsImage src={this.state.data && this.state.data.image} />
          </div>
        </Col>
      </Row>
    );
  }
}

const mapState = ({ categories }) => ({ categories });
export default connect(mapState)(ItemsAddForm);
