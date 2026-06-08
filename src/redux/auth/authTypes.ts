import type { CountryProps, StakeholderProps } from "../../types";

export interface SignupDataType {
  data: any;
  url: string;
}

export interface StateType {
  allCountries: CountryProps[];
  createAccountLoading: boolean;
  createAccountSuccess: any;
  createAccountError: string;
  countriesLoading: boolean;
  countriesError: string;
  authNetworkError: string;
  currentUser: StakeholderProps | null;
  loginLoading: boolean;
  loginError: string;
  landingPageHamburgerToggle: boolean;
  toggleMobileSidebar: boolean;
  forgotPasswordLoading: boolean;
  forgotPasswordSuccess: any;
  forgotPasswordError: string;
}

export interface SigninDataType {
  data: any;
  rememberMe: boolean;
}
