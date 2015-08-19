import React from 'react';
import { Snackbar, LinearProgress } from 'material-ui';

import Error from './Error';
import Ticket from './Ticket';
import LoadingItems from './LoadingItems';
import TicketStore from '../stores/TicketStore';
import TicketActions from '../actions/TicketActions';

export default class Tickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getTicketState();
    this._onChange = this._onChange.bind(this);
  }

  getTicketState() {
    return {
      tickets: TicketStore.tickets,
      error: TicketStore.error,
      loading: TicketStore.loading
    };
  }

  componentDidMount() {
    TicketStore.addChangeListener(this._onChange);

    if (!this.state.tickets) {
      TicketActions.loadOpenTickets();
    }
  }

  componentWillUnmount() {
    TicketStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getTicketState());
  }

  render() {
    let renderTickets = () => {
      if (this.state.tickets) {
        return this.state.tickets.map((ticket, index) => {
          return <Ticket key={`ticket_${index}`} ticket={ticket} onCloseTicket={() => TicketActions.close(ticket)} />;
        });
      } else {
        return <div></div>
      }
    };

    return (
      <div id="tickets-page">
        <h2 className="title">Open Tickets</h2>
        <Error error={this.state.error} />
        <LoadingItems loading={this.state.loading} items={this.state.tickets} itemsNotLoaded='Tickets not loaded.' itemsEmpty='There are no open tickets, all is good!'>
        { renderTickets() }
        </LoadingItems>
      </div>
    );
  }
}
