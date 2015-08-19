import httpClient from '../httpClient';
import dispatch from '../dispatch';
import { LOGIN, } from '../constants/ActionTypes';

export default {
  login: (username, password) => {
    httpClient.post(LOGIN, { url: '/login', data: { username, password } }, (res) => {
      return { username: res.body.username, sessionId: res.body.sessionId };
    });
  }
};
