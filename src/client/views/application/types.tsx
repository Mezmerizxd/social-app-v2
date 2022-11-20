export interface InitialDataProps {
    friends: [
        {
            userId: any;
            username: any;
            avatar: any;
        }
    ];
    messages: [
        {
            avatar: any;
            content: any;
            dateSent: any;
            messageId: any;
            userId: any;
            username: any;
        }
    ];
    selectedFriend: {
        userId: any;
        username: any;
        messagesGroupId: any;
    };
    sidebar: {
        open: boolean;
        data: any;
    };
    addFriend: {
        open: boolean;
    };
    friendRequests: {
        open: boolean;
        error: any;
        sent: [{ userId: any; avatar: any; username: any }];
        received: [{ userId: any; avatar: any; username: any }];
    };
    settings: {
        open: boolean;
        username: any;
        userId: any;
        email: any;
        avatar: any;
    };
}

export interface SidebarProps {
    state: InitialDataProps;
    dispatch: React.Dispatch<any>;
    mobileMode: boolean;
}

export interface SettingsPrpos {
    state: InitialDataProps;
    dispatch: React.Dispatch<any>;
}

export interface MessagingProps {
    state: InitialDataProps;
    dispatch: React.Dispatch<any>;
    mobileMode: boolean;
}

export interface FriendRequestsPrpos {
    state: InitialDataProps;
    dispatch: React.Dispatch<any>;
}

export interface AddFriendPrpos {
    state: InitialDataProps;
    dispatch: React.Dispatch<any>;
}
