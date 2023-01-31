import {Component} from 'preact';
import {Socket} from 'socket.io-client';
import './styles.scss';

export default class App extends Component<{ socket: Socket }, Client.UI.App.State> {
  constructor(props: { socket: Socket }) {
    super();

    this.state = {
      account: null,
      token: 'ABCDEFG',
    };

    props.socket.on(`clientTest`, (data: any) => {
      console.log(data);
    });

    props.socket.on(`setAccount`, (data: any) => {
      this.setState({ account: data.account });
    });
  }

  handleTokenOnChange = (e: any) => {
    this.setState({ token: e.target.value });
  };

  handleFetchAccount = () => {
    this.props.socket.emit('getAccount', { token: this.state.token }, (data: any) => {
      console.log(data);
    });
  };

  render() {
    return (
      <div>
        <h1>My React App</h1>
        <p>My React App</p>

        <p>Socket ID: {this.props.socket.id}</p>
        <p>Connected: {this.props.socket.connected ? 'true' : 'false'}</p>
        <br />
        <input
          type="text"
          name="token"
          id="token"
          placeholder={this.state.token}
          value={this.state.token}
          onChange={this.handleTokenOnChange.bind(this)}
        />
        <button onClick={this.handleFetchAccount}>Fetch Account</button>
        <p>Account: {JSON.stringify(this.state.account)}</p>
      </div>
    );
  }
}
