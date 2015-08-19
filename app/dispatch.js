import { Dispatcher } from 'flux';
import LogActions from './actions/LogActions';

// Export the dispatcher.
export const AppDispatcher = new Dispatcher();

// Export the dispatch method.
export default function(action) {
  LogActions.log(action);
  AppDispatcher.dispatch(action);
}
