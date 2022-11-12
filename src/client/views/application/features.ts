import Api from '../../classes/Api';

export default new (class Features {
    private debugMode = false;

    public getUserData = async () => {
        let account = null;
        if (this.debugMode) {
            account = {
                username: 'test',
                userId: 10001,
                email: 'test@email.com',
                avatar: 'https://i.pravatar.cc/300',
            };
        } else {
            const response = await Api.Post(
                '/user/get-user-data',
                {
                    method: 'authorization',
                    key: localStorage.getItem('authorization'),
                },
                true
            );
            if (response && response.success === true) {
                account = response.data;
            }
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
        return friends.length > 0 ? friends : null;
    };

    public getMessages = async (userId: any) => {
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
        return messages.length > 0 ? messages : null;
    };

    public getFriendRequests = async () => {
        let sent = [];
        let received = [];
        if (this.debugMode) {
            for (let i = 0; i < 100; i++) {
                sent.push({
                    userId: i,
                    username: 'Test ' + i,
                    avatar: 'https://i.pravatar.cc/300',
                });
            }
            for (let i = 0; i < 100; i++) {
                received.push({
                    userId: i,
                    username: 'Test ' + i,
                    avatar: 'https://i.pravatar.cc/300',
                });
            }
        } else {
            const response = await Api.Post(
                '/user/get-friend-requests',
                null,
                true
            );
            if (response && response.success === true) {
                sent = response.data.sent;
                received = response.data.received;
            }
        }
        return {
            sent: sent.length > 0 ? sent : null,
            received: received.length > 0 ? received : null,
        };
    };

    public setDebugMode = (bool: boolean) => {
        this.debugMode = bool;
    };
})();
