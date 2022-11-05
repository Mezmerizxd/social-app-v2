import * as express from 'express';
import Log from './utils/Log';
import Cfg from './cfg';

import Middlewares from './middlewares';
import Data from './data';

import v1 from './api/v1';
import Io from './api/v1/io';

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(Cfg.Env().socketPort, {
    cors: { origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' },
});

// Middlewares
Middlewares.Initialize(app);

// Routes
app.use('/api/v1', v1);

// Data
Data.Initialize();

io.on('connection', (socket) => {
    Log.debug('[Server] [IO] Connection to socket created.');
    new Io(io, socket);
});

http.listen(Cfg.Env().port, async () => {
    Log.info('[Server] Started.');
});
