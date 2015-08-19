import React from 'react';
import { Dialog, FlatButton } from 'material-ui';

import DebugSessionOverview from './DebugSessionOverview';
import DebugSessionActions from '../actions/DebugSessionActions';

export default class DebugSessionDialog extends React.Component {
  show() {
    this.refs.dialog.show();
  }

  _close() {
    this.refs.dialog.dismiss();
  }

  render() {
    let actions = [
      <FlatButton
        key={1}
        label="Close"
        secondary={true}
        onTouchTap={() => this._close()} />
    ];

    return (
      <Dialog
        autoScrollBodyContent={true}
        autoDetectWindowHeight={true}
        ref='dialog'
        title="Debug: Sessions Overview"
        modal={true}
        actions={actions}>
        <DebugSessionOverview />
      </Dialog>
    );
  }
}
