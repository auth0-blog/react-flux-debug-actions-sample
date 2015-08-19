import React from 'react';
import { Card, CardHeader, CardActions, FlatButton, CardText, Avatar } from 'material-ui';

import Replies from './Replies';

export default class Ticket extends React.Component {
  static propTypes: {
    ticket: PropTypes.object.required,
    onCloseTicket: PropTypes.func.required
  }

  _closeTicket() {
    this.props.onCloseTicket();
  }

  renderReplies() {
    if (this.props.ticket.replies && this.props.ticket.replies.length > 0) {
      return (
        <CardText expandable={true} style={{paddingTop: '0px', paddingBottom: '0px', paddingLeft: '20px'}}>
          <Replies replies={this.props.ticket.replies} />
        </CardText>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <div className="ticket-item">
        <Card initiallyExpanded={false}>
          <CardHeader
            title={this.props.ticket.title}
            subtitle={this.props.ticket.shortDescription}
            avatar={<Avatar style={{ color: 'green' }}>{this.props.ticket.userInitials}</Avatar>}
            showExpandableButton={true}>
          </CardHeader>
          <CardText expandable={true}>
            {this.props.ticket.description}
          </CardText>
          {this.renderReplies()}
          <CardText expandable={true}>
            <span>Assigend To: <strong>{this.props.ticket.assignedTo || 'N/A'}</strong></span>
            <br />
            <span>Status: <strong>{this.props.ticket.status}</strong></span>
          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Close"  onTouchTap={() => this._closeTicket()} />
          </CardActions>
        </Card>
      </div>
    );
  }
}
