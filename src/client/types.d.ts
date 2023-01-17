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
declare namespace Client.Globe {
    interface InitialState {
        account: {
            userId: any;
            username: any;
            email: any;
            avatar: any;
        };
        posts: Post[];
        createPost: {
            increment: number;
            maxHeight: number;
            value: string;
        };
    }

    interface Post {
        postId: any;
        userId: any;
        username: any;
        avatar: any;
        content: any;
        datePosted: any;
        likes: any;
        comments: any;
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
