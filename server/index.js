'use strict';

const path = require('path');
const express = require('express');
const session = require('express-session');
const http = require('http');
const uuid = require('uuid');
const { WebSocketServer } = require('ws');

express.Router({ strict: false });

const app = express();
const map = new Map();

const sessionParser = session({
  saveUninitialized: false,
  secret: 'loremipsumdolorsitamet',
  resave: false
});

app.use("/", express.static(path.join(__dirname, '../dist')));
app.use(sessionParser);

app.get('*', function (request, response) {
  response.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.post('/login', function (req, res) {
  const id = uuid.v4();
  console.log(`Updating session for user ${id}`);
  req.session.userId = id;
  res.send({ result: 'OK', message: 'Session updated' });
});

app.delete('/logout', function (request, response) {
  console.log('Destroying session');
  const ws = map.get(request.session.userId);
  request.session.destroy(function () {
    if (ws) ws.close();
    response.send({ result: 'OK', message: 'Session destroyed' });
  });
});

const server = http.createServer(app);
const wss = new WebSocketServer({ clientTracking: false, noServer: true });

server.on('upgrade', function (request, socket, head) {
  console.log('Parsing session from request...');

  sessionParser(request, {}, () => {
    if (!request.session.userId) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    console.log('Session is parsed!');

    wss.handleUpgrade(request, socket, head, function (ws) {
      wss.emit('connection', ws, request);
    });
  });
});

wss.on('connection', function (ws, request) {
  const userId = request.session.userId;
  map.set(userId, ws);

  ws.on('message', function (message) {
    console.log(`Received message ${message} from user ${userId}`);
  });

  ws.on('close', function () {
    map.delete(userId);
  });
});

server.listen(8080, function () {
  console.log('Listening on http://localhost:8080');
});