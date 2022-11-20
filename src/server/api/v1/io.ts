import * as socketio from 'socket.io';
import Log from '../../utils/Log';

import Tests from './tests/io';
import Messaging from './messaging/io';

export default class Io {
    private io: socketio.Server;
    private socket: socketio.Socket;

    constructor(io: socketio.Server, socket: socketio.Socket) {
        this.socket = socket;
        this.io = io;

        new Tests(this.io, this.socket);
        new Messaging(this.io, this.socket);
        socket.on('disconnect', this.disconnect);
    }

    private disconnect = () => {
        Log.debug('[IO/V1] Connection to socket destroyed.');
    };
}
