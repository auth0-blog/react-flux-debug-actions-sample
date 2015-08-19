import React from 'react';

import Error from './Error';
import LoadingItems from './LoadingItems';
import DebugSession from './DebugSession';

import DebugSessionsStore from '../stores/DebugSessionsStore';
import DebugSessionActions from '../actions/DebugSessionActions';

export default class DebugSessionOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getSessionsState();
    this._onChange = this._onChange.bind(this);
  }

  getSessionsState() {
    return {
      sessions: DebugSessionsStore.sessions,
      error: DebugSessionsStore.error,
      loading: DebugSessionsStore.loading
    };
  }

  componentDidMount() {
    DebugSessionsStore.addChangeListener(this._onChange);
    DebugSessionActions.loadSessions();
  }

  componentWillUnmount() {
    DebugSessionsStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getSessionsState());
  }

  render() {
    let renderSessions = () => {
      if (this.state.sessions) {
        return Object.keys(this.state.sessions).map((sessionId, index) => {
          let session = this.state.sessions[sessionId];
          return <DebugSession key={index} sessionId={sessionId} session={session} onDebugSession={(sid, s, action) => DebugSessionActions.debugSession(session, action)} />
        });
      } else {
        return <div></div>
      }
    };

    return (
      <div id="sessions-dialog" style={{minHeight: '500px'}}>
        <Error error={this.state.error} />
        <LoadingItems loading={this.state.loading} items={this.state.sessions} itemsNotLoaded='Sessions not loaded.' itemsEmpty='There are sessions available!'>
          { renderSessions() }
        </LoadingItems>
      </div>
    );
  }
}
