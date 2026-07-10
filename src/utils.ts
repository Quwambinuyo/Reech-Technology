import type { StakeholderProps } from "./types";

export const userRole = "merchant"; // Change to 'customer' or 'merchant' to test different roles

export const validateEmail = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
  return passwordRegex.test(password);
};

export function saveUserToStorage(
  userData: StakeholderProps,
  tabId: string,
  remember: boolean,
) {
  const role = (userData.roles?.[0] || "user").toLowerCase(); // normalize
  const storageKey = `${role}_stakeholder_${tabId}`;
  const rememberKey = `${role}_remember_${tabId}`;

  // Save the role for this tab — helps with auto-detection later
  sessionStorage.setItem(`activeRole_${tabId}`, role);

  if (remember) {
    localStorage.setItem(storageKey, JSON.stringify(userData));
    localStorage.setItem(rememberKey, "true");
  } else {
    sessionStorage.setItem(storageKey, JSON.stringify(userData));
    localStorage.setItem(rememberKey, "false");
  }
}

export function getActiveRole() {
  const tabId = sessionStorage.getItem("tabId");
  return tabId ? sessionStorage.getItem(`activeRole_${tabId}`) : null;
}

export function getUserFromStorage() {
  // return {
  // 	id: "randomid",
  // 	token: "random token",
  // 	email: "admineamil@yahoo.com",
  // 	firstName: "John",
  // 	lastName: "Doe",
  // 	emailConfirmed: true,
  // 	roles: ["SuperAdmin"],
  // 	avatar: "",
  // };

  const tabId = sessionStorage.getItem("tabId");
  if (!tabId) return null;

  const role = sessionStorage.getItem(`activeRole_${tabId}`);
  if (!role) return null; // no logged-in stakeholder

  const remember = localStorage.getItem(`${role}_remember_${tabId}`) === "true";
  const storage = remember ? localStorage : sessionStorage;

  const userData = storage.getItem(`${role}_stakeholder_${tabId}`);
  // console.log(userData);

  return userData ? JSON.parse(userData) : null;
}

function getRandomId() {
  // if (crypto && crypto?.randomUUID()) {
  // 	return crypto?.randomUUID();
  // } else {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length: 20 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
  // }
}

export function getOrCreateTabId() {
  let tabId = sessionStorage.getItem("tabId");
  if (!tabId) {
    tabId = getRandomId();
    sessionStorage.setItem("tabId", tabId);
  }
  return tabId;
}

export const getNameInitials = (name: string) => {
  // console.log(name);

  const splitName = name?.split(" ");
  const a = splitName.map((n) => n[0]);

  return a?.slice(0, 2)?.join("");
};

export const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (_, i) => start + i);

// authToken.ts
export const getAuthToken = (): string | null => {
  try {
    const user = getUserFromStorage();

    return user?.token || null;
  } catch (error) {
    console.error("Failed to parse user from storage", error);
    return null;
  }
};

export function clearUserSession(tabId: string) {
  // Detect role that was active in this tab
  const role = sessionStorage.getItem(`activeRole_${tabId}`);

  if (!role) return;

  const storageKey = `${role}_stakeholder_${tabId}`;
  const rememberKey = `${role}_remember_${tabId}`;

  // Remove user data from both storages (only one will exist)
  localStorage.removeItem(storageKey);
  sessionStorage.removeItem(storageKey);

  // Remove remember flag
  localStorage.removeItem(rememberKey);

  // Remove active role mapping
  sessionStorage.removeItem(`activeRole_${tabId}`);
}

export const timeRangeOptions = [
  "Today",
  "Yesterday",
  "Last Week",
  "Last Month",
  "All",
];

export function getDateRangeFromOption(option: string): {
  startDate: Date | null;
  endDate: Date;
} {
  const endDate = new Date();
  const startDate = new Date();

  if (option === "Today") {
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);
    return { startDate, endDate };
  }

  if (option === "Yesterday") {
    startDate.setUTCDate(startDate.getUTCDate() - 1);
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCDate(endDate.getUTCDate() - 1);
    endDate.setUTCHours(23, 59, 59, 999);
    return { startDate, endDate };
  }

  if (option === "Last Week") {
    startDate.setUTCDate(startDate.getUTCDate() - 7);
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);
    return { startDate, endDate };
  }

  if (option === "Last Month") {
    startDate.setUTCMonth(startDate.getUTCMonth() - 1);
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);
    return { startDate, endDate };
  }

  if (option === "All") {
    endDate.setUTCHours(23, 59, 59, 999);
    return { startDate: null, endDate };
  }

  return { startDate, endDate };
}

export const formatNumber = (value: string | number): string => {
  const num =
    typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;

  if (isNaN(num)) return "0.00";

  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatInputNumber = (value: string): string => {
  const raw = value.replace(/[^0-9.]/g, "");
  const parts = raw.split(".");
  if (parts.length > 2) return value;
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const formatDateTime = (date: string | Date) => {
  if (!date) return "-";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return new Date(date).toLocaleString("en-US", options);
};
