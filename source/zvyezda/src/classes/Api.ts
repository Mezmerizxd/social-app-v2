export default new (class Api {
  private apiVersion = 'v1';
  private productionUri = 'http://mezmerizxd.net';
  private developmentUri = 'http://localhost:3000';
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
    // return process.env.NODE_ENV === 'production'
    //   ? `${this.productionUri}/api/${this.apiVersion}`
    //   : `${this.developmentUri}/api/${this.apiVersion}`;
    const protocol = window.location.protocol;
    const host = window.location.host;
    const port = window.location.port;
    const isNotDev = host === 'localhost' && port === '3000';
    return isNotDev ? `${protocol}//${host}/api/v1` : 'http://localhost:3000/api/v1';
  };
})();
