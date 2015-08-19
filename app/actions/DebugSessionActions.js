import httpClient from '../httpClient';
import dispatch from '../dispatch';
import { LOAD_DEBUG_SESSIONS, RESET, START_DEBUG, STOP_DEBUG } from '../constants/ActionTypes';

export default {

  loadSessions: () => {
    httpClient.get(LOAD_DEBUG_SESSIONS, { url: '/sessions' }, (res) => {
      return { sessions: res.body, debug: true };
    });
  },

  /*
   * This method will replay a user session with all actions in that session.
   *   - It will send a RESET action to all stores to clear their state.
   *   - It will send a START_DEBUG action to notify that debugging has started (this will for example prevent http requests from being made).
   *   - It will replay all actions.
   *   - It will send a STOP_DEBUG action to notify that debugging has completed (this will for example re-enable http requests).
   */
  debugSession: (session, untilAction) => {
    console.log('Debugging session:', session);

    dispatch({ debug: true, actionType: RESET });
    dispatch({ debug: true, actionType: START_DEBUG });

    // Replay all actions with a delay.
    for (var i = 0; i < session.actions.length; i++) {
      let action = session.actions[i];

      setTimeout(() => {
        console.log(' > Dispatching debug action:', action);
        dispatch({
          ...action,
          debug: true
        });
      }, i * 250);

      if (untilAction && untilAction === action) {
        break;
      }
    }

    dispatch({ debug: true, actionType: STOP_DEBUG });
  }
};
