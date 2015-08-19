import Dispatcher from './dispatcher';
import LogActions from './actions/LogActions';

// Export the dispatch method.
export default function dispatch(action) {
  Dispatcher.dispatch(action);
  LogActions.log(action);
}
