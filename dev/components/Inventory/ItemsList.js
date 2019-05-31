import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Input from 'reactstrap/lib/Input';
import InputGroup from 'reactstrap/lib/InputGroup';
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon';
import Button from 'reactstrap/lib/Button';
import Table from 'reactstrap/lib/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons/faBoxOpen';
import styled from 'styled-components';
import { actions as itemsActions } from '../../redux/items';

const FixedTable = styled(Table)`
  @media (max-width: 768px) {
    td,
    th {
      max-width: 200px;
    }
  }
  @media (min-width: 768px) {
    table-layout: fixed;
  }
`;

const Search = styled(InputGroup)`
  border-bottom: 2px solid #d9d9d9;
  :focus-within {
    border-bottom-color: #359fe0;
  }
  .input-group-text {
    color: #d9d9d9;
  }
`;

export class ItemsList extends Component {
  state = {
    filtered: [],
    query: '',
  };

  handleFilter = e => {
    const { items } = this.props;
    const query = e.target.value.trim();
    const regexp = new RegExp(query, 'i');
    const filtered = items.filter(
      item => regexp.test(item.name) || regexp.test(item.description)
    );
    this.setState({ filtered, query });
  };

  handleDetails = item => e => {
    e.preventDefault();
    this.props.handleDetails(item);
  };

  handleRemove = id => () => {
    if (confirm('Are you sure you want to delete this product?')) {
      this.props.dispatch(itemsActions.remove(id));
    }
  };

  render() {
    const { items, categories } = this.props;
    const { query, filtered } = this.state;
    const data = categories
      ? categories.map(cat => ({
        ...cat,
        items: (query ? filtered : items).filter(i =>
          cat.items.includes(i.id)
        ),
      }))
      : [];
    return items && items.length ? (
      <Fragment>
        <Search>
          <InputGroupAddon addonType="prepend">
            <span className="input-group-text border-0 bg-transparent">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </InputGroupAddon>
          <Input
            className="border-0"
            type="text"
            onChange={this.handleFilter}
            placeholder="Filter..."
          />
        </Search>
        <FixedTable className="table-striped table-hover table-borderless table-responsive-md">
          <thead>
            <tr>
              <th className="text-center text-truncate" style={{ width: 150 }}>
                Name
              </th>
              <th className="text-center text-truncate">Description</th>
              <th className="text-center text-truncate" style={{ width: 90 }}>
                Price
              </th>
              <th className="text-center text-truncate" style={{ width: 90 }}>
                Qty.
              </th>
              <th className="text-center text-truncate" style={{ width: 90 }}>
                Remove
              </th>
            </tr>
          </thead>
          {data.map(
            cat =>
              Boolean(cat.items.length) && (
                <tbody key={cat.id}>
                  <tr className="table-primary text-center">
                    <td colSpan="5">
                      <b>{cat.name}</b>
                    </td>
                  </tr>
                  {cat.items.map(i => (
                    <tr key={i.id}>
                      <td className="text-center text-truncate">
                        <a href="" onClick={this.handleDetails(i.id)}>
                          <b>{i.name}</b>
                        </a>
                      </td>
                      <td className="text-left text-truncate">
                        {i.description}
                      </td>
                      <td className="text-center">${i.price.toFixed(2)}</td>
                      <td className="text-center">{i.quantity}</td>
                      <td className="text-center">
                        <Button
                          color="danger"
                          size="sm"
                          onClick={this.handleRemove(i.id)}>
                          <FontAwesomeIcon icon={faTimes} fixedWidth />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )
          )}
          {Boolean(query && !filtered.length) && (
            <tbody>
              <tr>
                <td colSpan="5">
                  <div className="text-center text-secondary py-4">
                    <FontAwesomeIcon icon={faSearch} size="3x" />
                    <h4>Not found</h4>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </FixedTable>
      </Fragment>
    ) : (
      <div className="text-center text-secondary mt-3 py-4 bg-light">
        <FontAwesomeIcon icon={faBoxOpen} size="3x" />
        <h4>No products</h4>
      </div>
    );
  }
}

const mapState = ({ items, categories }) => ({ items, categories });
export default connect(mapState)(ItemsList);
