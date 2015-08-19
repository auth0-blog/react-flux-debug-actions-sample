import { EventEmitter } from 'events';
import { AppDispatcher } from '../dispatch';

export default class BaseStore extends EventEmitter {
  constructor() {
    super();
  }

  subscribe(actionSubscribe) {
    this._dispatchToken = AppDispatcher.register(actionSubscribe());
  }

  get dispatchToken() {
    return this._dispatchToken;
  }

  emitChange() {
    try {
      this.emit('CHANGE');
    } catch (e) {
      console.log('Error:', e);
    }
  }

  addChangeListener(cb) {

    this.on('CHANGE', cb);
  }

  removeChangeListener(cb) {
    this.removeListener('CHANGE', cb);
  }
}
