import React from 'react';
import ReplyIcon from 'material-ui/lib/svg-icons/action/assignment';

import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, Styles } from 'material-ui';

export default class Error extends React.Component {
  static propTypes: {
    error: PropTypes.object
  }

  render() {
    if (this.props.error) {
      return <div style={{backgroundColor: Colors.red500, padding: '10px'}}>
          {this.props.error.message || this.props.error}
        </div>;
    }
    else {
      return <div></div>;
    }
  }
}
