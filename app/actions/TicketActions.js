import httpClient from '../httpClient';
import dispatch from '../dispatch';
import { LOAD_OPEN_TICKETS, CLOSE_TICKET } from '../constants/ActionTypes';

export default {
  loadOpenTickets: (action) => {
    httpClient.get(LOAD_OPEN_TICKETS, { url: '/tickets' }, (res) => {
      return { tickets: res.body };
    });
  },

  close: (ticket) => {
    httpClient.post(CLOSE_TICKET, { url: '/tickets/close', data: ticket }, () => {
      return { ticket };
    });
  }
};
