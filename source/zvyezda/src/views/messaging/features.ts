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
      const response = await Api.Post({
        api: '/user/get-user-data',
        body: {
          method: 'authorization',
          key: localStorage.getItem('authorization'),
        },
      });
      if (response && response.success === true) {
        account = response.data;
      }
    }
    return account;
  };

  public getFriends = async () => {
    let friends = [];
    if (this.debugMode) {
      for (let i = 0; i < 40; i++) {
        friends.push({
          userId: i,
          username: 'Test ' + i,
          avatar: 'https://i.pravatar.cc/300',
        });
      }
    } else {
      const response = await Api.Post({
        api: '/profile/friends',
        body: null,
      });
      if (response && response.success === true) {
        friends = response.friends;
      }
    }
    return friends;
  };

  public getMessages = async (userId: any) => {
    let messages = [];
    let messagingGroupId = null;
    if (this.debugMode) {
      for (let i = 0; i < 100; i++) {
        messages.push({
          messageId: i,
          userId: i,
          username: 'user' + i,
          dateSent: new Date(),
          content: 'This is a mock message, This is a mock message, This is a mock message' + i,
          avatar: 'https://i.pravatar.cc/300',
        });
      }
    } else {
      const response = await Api.Post({
        api: '/messaging/get-messages',
        body: {
          userId: userId,
        },
      });
      if (response && response.success === true) {
        messages = response.data.messages;
        messagingGroupId = response.data.messagingGroupId;
      }
    }
    return {
      messages: messages,
      messagingGroupId: messagingGroupId,
    };
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
      const response = await Api.Post({
        api: '/user/get-friend-requests',
        body: null,
      });
      if (response && response.success === true) {
        sent = response.data?.sent;
        received = response.data?.received;
      }
    }
    return {
      sent: sent,
      received: received,
    };
  };

  public changeAccountUsername = async (username: string) => {
    let success = false;
    let error = null;
    if (!this.debugMode) {
      const response = await Api.Post({
        api: '/user/change-username',
        body: {
          username: username,
        },
      });
      if (response && response.success === true) {
        success = true;
      } else {
        error = response.error;
      }
    } else {
      error = 'Debug mode is active';
    }
    return {
      success: success,
      error: error ? error : null,
    };
  };

  public changeAccountAvatar = async (avatar: string) => {
    let success = false;
    let error = null;
    if (!this.debugMode) {
      const response = await Api.Post({
        api: '/user/change-avatar',
        body: {
          avatar: avatar,
        },
      });
      if (response && response.success === true) {
        success = true;
      } else {
        error = response.error;
      }
    } else {
      error = 'Debug mode is active';
    }
    return {
      success: success,
      error: error ? error : null,
    };
  };

  public setDebugMode = (bool: boolean) => {
    this.debugMode = bool;
  };
})();
