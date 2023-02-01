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
    ['/account/login']: () => {
      authorization: string | null;
    };
    ['/profile']: () => {
      userId?: string;
      username?: string;
      email?: string;
      avatar?: string;
    };
    ['/profile/friends']: () => {};
    ['/profile/friend-requests']: () => {};
    ['/profile/handle-friend-request']: () => {
      action: 'accept' | 'decline';
      userId: string;
    };
    ['/profile/add-friend']: () => {
      userId: string;
    };
  };
}

declare namespace Server.Managers {}
declare namespace Server.Managers.Profile {
  type BasicProfileData = { userId: string; username: string; avatar: string };
}
