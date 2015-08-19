import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, RESET } from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import _ from 'lodash';

class LoginStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._error = null;
    this._username = null;
    this._sessionId = null;
    this._loading = false;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case RESET:
        this._error = null;
        this._username = null;
        this._sessionId = null;
        this._loading = false;
        this.emitChange();
        break;
      case LOGIN:
        this._loading = true;
        this._error = null;
        this.emitChange();
        break;
      case LOGIN_SUCCESS:
        this._loading = false;
        this._username = action.username;
        this._sessionId = action.sessionId;
        this.emitChange();
        break;
      case LOGIN_FAILED:
        this._loading = false;
        this._error = action.error;
        this._username = null;
        this._sessionId = null;
        this.emitChange();
        break;
      default:
        break;
    }
  }

  get sessionId() {
    return this._sessionId;
  }

  get username() {
    return this._username;
  }

  get isLoggedIn() {
    return this._username && this._sessionId;
  }
}

export default new LoginStore();
