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
	remember: boolean
) {
	const role = (userData.roles?.[0] || "user").toLowerCase(); // normalize
	const storageKey = `${role}_user_${tabId}`;
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
	const tabId = sessionStorage.getItem("tabId");
	if (!tabId) return null;

	const role = sessionStorage.getItem(`activeRole_${tabId}`);
	if (!role) return null; // no logged-in stakeholder

	const remember = localStorage.getItem(`${role}_remember_${tabId}`) === "true";
	const storage = remember ? localStorage : sessionStorage;

	const userData = storage.getItem(`${role}_user_${tabId}`);
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
		() => chars[Math.floor(Math.random() * chars.length)]
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
