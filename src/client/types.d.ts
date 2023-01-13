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
    enum ContextPages {
        login = 'Login',
        signup = 'Sign up',
    }
    interface Login {
        contexts: any;
    }
    interface Signup {
        contexts: any;
    }
    interface InitialState {
        context: string;
    }
}

declare namespace Client.Authentication.Styles {
    interface Checkbox {
        label?: string;
        required?: boolean;
        checked?: boolean;
        state?: any;
        onClick?: () => void;
    }
}

declare namespace Client.Messaging {
    interface Sidebar {
        mobileMode: boolean;
    }
    interface Messages {
        mobileMode: boolean;
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
}
declare namespace Client.Components {}
declare namespace Client.Components.Loading {
    interface Default {
        isLoading: boolean;
        name: string;
        style?: any;
    }
}
