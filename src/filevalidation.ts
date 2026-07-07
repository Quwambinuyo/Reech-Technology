export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
export const MAX_FILE_SIZE_LABEL = "10MB";

export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const ALLOWED_FILE_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".jpeg",
  ".jpg",
  ".png",
  ".xls",
  ".xlsx",
];

export const FILE_ACCEPT_ATTR = ALLOWED_FILE_EXTENSIONS.join(",");

export const validateFile = (file: File | null): string | null => {
  if (!file) return null;

  const fileName = file.name.toLowerCase();
  const hasValidExtension = ALLOWED_FILE_EXTENSIONS.some((ext) =>
    fileName.endsWith(ext),
  );
  const hasValidType = ALLOWED_FILE_TYPES.includes(file.type);

  if (!hasValidExtension && !hasValidType) {
    return "Invalid file type. Accepted formats: PDF, DOC, DOCX, JPEG, PNG, XLS, XLSX.";
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File is too large. Maximum size is ${MAX_FILE_SIZE_LABEL}.`;
  }

  return null;
};
