import React from 'react';
import ReplyIcon from 'material-ui/lib/svg-icons/action/assignment';

import { ListItem, Avatar } from 'material-ui';

export default class Reply extends React.Component {
  render() {
    let svgAvatar = <Avatar icon={<ReplyIcon />} />;
    return (
      <div className="reply-item">
        <ListItem leftAvatar={svgAvatar} disabled={true} style={{ paddingTop: '10px' }}>
          <h3>Reply by: <strong>{this.props.user}</strong></h3>
          <span style={{fontSize: '14px'}} dangerouslySetInnerHTML={{ __html: this.props.message }} />
        </ListItem>
      </div>
    );
  }
}
