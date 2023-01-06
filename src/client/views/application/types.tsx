export interface InitialStateProps {
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
    selectedMessage: {
        isHovering: boolean;
        messageId: any;
        content: any;
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

export interface SidebarProps {
    mobileMode: boolean;
}

export interface MessagingProps {
    mobileMode: boolean;
}
