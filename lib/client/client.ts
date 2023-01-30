const API_URL = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  const port = window.location.port;
  const isNotDev = host === 'localhost' && port === '3000';
  return isNotDev ? `${protocol}//${host}/api/v1` : 'http://localhost:3000/api/v1';
};

export const getSocketDetails = async () => {
  return fetch(`${API_URL()}/get-socket-details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  }).then((resp: any) => resp.json());
};
