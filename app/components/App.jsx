import './App.css';
import React from 'react';
import { AppCanvas, AppBar, Styles, FlatButton, Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui';

import Login from './Login';
import Tickets from './Tickets';
import LoginStore from '../stores/LoginStore';
import DebugSessionDialog from './DebugSessionDialog';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.themeManager = new Styles.ThemeManager();
    this.state = this.getAppState();
    this._onChange = this._onChange.bind(this);
  }

  getAppState() {
    return {
      isLoggedIn: LoginStore.isLoggedIn,
      username: LoginStore.username,
      sessionId: LoginStore.sessionId
    };
  }

  componentDidMount() {
    LoginStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getAppState());
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: this.themeManager.getCurrentTheme()
    };
  }

  _onDebugClicked() {
    this.refs.debugDialog.show();
  }


  renderContent() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <AppBar title={`Support Ticket Manager`} iconElementRight={ <FlatButton label="Debug" onTouchTap={() => this._onDebugClicked()} /> } />
          <Toolbar>
            <ToolbarGroup key={1} float="right">
              <ToolbarTitle text={`${this.state.username} (session: ${this.state.sessionId})`} />
            </ToolbarGroup>
          </Toolbar>
          <DebugSessionDialog ref='debugDialog' />
          <div id="page">
            <Tickets username={this.state.username} sessionId={this.state.sessionId} />
          </div>
        </div>
      );
    }
    else {
      return <Login />;
    }
  }

  render () {
    return (
      <AppCanvas>
        {this.renderContent()}
      </AppCanvas>
    );
  }
}
