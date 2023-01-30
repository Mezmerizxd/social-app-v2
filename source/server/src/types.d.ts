declare namespace Server {
  type API = {
    ['/test']: () => void;
    ['/get-socket-details']: () => void;
  };
}
declare namespace Server.Socket {
  type ClientToServer = {
    test: () => void;
    getAccount: (data: { token: string }) => void;
  };
  type ServerToClient = {
    clientTest: (message: string) => void;
    setAccount: (data: { account: string }) => void;
  };
}
