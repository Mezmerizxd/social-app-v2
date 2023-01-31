declare namespace Server {}
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

declare namespace Server.API {
  type ReturnBase = {
    success: boolean;
    error?: string;
  };

  type API = {
    ['/test']: () => void;
    ['/get-socket-details']: () => { socketUrl: string };
    ['/account/signup']: () => {
      authorization: string | null;
    };
  };
}
