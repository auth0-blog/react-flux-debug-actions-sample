import { LOAD_DEBUG_SESSIONS, LOAD_DEBUG_SESSIONS_SUCCESS, LOAD_DEBUG_SESSIONS_FAILED, START_DEBUG, STOP_DEBUG } from '../constants/ActionTypes';
import BaseStore from './BaseStore';

import debug from '../debug';

class DebugSessionsStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._error = null;
    this._sessions = null;
    this._loading = false;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case LOAD_DEBUG_SESSIONS:
        this._loading = true;
        this._error = null;
        this.emitChange();
        break;
      case LOAD_DEBUG_SESSIONS_SUCCESS:
        this._loading = false;
        this._sessions = action.sessions;
        this.emitChange();
        break;
      case LOAD_DEBUG_SESSIONS_FAILED:
        this._loading = false;
        this._error = action.error;
        this._sessions = null;
        this.emitChange();
        break;
      case START_DEBUG:
        debug.isActive = true;
        this._debugging = true;
        this.emitChange();
        break;
      case STOP_DEBUG:
        debug.isActive = false;
        this._debugging = false;
        this.emitChange();
        break;
      default:
        break;
    }
  }

  get debugging() {
    return this._debugging;
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }

  get sessions() {
    return this._sessions;
  }
}

export default new DebugSessionsStore();
