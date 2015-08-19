import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

export default class BaseStore extends EventEmitter {
  constructor() {
    super();
  }

  subscribe(actionSubscribe) {
    this._dispatchToken = dispatcher.register(actionSubscribe());
  }

  get dispatchToken() {
    return this._dispatchToken;
  }

  emitChange() {
    setTimeout(() => this.emit('CHANGE'), 0);
  }

  addChangeListener(cb) {

    this.on('CHANGE', cb);
  }

  removeChangeListener(cb) {
    this.removeListener('CHANGE', cb);
  }
}
