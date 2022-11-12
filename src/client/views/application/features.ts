export default new (class Features {
    private debugMode: boolean;

    constructor() {
        process.env.NODE_ENV === 'production'
            ? (this.debugMode = false)
            : (this.debugMode = true);
    }

    public getUserData = async () => {
        let account = {};
        if (this.debugMode) {
            account = {
                username: 'test',
                userId: 10001,
                email: 'test@email.com',
                avatar: 'https://i.pravatar.cc/300',
            };
        }
        return account;
    };

    public getFriends = async () => {
        const friends = [];
        if (this.debugMode) {
            for (let i = 0; i < 40; i++) {
                friends.push({
                    userId: i,
                    username: 'Test ' + i,
                    avatar: 'https://i.pravatar.cc/300',
                });
            }
        }
        return friends;
    };

    public getMessages = async () => {
        const messages = [];
        if (this.debugMode) {
            for (let i = 0; i < 100; i++) {
                messages.push({
                    messageId: i,
                    userId: i,
                    username: 'user' + i,
                    dateSent: new Date(),
                    content:
                        'This is a mock message, This is a mock message, This is a mock message' +
                        i,
                    avatar: 'https://i.pravatar.cc/300',
                });
            }
        }
        return messages;
    };

    public getFriendRequestsSent = async () => {
        const sent = [];
        if (this.debugMode) {
            for (let i = 0; i < 100; i++) {
                sent.push({
                    userId: i,
                    username: 'Test ' + i,
                    avatar: 'https://i.pravatar.cc/300',
                });
            }
        }
        return sent;
    };

    public getFriendRequestsReceived = async () => {
        const received = [];
        if (this.debugMode) {
            for (let i = 0; i < 100; i++) {
                received.push({
                    userId: i,
                    username: 'Test ' + i,
                    avatar: 'https://i.pravatar.cc/300',
                });
            }
        }
        return received;
    };

    public setDebugMode = (bool: boolean) => {
        this.debugMode = bool;
    };
})();
