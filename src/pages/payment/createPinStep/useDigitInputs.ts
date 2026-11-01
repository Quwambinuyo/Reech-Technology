import { useCallback, useRef, useState } from "react";
import { sanitizeDigits } from "../../../../src/utils";

export const useDigitInputs = (length: number, onEdit?: () => void) => {
  const [digits, setDigits] = useState<string[]>(() =>
    Array(length).fill(""),
  );
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const focus = useCallback((index: number) => {
    refs.current[index]?.focus({ preventScroll: true });
  }, []);

  const handleChange = (index: number, raw: string) => {
    const digit = sanitizeDigits(raw).slice(-1);
    const next = digits.slice();
    next[index] = digit;
    setDigits(next);
    onEdit?.();

    if (digit && index < length - 1) {
      focus(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key !== "Backspace" || digits[index] || index === 0) {
      return;
    }

    e.preventDefault();

    const next = digits.slice();
    next[index - 1] = "";
    setDigits(next);
    focus(index - 1);
  };

  const reset = () => {
    setDigits(Array(length).fill(""));
    focus(0);
  };

  const value = digits.join("");

  return {
    digits,
    refs,
    value,
    isComplete: value.length === length,
    handleChange,
    handleKeyDown,
    reset,
    focus,
  };
};

export type DigitInputs = ReturnType<typeof useDigitInputs>;