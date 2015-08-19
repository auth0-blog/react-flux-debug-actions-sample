import httpClient from '../httpClient';
import LoginStore from '../stores/LoginStore'

export default {
  log: (action) => {
    console.log('Action:', action);

    if (LoginStore.sessionId && !action.debug) {
      httpClient.post(null, { url: `/sessions/${LoginStore.sessionId}/logs`, data: action }).catch(err => {
        console.log('Error sending log:', err);
      });
    }
  }
};
