import socketIOClient from 'socket.io-client';

export default new (class Socket {
  private productionUri = 'http://io.mezmerizxd.net';
  private developmentUri = 'http://localhost:3002';

  public New = (uri?: string, opts?: any) => {
    const defaultUri = this.getUri();
    return socketIOClient(uri ? uri : defaultUri, opts ? opts : null);
  };

  public getUri = () => {
    return process.env.NODE_ENV === 'production' ? this.productionUri : this.developmentUri;
  };
})();
