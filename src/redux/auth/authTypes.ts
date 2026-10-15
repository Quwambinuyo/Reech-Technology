import type { CountryProps, StakeholderProps } from "../../types";

export interface SignupDataType {
  data: any;
  url: string;
}

export interface PinStatusType {
  hasPin: boolean;
}

export interface SignupChallengeType {
  id: string | null;
  phoneNumber: string | null;
  challengeId: string;
  expiresAt: string | null;
}

export interface PhoneChangeType {
  challengeId: string;
  expiresAt: string | null;
  phoneNumber: string;
}

export interface StateType {
  allCountries: CountryProps[];
  createAccountLoading: boolean;
  createAccountSuccess: any;
  createAccountError: string;
  signupChallenge: SignupChallengeType | null;
  verifySignupLoading: boolean;
  verifySignupSuccess: boolean;
  verifySignupError: string;
  resendSignupLoading: boolean;
  resendSignupError: string;
  countriesLoading: boolean;
  countriesError: string;
  authNetworkError: string;
  currentUser: StakeholderProps | null;
  loginLoading: boolean;
  loginError: string;
  googleLoginLoading: boolean;
  googleLoginError: string;
  landingPageHamburgerToggle: boolean;
  toggleMobileSidebar: boolean;
  forgotPasswordLoading: boolean;
  forgotPasswordSuccess: any;
  forgotPasswordError: string;
  phoneChange: PhoneChangeType | null;
  phoneCodeLoading: boolean;
  phoneCodeError: string;
  verifyPhoneLoading: boolean;
  verifyPhoneSuccess: boolean;
  verifyPhoneError: string;
  updatePinLoading: boolean;
  updatePinSuccess: unknown;
  updatePinError: string;
  pinStatusLoading: boolean;
  pinStatus: PinStatusType | null;
  pinStatusError: string;
}

export interface SigninDataType {
  data: any;
  rememberMe: boolean;
}

export interface GoogleLoginDataType {
  token: string;
  rememberMe?: boolean;
}

export interface VerifySignupOtpDataType {
  challengeId: string;
  code: string;
}

export interface VerifyPhoneChangeDataType {
  challengeId: string;
  code: string;
  phoneNumber: string;
}