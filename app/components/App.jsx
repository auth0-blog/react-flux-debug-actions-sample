import './App.css';
import React from 'react';
import { AppCanvas, AppBar, Styles, FlatButton } from 'material-ui';

import Tickets from './Tickets';
import DebugSessionDialog from './DebugSessionDialog';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.themeManager = new Styles.ThemeManager();
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

  render () {
    return (
      <AppCanvas>
        <AppBar title={"Support Ticket Manager"} iconElementRight={ <FlatButton label="Debug" onTouchTap={() => this._onDebugClicked()} /> } />
        <DebugSessionDialog ref='debugDialog' />
        <div id="page">
          <Tickets />
        </div>
      </AppCanvas>
    );
  }
}
