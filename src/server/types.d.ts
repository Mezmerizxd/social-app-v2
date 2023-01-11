declare namespace Server {}

declare namespace Server.Cfg {
    type Env = {
        port: any;
        socketPort: any;
        mySqlEnabled: any;
        mySqlHost: any;
        mySqlDevHost: any;
        mySqlUser: any;
        mySqlDevUser: any;
        mySqlPaswd: any;
        mySqlDevPaswd: any;
        mySqlDb: any;
        mySqlDevDb: any;
        mongoDbEnabled: any;
        mongoDbHost: any;
        mongoDbDevHost: any;
        mongoDbDb: any;
        mongoDbDevDb: any;
        firebaseEnabled: any;
        firebaseDbUrl: any;
        firebaseType: any;
        firebaseProjectId: any;
        firebasePrivateKeyId: any;
        firebasePrivateKey: any;
        firebaseClientEmail: any;
        firebaseClientId: any;
        firebaseAuthUri: any;
        firebaseTokenUri: any;
        firebaseAuthProviderCertUrl: any;
        firebaseClientCertUrl: any;
        emailService: any;
        emailUser: any;
        emailPass: any;
    };
    type Local = {
        fbDbName: string;
        fbDbUserAcccount: string;
        fbDbUserData: string;
        fbDbMessages: string;
    };
    type UserApi = {
        maxUsernameLength: number;
        minUsernameLength: number;
        minPasswordLength: number;
        illegalUsernameCharacters: string[];
    };
}

declare namespace Server.V1 {
    type GeneratorsReturn = {
        data: any;
    };
}

declare namespace Server.V1.User {}
declare namespace Server.V1.User.Req {
    type ChangeAvatar = {
        avatar: string;
    };
    type ChangeUsername = {
        username: string;
    };
    type GetUserData = {
        method: string;
        key: any;
    };
    type HandleFriendRequest = {
        userId: number;
        type: string;
    };
    type Login = {
        email: string;
        password: string;
    };
    type SendFriendRequest = {
        username: string;
    };
    type Signup = {
        email: string;
        username: string;
        password: string;
    };
}

declare namespace Server.V1.Messaging {}
declare namespace Server.V1.Messaging.Req {
    type DeleteMessage = {
        messageId: any;
        messagesGroupId: any;
    };
    type EditMessage = {
        messageId: any;
        messagesGroupId: any;
        content: any;
    };
    type GetMessages = {
        userId: any;
    };
}
declare namespace Server.V1.Messaging.IO {
    type SendFriendMessage = {
        authorization: any;
        userId: any;
        content: any;
    };
}

declare namespace Server.V1.Features {
    type UserData = {
        userId: number;
        username: string;
        authorization: string;
        avatar: string;
        email: string;
        friends?: PublicUserData[];
        friendRequests: {
            sent?: PublicUserData[];
            received?: PublicUserData[];
        };
        accountCreationDate: string;
        lastLoggedInDate: string;
        verifiedEmail: boolean;
        verifiedUser: boolean;
    };
    type PublicUserData = {
        userId?: number;
        username?: string;
        avatar?: string;
    };
    type DatabaseReturn = {
        success: boolean;
        error?: string;
    };
}
