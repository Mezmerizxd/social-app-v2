declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SERVER_SOCKET_CONNECTION: string;
      SERVER_API_CONNECTION: string;
    }
  }
}

export {};
