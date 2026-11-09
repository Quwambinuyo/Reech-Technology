export const getErrorMessage = (payload: unknown, fallback: string) => {
  if (typeof payload === "string" && payload) {
    return payload;
  }

  if (
    payload &&
    typeof payload === "object" &&
    "message" in payload &&
    typeof (payload as { message: unknown }).message === "string"
  ) {
    return (payload as { message: string }).message;
  }

  return fallback;
};

export const parseAttemptsError = (message: string) => {
  const match = message.match(/(\d+)\s+attempts?\s+left/i);

  if (!match) {
    return { text: message, attemptsLeft: null };
  }

  const text = message
    .replace(/\.?\s*You have\s+\d+\s+attempts?\s+left\.?/i, "")
    .trim();

  return { text: text || message, attemptsLeft: Number(match[1]) };
};