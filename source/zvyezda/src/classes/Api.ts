export default new (class Api {
  private authorization = localStorage.getItem('authorization');

  public Post = async ({ api, body }: Client.API.Post) => {
    try {
      return await fetch(this.getUri() + api, {
        method: 'POST',
        body: body ? JSON.stringify(body) : null,
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.authorization ? this.authorization : 'None',
        },
      }).then((response) => {
        return response.json();
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  public Get = async ({ api }: Client.API.Get) => {
    try {
      return await fetch(this.getUri() + api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.authorization ? this.authorization : 'None',
        },
      }).then((response) => {
        return response.json();
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  public getUri = () => {
    const host = window.location.host;
    // If host is localhost:3000 or localhost:8080 then we are in development mode
    if (host.includes('localhost')) {
      return 'http://localhost:3000/api/v1';
    } else {
      return 'http://mezmerizxd.net/api/v1';
    }
  };
})();
