import * as socketio from 'socket.io';
import Log from '../../utils/Log';

import Tests from './tests/io';

export default class Io {
    private io: socketio.Server;
    private socket: socketio.Socket;

    constructor(io: socketio.Server, socket: socketio.Socket) {
        this.socket = socket;
        this.io = io;

        new Tests(this.io, this.socket);
        socket.on('disconnect', this.disconnect);
    }

    private disconnect = () => {
        Log.debug('[API/V1] [IO] Connection to socket destroyed.');
    };
}
