export interface ReceiveMsg {
  fromName: string;
  id: string;
  text: string;
  time: Date;
}

export interface SendMsg {
  channel: string;
  text: string;
}
