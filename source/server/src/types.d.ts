declare namespace Server {}
declare namespace Server.Socket {
  type ClientToServer = {
    sendMessage: (data: { to: string; authorization: string; message: string }) => void;
    joinMessageGroup: (data: { messageGroupId: string; authorization: string }) => void;
    leaveMessageGroup: (data: { messageGroupId: string }) => void;
  };
  type ServerToClient = {
    message: (data: {
      userId: string;
      username: string;
      avatar: string;
      message: string;
      createdAt: string;
      messageId: string;
    }) => void;
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
    ['/account/verify-email']: () => {};
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
    ['/messaging/get-message-group']: () => {
      messageGroupId?: string;
      messages?: any[];
    };
    ['/messaging/delete-message']: () => {};
    ['/messaging/edit-message']: () => {};
  };
}

declare namespace Server.Managers {}
declare namespace Server.Managers.Profile {
  type BasicProfileData = { userId: string; username: string; avatar: string };
}
