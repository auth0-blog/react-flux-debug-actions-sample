var _ = require('lodash');
var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var http = require('http');
var bodyParser = require('body-parser');
var logger = require('./logger');

var app = express();
app.use(morgan(':method :url :status :response-time ms - :res[content-length]', { stream: logger.stream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var tickets = [
  {
    id: 1000,
    status: 'Open',
    title: 'Social Authentication',
    userInitials: 'JD',
    assignedTo: 'gonto',
    shortDescription: 'Hey there, I would like my users to authenticate with....',
    description: 'Hey there, I would like my users to authenticate with Facebook and Twitter. I\'m using AngularJS, how can I do this?',
    replies: [
      {
        user: 'Gonto',
        message: '<p>Hi John, thanks for reaching out.</p><p>Have you seen our library for AngularJS?</p><p><a href="https://github.com/auth0/auth0-angular">https://github.com/auth0/auth0-angular</a></p>'
      }
    ]
  },
  {
    id: 1001,
    status: 'Open',
    title: 'AD on iOS',
    userInitials: 'KL',
    assignedTo: '',
    shortDescription: 'Hey there, we would like to use Active Directory...',
    description: 'Hey there, we would like to use Active Directory authentication in our iOS app, can you help?'
  },
  {
    status: 'Open',
    title: 'Developer account?',
    userInitials: 'R',
    assignedTo: '',
    shortDescription: 'Auth0 looks really useful but at the moment we\'re still in...',
    description: 'Auth0 looks really useful but at the moment we\'re still in development phase. Is there any way we can use a free account or something similar?',
    replies: [
      {
        user: 'Gonto',
        message: '<p>Hi Roger, thanks for reaching out.</p><p>On auth0.com you can simply sign up for a free developer account. You will only need to upgrade this account to a paid account whenever you move to production.</p>'
      }
    ]
  }
];

// In memory storage for sessions and action logs.
var sessions = { };

/*
 * Fake login implementation.
 */
app.post('/login', function(req, res, next) {
  var sessionId = Math.floor(Math.random() * 9999) + 1000;
  sessions[sessionId] = {
    user: req.body.username,
    start: new Date(),
    actions: []
  };

  return res.json({
    username: req.body.username,
    sessionId: sessionId
  });
});


app.get('/tickets', function(req, res, next) {
  setTimeout(function() { res.json(tickets); }, 3000);
});

/*
 * Close a ticket.
*/
app.post('/tickets/close', function(req, res, next) {
  if (!req.body || !req.body.id) {
    res.status(400);
    return res.json({ message: 'Error, the ticket ID is required when you close a ticket.'});
  }

  logger.info('Deleting ticket:', req.body.id);

  var i = _.findIndex(tickets, function(ticket) { return ticket.id === req.body.id; });
  if (i > -1) {
    tickets.splice(i, 1);
  }

  setTimeout(function() { res.sendStatus(200); }, 3000);
});

/*
 * Expose all sessions.
 */
app.get('/sessions', function(req, res) {
  setTimeout(function() { res.json(sessions); }, 3000);
});

/*
 * Save an action.
 */
app.post('/sessions/:sessionId/logs', function(req, res, next) {
  var action = req.body;
  action.added = new Date();

  sessions[req.params.sessionId].actions.push(action);

  logger.info('New action logged:\r\n', JSON.stringify(action, null, 2));
  res.sendStatus(200);
});

var port = process.env.PORT || 3001;
http.createServer(app).listen(port, function (err) {
  if (err) {
    logger.error(err);
  }
  else {
    logger.info('Listening on http://localhost:' + port);
  }
});
