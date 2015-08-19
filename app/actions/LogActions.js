import httpClient from '../httpClient';
import uuid from 'node-uuid';

const SESSION_ID = uuid.v4();

export default {
  log: (action) => {
    console.log('Action:', action);

    if (!action.debug) {
      httpClient.post(null, { url: `/sessions/${SESSION_ID}/logs`, data: action }).catch(err => {
        console.log('Error sending log:', err);
      });
    }
  }
};
