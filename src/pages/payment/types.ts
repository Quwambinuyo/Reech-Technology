export interface Merchant {
  id: string;
  name: string;
  category: string;
  initials: string;
  color: string;
}

export interface Recipient {
  id: string;
  username: string;
}

export type Step = 0 | 1 | 2 | 3 | 4;

export const EXCHANGE_RATE = 1;
export const CURRENT_BALANCE = 2450;
export const OTP_EXPIRY_SECONDS = 300;
export const TRANSFER_FEE = 2;

export type PinFlowStep = 0 | 1 | 2 | 3;

export interface PinFlowResult {
  pin: string;
}
