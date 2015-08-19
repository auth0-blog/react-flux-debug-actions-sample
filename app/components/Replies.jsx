import React from 'react';
import { List } from 'material-ui';

import Reply from './Reply';

export default class Replies extends React.Component {
  render() {
    return (
      <List>
        {
          this.props.replies.map((reply, index) => {
            return (
              <Reply key={`reply_${index}`} user={reply.user} message={reply.message} />
            );
          })
        }
      </List>
    );
  }
}
