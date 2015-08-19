import { LOAD_OPEN_TICKETS, LOAD_OPEN_TICKETS_SUCCESS, LOAD_OPEN_TICKETS_FAILED, CLOSE_TICKET, CLOSE_TICKET_SUCCESS, CLOSE_TICKET_FAILED, RESET } from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import _ from 'lodash';

class TicketStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._error = null;
    this._tickets = null;
    this._loading = false;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case RESET:
        this._loading = true;
        this._error = null;
        this.emitChange();
        break;
      case LOAD_OPEN_TICKETS:
        this._loading = true;
        this._error = null;
        this.emitChange();
        break;
      case LOAD_OPEN_TICKETS_SUCCESS:
        this._loading = false;
        this._tickets = action.tickets;
        this.emitChange();
        break;
      case LOAD_OPEN_TICKETS_FAILED:
        this._loading = false;
        this._error = action.error;
        this._tickets = null;
        this.emitChange();
        break;
      case CLOSE_TICKET:
        this._loading = true;
        this.emitChange();
        break;
      case CLOSE_TICKET_SUCCESS:
        this._loading = false;
        var i = _.findIndex(this._tickets, (ticket) => ticket.id === action.ticket.id);
        if (i > -1) {
          this.tickets.splice(i, 1);
        }
        this.emitChange();
        break;
      case CLOSE_TICKET_FAILED:
        this._loading = false;
        this._error = action.error;
        this.emitChange();
        break;
      default:
        break;
    }
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }

  get tickets() {
    return this._tickets;
  }
}

export default new TicketStore();
