import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button, FormGroup, FormControl, FormLabel, Form,
} from 'react-bootstrap';
import emailRegex from 'email-regex';
import passwordValidator from 'password-validator';
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
    debugger;
    if (this.validateForm()) {
      this.props.history.push('BackOffice');
    }
  }

  validateForm = () => {
    const schema = new passwordValidator();
    schema.is().min(8)
      .is().max(100)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits()
      .has()
      .not()
      .spaces()
      .is()
      .not()
      .oneOf(['Passw0rd', 'Password123']);

    if (this.props.email.length > 0 && this.props.password.length > 0) {
      if (!emailRegex().test(this.props.email) || !schema.validate(this.props.password)) {
        return false;
      }
      return true;
    }
    return false;
  }

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
    .then(response => this.props.setAuthToken(response.text))
    .catch(e => {
      const message = `${e.message} Invalid values. Retry it`;
      alert(message);
    })

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
