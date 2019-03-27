import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, FormLabel, Form } from 'react-bootstrap';
import { setEmailValue, setPasswordValue, setAuthToken } from '../../actions/actionLogin';
import { getJwtBearer } from '../../services/serviceWorker';
import { getLoginControllerUrl } from '../../constants/constants';

class LoginBox extends Component {
  static propTypes = {
    history: PropTypes.object,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    bearerToken: PropTypes.string.isRequired,
    setEmailValue: PropTypes.func,
    setPasswordValue: PropTypes.func,
    setAuthToken: PropTypes.func,
  }

  navigate = () => {
    this.props.history.push('BackOffice');
  }

  validateForm = () => this.props.email.length > 0 && this.props.password.length > 0

  handleChange = (event) => {
    const { id, value } = event.target;
    if (id === 'email') this.props.setEmailValue(value);
    if (id === 'password') this.props.setPasswordValue(value);
  }

  handleSubmit = (event) => event.preventDefault();

  onClick = () => {
    const { email, password } = this.props;
    const user = { email, password };
    const url = getLoginControllerUrl();
    this.getToken(user, 'POST', url).then(this.navigate());
  }

  getToken = (user, method, url) => getJwtBearer(user, method, url)
    .then(response => this.props.setAuthToken(response.text));

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.props.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={this.props.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          onClick={this.onClick}
        >
          Login
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  password: state.loginReducer.password,
  bearerToken: state.loginReducer.bearerToken,
});

export default connect(mapStateToProps, {
  setEmailValue, setPasswordValue, setAuthToken,
})(LoginBox);
