declare namespace Client {}

declare namespace Client.UI {
  interface BaseProps {}
  interface BaseState {}
}

declare namespace Client.UI.App {
  interface Props extends Client.UI.BaseProps {}
  interface State extends Client.UI.BaseState {
    account: any;
    token: string;
  }
}
