export type TransactionProps = {
  id: number;
  company: string;
  status: "pending" | "successful" | "point deducted";
  type: string;
  productType: string;
  pointsEarned: number;
  date: string;
};

export type CountryProps = {
  code?: string;
  currency?: string;
  currency_code?: string;
  currency_symbol?: string;
  dial_code?: string;
  flag?: string;
  local_name?: string;
  name?: string;
  id?: string;
};

export type UserRole = "customer" | "merchant";

export type ActivityBasedProp = {
  id: number;
  activity: string;
  points: number;
  description: string;
};

export type PointEquivalentProp = { id: number; points: number };

export type UserProps = {
  name: string;
  email: string;
  avatarUrl: string;
};

export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type TextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;
export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
export type FormEvent = React.FormEvent<HTMLFormElement>;

export interface StakeholderProps {
  id: string;
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;
  roles: string[];
  avatar?: string;
  business?: {
    id: string;
    name: string;
    status: string | null;
  };
}

export interface SelectProps {
  selectedText: string;
  isOpen: boolean;
  onToggle: () => void;
  handleSelect: (value: string) => void;
}

export interface AdminMerchantListProps {
  id: number;
  totalUsers: number;
  totalPoints: number;
  status: string;
  date: string;
  company: {
    name: string;
    category: string;
    address: string;
    landMark: string;
    image: string;
    documents: any;
  };
  director: {
    name: string;
    email: string;
    idType: string;
    phone: string;
    idUrl: string;
  };
}

export interface AdminCategoryListProps {
  name: string;
  numOfMerchants?: number;
  description: string;
  id: string;
  // status?: "enabled" | "disabled";
}

export interface ActivityPointProps {
  name: string;
  points: number;
  description: string;
  id: string;
}
