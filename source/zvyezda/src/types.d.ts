declare namespace Client {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}

declare namespace Client.API {
  interface Fetch {
    api: string;
  }
  interface Post extends Fetch {
    body: any;
    authentication?: boolean;
  }
  interface Get extends Fetch {}
  interface Put extends Fetch {
    body: any;
  }
  interface Delete extends Fetch {}

  interface Patch extends Fetch {
    body: any;
  }
  interface Response {
    status: number;
    success: boolean;
    data?: any;
    error?: string;
  }
}

declare namespace Client.Authentication {
  interface InitialState {
    context: number;
  }
}

declare namespace Client.Messaging {
  interface Sidebar {
    mobileMode: boolean;
    socket: any;
  }
  interface Messages {
    mobileMode: boolean;
    socket: any;
  }
  interface InitialState {
    error: any;
    user: {
      userId: any;
      username: any;
      email: any;
      avatar: any;
    };
    friends: [
      {
        userId: any;
        username: any;
        avatar: any;
      },
    ];
    messages: [
      {
        avatar: any;
        message: any;
        createdAt: any;
        messageId: any;
        userId: any;
        username: any;
      },
    ];
    selectedMessage: {
      isHovering: boolean;
      messageId: any;
      message: any;
    };
    selectedFriend: {
      userId: any;
      username: any;
      messagesGroupId: any;
    };
    sidebar: {
      open: boolean;
    };
    addFriendPopup: {
      open: boolean;
    };
    friendRequestsPopup: {
      open: boolean;
      error: any;
      sent: [{ userId: any; avatar: any; username: any }];
      received: [{ userId: any; avatar: any; username: any }];
    };
    settingsPopup: {
      open: boolean;
    };
    deleteMessagePopup: {
      open: boolean;
    };
    editMessagePopup: {
      open: boolean;
    };
  }
}
declare namespace Client.Globe {
  interface InitialState {
    account: {
      userId: number;
      username: string;
      email: string;
      avatar: string;
      accountCreationDate: string;
      authorization: string;
      friends?: [{ userId: number; username: string; avatar: string }];
      lastLoggedInDate: string;
      verifiedEmail: boolean;
      verifiedUser: boolean;
    };
    data: {
      likedPosts: string[];
    };
    posts: Post[];
    createPost: {
      increment: number;
      maxHeight: number;
      value: string;
    };
    postOptions: {
      open: boolean;
      posX: number;
      posY: number;
      selectedPostId: number;
      selectedPostUserId: number;
      selectedPostUsername: string;
    };
    isViewingPost: boolean;
    viewingLevel: number;
    viewedPosts: string[];
  }

  interface Post {
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
  }
}
declare namespace Client.Globe.Reducer {
  interface Action {
    type: string;
    payload: any;
  }
}
declare namespace Client.Globe.Components {}
declare namespace Client.Globe.Components.Widgets {}
declare namespace Client.Globe.Components.Widgets.CreatePost {
  interface State {
    textArea: {
      maxHeight: number;
      increment: number;
      value: string;
    };
  }
}
declare namespace Client.Globe.Components.Models {
  interface Post extends Client.Globe.Post {
    id: any;
  }
}

declare namespace Client.Components.Notifications.Default {
  interface InitialState {
    icon: any;
    message: any;
    open: boolean;
    wait: number;
    closable: boolean;
  }
}

declare namespace Client.Styled {
  interface ColorData {
    hex: string;
    rgb?: string;
    rawRgb?: [r: number, g: number, b: number];
  }
  interface Theme {
    colors: Record<string, ColorData>;
    text: Record<string, ColorData>;
  }
}
declare namespace Client.Styled.Components {}
declare namespace Client.Styled.Components.Loading {
  interface Default {
    isLoading: boolean;
    name: string;
    style?: any;
  }
}
declare namespace Client.Styled.Components.Inputs {
  interface Checkbox {
    label?: string;
    required?: boolean;
    checked?: boolean;
    state?: any;
    onClick?: () => void;
  }
}
