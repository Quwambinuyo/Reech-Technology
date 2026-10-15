import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, baseURL } from "../../components/api";
import { toast } from "react-toastify";
import {
  clearUserSession,
  getOrCreateTabId,
  saveUserToStorage,
} from "../../utils";
import { onUpdateBusinessStatus } from "../auth/authReducer";
import type { RootState } from "../store";

const tabId = getOrCreateTabId();

export type Business = {
  id: string;
  name: string;
  address: string;
  landmark: string;
};

export type MerchantStatus = 0 | 1 | 2 | null;

export type AdminMerchant = {
  id: string;
  name: string;
  address: string | null;
  landmark: string | null;
  logo: string | null;
  status: MerchantStatus;
  createdAt: string | null;
};

export type MerchantDirector = {
  id: string;
  fullName: string;
  idType: number;
  otherIdType: string | null;
  idCardUrl: string | null;
  emailAddress: string;
  phoneNumber: string;
};

export type MerchantUtilityBill = {
  type: number;
  otherType: string | null;
  url: string | null;
  fileName: string | null;
};

export type VerificationHistoryItem = {
  status: MerchantStatus;
  reason: string | null;
  createdAt: string | null;
  handledByName: string | null;
};

export type MerchantDetail = {
  id: string;
  name: string;
  address: string;
  landmark: string;
  logo: string | null;
  categoryId: string;
  categoryName: string;
  countryId: string;
  countryName: string;
  status: MerchantStatus;
  createdAt: string | null;
  submittedAt: string | null;
  cacDocumentUrls: string[];
  utilityBill: MerchantUtilityBill | null;
  directors: MerchantDirector[];
  verificationHistory: VerificationHistoryItem[];
};

type FetchBusinessesResponse = {
  result: Business[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
};

type FetchBusinessesParams = {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
};

type FetchAdminMerchantsResponse = {
  result: AdminMerchant[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
};

export type AdminMerchantsQuery = {
  pageNumber: number;
  pageSize: number;
  search: string;
  status?: 0 | 1 | 2;
};

export type FetchAdminMerchantsParams = {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  status?: 0 | 1 | 2;
};

type ReviewResult = {
  id: string;
  status: 1 | 2;
};

const DECLINE_REASON_MAX_LENGTH = 2000;
const OTHER_TYPE_CODE = 99;
const OTHER_TYPE_MAX_LENGTH = 100;
const UTILITY_BILL_MAX_BYTES = 10 * 1024 * 1024;
const UTILITY_BILL_MIME_TYPES = ["application/pdf", "image/png", "image/jpeg"];

const UTILITY_BILL_TYPE_CODES: Record<string, number> = {
  electricity: 0,
  water: 1,
  gas: 2,
  internet: 3,
  other: OTHER_TYPE_CODE,
};

const ID_TYPE_CODES: Record<string, number> = {
  nationalid: 0,
  passport: 1,
  driverslicence: 2,
  driverslicense: 2,
  driverlicence: 2,
  driverlicense: 2,
  other: OTHER_TYPE_CODE,
};

const normalizeLabel = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const resolveTypeCode = (
  value: unknown,
  codes: Record<string, number>,
): number | null => {
  const raw = String(value ?? "").trim();
  if (raw === "") return null;
  if (/^\d+$/.test(raw)) return Number(raw);
  const code = codes[normalizeLabel(raw)];
  return code === undefined ? null : code;
};

const isBlank = (value: unknown) => String(value ?? "").trim() === "";

const handleThunkError = (
  error: any,
  rejectWithValue: (value: string) => any,
) => {
  if (error?.message === "Network Error") {
    toast.error("You are not connected to the internet.");
    return rejectWithValue("Network error");
  }

  if (error?.response?.status === 401) {
    toast.error("Authorization failed. Please login again,");
    clearUserSession(tabId);
    setTimeout(() => {
      window.location.href = "/sign-in";
    }, 1000);
    return rejectWithValue("Unauthorized");
  }

  const data = error?.response?.data;
  const validation =
    data?.errors && typeof data.errors === "object"
      ? Object.values(data.errors).flat().join(" ")
      : "";
  const message = data?.error || data?.message || validation || error?.message;
  toast.error(message);
  return rejectWithValue(message);
};

export const fetchBusinesses = createAsyncThunk(
  "businesses/fetchBusinesses",
  async (params: FetchBusinessesParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${baseURL}/businesses`, {
        params,
      });

      if (response.data?.isSuccess) {
        return response.data?.data as FetchBusinessesResponse;
      } else {
        throw new Error("Failed to fetch businesses");
      }
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  },
);

export const fetchAdminMerchants = createAsyncThunk(
  "admin/merchants/fetchAll",
  async (params: FetchAdminMerchantsParams, { rejectWithValue }) => {
    try {
      const query: AdminMerchantsQuery = {
        pageNumber: params.pageNumber ?? 1,
        pageSize: params.pageSize ?? 20,
        search: params.search?.trim() ?? "",
        status: params.status,
      };

      const response = await axiosInstance.get(`${baseURL}/admin/merchants`, {
        params: {
          PageNumber: query.pageNumber,
          PageSize: query.pageSize,
          Search: query.search || undefined,
          Status: query.status,
        },
      });

      if (response.data?.isSuccess) {
        const page = response.data?.data as FetchAdminMerchantsResponse;
        return { ...page, query, fetchedAt: Date.now() };
      } else {
        throw new Error("Failed to fetch merchants");
      }
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  },
);

export const fetchAdminMerchantDetail = createAsyncThunk(
  "admin/merchants/fetchDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${baseURL}/admin/merchants/${id}`,
      );

      if (response.data?.isSuccess) {
        return response.data?.data as MerchantDetail;
      } else {
        throw new Error("Failed to fetch merchant details");
      }
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  },
);

export const approveMerchant = createAsyncThunk(
  "admin/merchants/approve",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}/admin/merchants/${id}/approve`,
      );

      if (response.data?.isSuccess) {
        toast.success("Merchant approved successfully");
        dispatch(fetchAdminMerchantDetail(id));
        return { id, status: 1 } as ReviewResult;
      } else {
        throw new Error("Failed to approve merchant");
      }
    } catch (error: any) {
      if (error?.response?.status === 409) {
        const message =
          error?.response?.data?.error ||
          "This merchant has already been reviewed";
        toast.error(message);
        dispatch(fetchAdminMerchantDetail(id));
        return rejectWithValue(message);
      }
      return handleThunkError(error, rejectWithValue);
    }
  },
);

export const declineMerchant = createAsyncThunk(
  "admin/merchants/decline",
  async (
    { id, reason }: { id: string; reason?: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const trimmedReason = reason?.trim() ?? "";

      if (trimmedReason.length > DECLINE_REASON_MAX_LENGTH) {
        const message = `Reason must not exceed ${DECLINE_REASON_MAX_LENGTH} characters`;
        toast.error(message);
        return rejectWithValue(message);
      }

      const response = await axiosInstance.post(
        `${baseURL}/admin/merchants/${id}/decline`,
        trimmedReason ? { reason: trimmedReason } : {},
      );

      if (response.data?.isSuccess) {
        toast.success("Merchant declined");
        dispatch(fetchAdminMerchantDetail(id));
        return { id, status: 2 } as ReviewResult;
      } else {
        throw new Error("Failed to decline merchant");
      }
    } catch (error: any) {
      if (error?.response?.status === 409) {
        const message =
          error?.response?.data?.error ||
          "This merchant has already been reviewed";
        toast.error(message);
        dispatch(fetchAdminMerchantDetail(id));
        return rejectWithValue(message);
      }
      return handleThunkError(error, rejectWithValue);
    }
  },
);

export const submitMerchantVerification = createAsyncThunk(
  "verify/businesses/info",
  async (info: any, { dispatch, getState, rejectWithValue }) => {
    const fail = (message: string) => {
      toast.error(message);
      return rejectWithValue(message);
    };

    try {
      const hasUtilityType = !isBlank(info.utilityBillType);
      const hasUtilityFile = !!info.utilityBill;
      let utilityCode: number | null = null;

      if (hasUtilityType !== hasUtilityFile) {
        return fail("Select a utility bill type and upload the file together.");
      }

      if (hasUtilityType && hasUtilityFile) {
        utilityCode = resolveTypeCode(
          info.utilityBillType,
          UTILITY_BILL_TYPE_CODES,
        );

        if (utilityCode === null) {
          return fail("Select a valid utility bill type.");
        }

        if (!UTILITY_BILL_MIME_TYPES.includes(info.utilityBill.type)) {
          return fail("Utility bill must be a PDF, PNG or JPEG file.");
        }

        if (info.utilityBill.size > UTILITY_BILL_MAX_BYTES) {
          return fail("Utility bill must not exceed 10 MB.");
        }

        if (utilityCode === OTHER_TYPE_CODE) {
          const otherText = String(info.otherUtilityBillType ?? "").trim();

          if (!otherText) {
            return fail("Please specify the utility bill type.");
          }

          if (otherText.length > OTHER_TYPE_MAX_LENGTH) {
            return fail(
              `Utility bill type must not exceed ${OTHER_TYPE_MAX_LENGTH} characters.`,
            );
          }
        }
      }

      const directors: any[] = info.directors ?? [];
      const directorIdCodes: (number | null)[] = [];

      for (let index = 0; index < directors.length; index += 1) {
        const director = directors[index];
        const code = resolveTypeCode(director.idType, ID_TYPE_CODES);

        if (!isBlank(director.idType) && code === null) {
          return fail(`Select a valid ID type for director ${index + 1}.`);
        }

        if (code === OTHER_TYPE_CODE) {
          const otherText = String(director.otherIdType ?? "").trim();

          if (!otherText) {
            return fail(`Please specify the ID type for director ${index + 1}.`);
          }

          if (otherText.length > OTHER_TYPE_MAX_LENGTH) {
            return fail(
              `ID type for director ${index + 1} must not exceed ${OTHER_TYPE_MAX_LENGTH} characters.`,
            );
          }
        }

        directorIdCodes.push(code);
      }

      const formData = new FormData();

      formData.append("CategoryId", info.categoryId);
      formData.append("Address", info.address);
      formData.append("Landmark", info.landmark);
      formData.append("CompanyName", info.companyName);
      formData.append("CompanyCategory", info.companyCategory);

      if (utilityCode !== null && info.utilityBill) {
        formData.append("UtilityBillType", String(utilityCode));

        if (utilityCode === OTHER_TYPE_CODE) {
          formData.append(
            "OtherUtilityBillType",
            String(info.otherUtilityBillType).trim(),
          );
        }

        formData.append("UtilityBill", info.utilityBill, info.utilityBill.name);
      }

      if (info.cacDocuments) {
        formData.append(
          "CACDocuments",
          info.cacDocuments,
          info.cacDocuments.name,
        );
      }

      directors.forEach((director: any, index: number) => {
        const idCode = directorIdCodes[index];

        formData.append(`Directors[${index}].FullName`, director.fullName);

        if (idCode !== null) {
          formData.append(`Directors[${index}].IdType`, String(idCode));
        }

        if (idCode === OTHER_TYPE_CODE) {
          formData.append(
            `Directors[${index}].OtherIdType`,
            String(director.otherIdType).trim(),
          );
        }

        formData.append(
          `Directors[${index}].EmailAddress`,
          director.emailAddress,
        );
        formData.append(
          `Directors[${index}].PhoneNumber`,
          director.phoneNumber,
        );

        if (director.idCard) {
          formData.append(
            `Directors[${index}].IdCard`,
            director.idCard,
            director.idCard.name,
          );
        }
      });

      const response = await axiosInstance.post(
        `${baseURL}/businesses/info`,
        formData,
      );

      if (response.data?.isSuccess) {
        toast.success("Business verification submitted successfully");

        dispatch(onUpdateBusinessStatus("Pending"));

        const state = getState() as RootState;
        const currentUser = state.auth.currentUser;

        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            business: {
              id: currentUser.business?.id ?? "",
              name: currentUser.business?.name ?? "",
              status: "Pending",
            },
          };
          saveUserToStorage(updatedUser, tabId, true);
        }

        return response.data?.data;
      } else {
        throw new Error("Failed to submit business verification");
      }
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  },
);