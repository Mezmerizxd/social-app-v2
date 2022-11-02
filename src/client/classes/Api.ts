export default new (class Api {
    private apiVersion = 'v1';
    private productionUri = 'http://mezmerizxd.net';
    private developmentUri = 'http://localhost:3001';
    private authorization = localStorage.getItem('authorization');

    public Post = async (
        api: string,
        body?: any,
        json?: boolean
    ): Promise<any> => {
        return await fetch(this.getUri() + api, {
            method: 'POST',
            body: body ? JSON.stringify(body) : null,
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.authorization,
            },
        }).then((res) => {
            return json === true ? res.json() : res;
        });
    };

    public Get = async (api: string, json?: boolean): Promise<any> => {
        return await fetch(this.getUri() + api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.authorization,
            },
        }).then((res) => {
            return json === true ? res.json() : res;
        });
    };

    public getUri = () => {
        return process.env.NODE_ENV === 'production'
            ? `${this.productionUri}/api/${this.apiVersion}`
            : `${this.developmentUri}/api/${this.apiVersion}`;
    };
})();
