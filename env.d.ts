declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRODUCTION: string;
      PORT: string;
      DATABASE_URL: string;
      SERVER_SOCKET_CONNECTION: string;
      SERVER_API_CONNECTION: string;
      EMAIL_USER: string;
      EMAIL_PASS: string;
    }
  }
}

export {};
