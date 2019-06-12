import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import Alert from 'reactstrap/lib/Alert';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
import { responseCodes } from '../classes/Users';
import { actions as userActions } from '../redux/user';
import { inventoryApp } from '../redux/';

export class Auth extends Component {
  state = { status: null };

  onSubmit = data => {
    const trimed = Object.keys(data).reduce((obj, key) => {
      obj[key] = data[key].trim();
      return obj;
    }, {});
    const { location, dispatch } = this.props;
    const action = location.pathname == '/signin' ? 'signIn' : 'signUp';
    const status = inventoryApp[action](trimed);
    this.setState({ status });
    if (status == '0') dispatch(userActions.get());
  };

  onChange = () => this.setState({ status: null });

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({ status: null });
    }
  }

  render() {
    const { status } = this.state;
    const { pathname } = this.props.location;
    const data =
      pathname == '/signin'
        ? {
            title: 'Sign In',
            form: <SignIn onSubmit={this.onSubmit} onChange={this.onChange} />,
            link: <Link to="/signup">Create account</Link>,
          }
        : {
            title: 'Sign Up',
            form: <SignUp onSubmit={this.onSubmit} onChange={this.onChange} />,
            link: <Link to="/signin">Already have an account?</Link>,
          };
    return (
      <Container className="d-flex justify-content-center align-items-center py-4">
        <Row className="justify-content-center w-100">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card className="border-0 rounded-0 shadow">
              <CardBody>
                <h3 className="text-center mb-4">{data.title}</h3>
                {status && (
                  <Alert
                    color={status !== '0' ? 'danger' : 'success'}
                    className="border-0 rounded-0">
                    {responseCodes[status]}
                  </Alert>
                )}
                {data.form}
              </CardBody>
            </Card>
            <div className="text-center mt-3">{data.link}</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect()(Auth);
