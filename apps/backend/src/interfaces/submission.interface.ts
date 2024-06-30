export interface Submission {
  _id?: string;
  round?: number;
  address: string;
  captcha: string;
  timestamp: number;
  image?: string;
  deviceID?: string;
}

export interface Admission {
  _id?: string;
  participant: string;
  amount: string;
}
