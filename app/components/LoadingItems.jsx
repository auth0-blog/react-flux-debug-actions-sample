import React from 'react';
import { LinearProgress } from 'material-ui';

export default class LoadingItems extends React.Component {
  static propTypes: {
    loading: PropTypes.boolean,
    items: PropTypes.object.required,
    itemsNotLoaded: PropTypes.string.required,
    itemsEmpty: PropTypes.string.required
  }

  render() {
    if (this.props.loading) {
      return <LinearProgress mode="indeterminate" />;
    } else if (this.props.items === null) {
      return <p>{ this.props.itemsNotLoaded }</p>;
    } else if (this.props.items.length === 0) {
      return <p>{ this.props.itemsEmpty }</p>;
    }
    else {
      return <div>{this.props.children}</div>;
    }
  }
}
