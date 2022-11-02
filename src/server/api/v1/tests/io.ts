import * as socketio from 'socket.io';
import Log from '../../../utils/Log';

let serverRuntimeCount = 1;
setInterval(() => {
    serverRuntimeCount++;
}, 1000);

export default class Tests {
    private io: socketio.Server;
    private socket: socketio.Socket;

    constructor(io: socketio.Server, socket: socketio.Socket) {
        this.socket = socket;
        this.io = io;

        socket.on('test', this.handleTest);

        setInterval(() => {
            this.io.sockets.emit('count_update', serverRuntimeCount);
        }, 1000);
    }

    private handleTest = () => {
        Log.debug('[IO/V1] Test socket used.');
        this.io.sockets.emit(
            'testSocket',
            JSON.stringify({ test: 'Test Socket worked' })
        );
    };
}
