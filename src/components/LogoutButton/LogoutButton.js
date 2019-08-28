import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cookies from 'js-cookie';
import './LogoutButton.css';
class LogoutButton extends Component {

  static propTypes = {
    history: PropTypes.object,
  }

  componentDidMount(){
    this.logout();
  }

  componentDidUpdate(){
    this.logout();
  }

  getToken = () => this.props.token || cookies.get('token');

  logout = () => {
    if (!this.getToken()) {
      this.props.history.push('Login')
    }
  }

  handleClick = () => {
    cookies.remove('token');
    this.logout();
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <button className="logoutButton fas fa-sign-out-alt" onClick={this.handleClick} title="Log Out" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.loginReducer.bearerToken,
});

export default connect(mapStateToProps, {
})(LogoutButton);