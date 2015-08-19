import './Login.css';

import { TextField, FlatButton } from 'material-ui';

import React from 'react';
import ReplyIcon from 'material-ui/lib/svg-icons/action/assignment';

import LoginActions from '../actions/LoginActions';

export default class Login extends React.Component {
  _onLogin() {
    LoginActions.login(this.refs.username.getValue(), this.refs.password.getValue());
  }

  render() {
    return (
      <div id="login-form">
        <TextField
          ref='username'
          floatingLabelText='Username'
          multiLine={false}
          fullWidth={true} />
        <TextField
          ref='password'
          floatingLabelText='Password'
          multiLine={false}
          fullWidth={true}
          type="password" />
        <div style={{ float: 'right' }}>
          <FlatButton id="login-button" label="Login" onClick={() => this._onLogin() }  />
        </div>
      </div>
    );
  }
}
