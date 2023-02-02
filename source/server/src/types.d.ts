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
    ['/profile/change-username']: () => {};
    ['/profile/change-avatar']: () => {};
    ['/profile/friends']: () => {
      friends?: Server.Managers.Profile.BasicProfileData[];
    };
    ['/profile/friend-requests']: () => {
      sent?: Server.Managers.Profile.BasicProfileData[];
      received?: Server.Managers.Profile.BasicProfileData[];
    };
    ['/profile/handle-friend-request']: () => {};
    ['/profile/add-friend']: () => {};
  };
}

declare namespace Server.Managers {}
declare namespace Server.Managers.Profile {
  type BasicProfileData = { userId: string; username: string; avatar: string };
}
