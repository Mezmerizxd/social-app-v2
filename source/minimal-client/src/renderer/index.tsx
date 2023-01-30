import { render } from 'preact';
import Router from 'preact-router';
import { Socket } from 'socket.io-client';
import App from './App';
import Test from './pages/Test';

export default async (socket: Socket) => {
  const Routing = () => (
    <Router>
      <App path="/" socket={socket} />
      <Test path="/test" />
    </Router>
  );
  render(<Routing />, document.body);
};
