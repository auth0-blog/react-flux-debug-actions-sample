import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';

// Support tap event.
injectTapEventPlugin();

// Render application.
React.render(<App />, document.getElementById('app'));
