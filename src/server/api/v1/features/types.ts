export type PublicUserData = {
    userId?: number;
    username?: string;
    avatar?: string;
};

export type ProcessedUserData = {
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

export type DatabaseReturn = {
    success: boolean;
    error?: string;
};
