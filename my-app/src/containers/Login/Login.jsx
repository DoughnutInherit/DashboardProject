import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginBox from '../../components/LoginBox/LoginBox';
import './Login.css';


class Login extends Component {
  static propTypes = {
    history: PropTypes.object,
  };

  render() {
    return (
      <div className="Login">
        <LoginBox history={this.props.history} />
      </div>
    );
  }
}


export default Login;
