declare namespace Server {}
declare namespace Server.Socket {
  type ClientToServer = {
    join: (data: { userId: string; authorization: string }) => void;
    leave: (data: { userId: string; authorization: string }) => void;
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
    receiveFriendRequest: (data: { userId: string; username: string; avatar: string }) => void;
    updateFriends: (data: { userId: string; username: string; avatar: string }) => void;
  };
}

declare namespace Server.API {
  type ReturnBase = {
    success: boolean;
    error?: string;
  };

  type API = {
    // Api
    ['/test']: () => void;
    ['/get-socket-details']: () => { socketUrl: string };
    ['/get-statistics-token']: () => { accessToken?: string | null };
    // Account
    ['/account/signup']: () => {
      authorization: string | null;
    };
    ['/account/login']: () => {
      authorization: string | null;
    };
    ['/account/verify-email']: () => {};
    // Profile
    ['/profile']: () => {
      userId?: string;
      username?: string;
      email?: string;
      avatar?: string;
    };
    ['/profile/u/:username']: () => {
      userId?: string;
      username?: string;
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
    // Messaging
    ['/messaging/get-message-group']: () => {
      messageGroupId?: string;
      messages?: any[];
    };
    ['/messaging/delete-message']: () => {};
    ['/messaging/edit-message']: () => {};
    // Globe
    ['/globe/following-posts']: () => {
      posts?: Server.Managers.Globe.Post[] | null;
    };
    ['/globe/create-post']: () => {
      post?: Server.Managers.Globe.Post | null;
    };
    ['/globe/like-post']: () => {};
    ['/globe/share-post']: () => {};
    ['/globe/view-post']: () => {
      post?: Server.Managers.Globe.Post | null;
      replies?: Server.Managers.Globe.Post[] | null;
    };
    ['/globe/reply-to-post']: () => {};
    ['/globe/delete-post']: () => {};
  };
}

declare namespace Server.Managers {}
declare namespace Server.Managers.Profile {
  type BasicProfileData = { userId: string; username: string; avatar: string };
}
declare namespace Server.Managers.Globe {
  type Post = {
    id?: number;
    postId?: string;
    replyTo?: string | null;
    avatar?: string;
    username?: string;
    userId: string;
    createdAt?: any;
    likes?: string[];
    shares?: string[];
    views?: number;
    replies?: string[];
    content: string;
    shared: boolean | null;
    sharedBy?: string | null;
  };
}

declare namespace Server.Statistics.Socket {
  type ClientToServer = {
    systemResources: () => void;
  };
  type ServerToClient = {
    systemResources: (data: {
      platform: string;
      process_uptime: number;
      uptime: number;
      cpu_usage: number;
      cpu_count: number;
      cpu_free: number;
      mem_usage: number;
      mem_total: number;
      mem_free: number;
    }) => void;
  };
}
