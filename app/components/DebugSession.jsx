import React from 'react';
import { Card, CardText, CardActions, CardHeader, Styles, List, ListItem, Avatar, FlatButton } from 'material-ui';
let { Colors } = Styles;

export default class DebugSession extends React.Component {
  static propTypes: {
    sessionId: PropTypes.string.required,
    session: PropTypes.object.required,
    onDebugSession: PropTypes.func.required
  }

  _onDebugClicked() {
    this.props.onDebugSession(this.props.sessionId, this.props.session);
  }

  render() {
    return (
      <div style={{marginBottom: '10px'}}>
        <Card>
          <CardHeader
            title={`Session: ${this.props.sessionId}`}
            subtitle={`User: ${this.props.session.user} | Start: ${this.props.session.start}`}
            avatar={<Avatar backgroundColor={Colors.blue500}>S</Avatar>} />
          <CardText style={{paddingTop: '0px', paddingBottom: '0px', paddingLeft: '20px'}}>
            <List insetSubheader={false}>
              {
                this.props.session.actions.map((action, index) => {
                  return (
                    <ListItem key={index} leftAvatar={<Avatar backgroundColor={Colors.yellow600}>A</Avatar>} secondaryText={action.added}>
                      {action.actionType}
                    </ListItem>
                  );
                })
              }
            </List>
          </CardText>
          <CardActions>
            <FlatButton label="Debug Session" onTouchTap={() => this._onDebugClicked()}/>
          </CardActions>
        </Card>
      </div>
    );
  }
}
