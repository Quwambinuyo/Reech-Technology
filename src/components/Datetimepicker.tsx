import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaCalendarDays,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";

type DateTimePickerPreset = {
  label: string;
  getDate: () => Date;
};

type DateTimePickerProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  min?: Date;
  disabled?: boolean;
  placeholder?: string;
  presets?: DateTimePickerPreset[];
};

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const HOURS = Array.from({ length: 24 }, (_, index) => index);
const MINUTES = Array.from({ length: 60 }, (_, index) => index);

const pad = (value: number) => String(value).padStart(2, "0");

const toValue = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const monthLabel = (date: Date) =>
  date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

const triggerLabel = (date: Date) =>
  date.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const dayLabel = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const selectClass =
  "h-9 rounded border border-[#CBD5E1] bg-white px-2 text-sm text-[#1E293B] tabular-nums outline-none focus:border-[#4A148C] disabled:bg-[#F1F5F9] disabled:text-[#94A3B8] disabled:cursor-not-allowed";

const DateTimePicker = ({
  id,
  value,
  onChange,
  min,
  disabled,
  placeholder = "Select date and time",
  presets = [],
}: DateTimePickerProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selected = useMemo(() => (value ? new Date(value) : null), [value]);
  const [view, setView] = useState(() =>
    startOfMonth(selected ?? min ?? new Date()),
  );

  const today = new Date();
  const minDay = min ? startOfDay(min) : null;
  const isPast = selected !== null && min !== undefined && selected < min;
  const canGoPrev =
    !minDay || new Date(view.getFullYear(), view.getMonth(), 0) >= minDay;

  const cells = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;

    return Array.from(
      { length: 42 },
      (_, index) =>
        new Date(first.getFullYear(), first.getMonth(), 1 - offset + index),
    );
  }, [view]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const toggle = () => {
    if (!isOpen) {
      setView(startOfMonth(selected ?? min ?? new Date()));
    }

    setIsOpen((prev) => !prev);
  };

  const shiftMonth = (step: number) => {
    setView(new Date(view.getFullYear(), view.getMonth() + step, 1));
  };

  const selectDay = (day: Date) => {
    const next = new Date(day);

    next.setHours(
      selected ? selected.getHours() : 23,
      selected ? selected.getMinutes() : 59,
      0,
      0,
    );

    onChange(toValue(next));
  };

  const changeTime = (patch: { hours?: number; minutes?: number }) => {
    if (!selected) return;

    const next = new Date(selected);
    next.setHours(patch.hours ?? next.getHours(), patch.minutes ?? next.getMinutes());

    onChange(toValue(next));
  };

  const applyPreset = (preset: DateTimePickerPreset) => {
    const date = preset.getDate();

    setView(startOfMonth(date));
    onChange(toValue(date));
  };

  const handleClear = () => {
    onChange("");
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={toggle}
        className={`flex w-full items-center gap-3 rounded border bg-white px-3 py-2 text-left text-sm outline-none transition-colors focus-visible:border-[#4A148C] disabled:cursor-not-allowed disabled:bg-[#F1F5F9] ${
          isPast
            ? "border-[#B91C1C]"
            : isOpen
              ? "border-[#4A148C]"
              : "border-[#CBD5E1]"
        }`}
      >
        <FaCalendarDays className="shrink-0 text-[#4A148C]" />
        <span
          className={`flex-1 truncate ${
            selected ? "text-[#1E293B]" : "text-[#94A3B8]"
          }`}
        >
          {selected ? triggerLabel(selected) : placeholder}
        </span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Choose date and time"
          className="absolute left-0 top-full z-30 mt-2 w-[320px] max-w-[calc(100vw-2rem)] rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xl shadow-[#1E293B]/10"
        >
          {presets.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="rounded-full border border-[#E2E8F0] px-3 py-1 text-xs font-medium text-[#475569] transition-colors hover:border-[#4A148C] hover:text-[#4A148C] focus-visible:border-[#4A148C] focus-visible:outline-none"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              disabled={!canGoPrev}
              onClick={() => shiftMonth(-1)}
              className="flex size-8 items-center justify-center rounded text-[#475569] transition-colors hover:bg-[#EDE7F6] hover:text-[#4A148C] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <FaChevronLeft size={12} />
            </button>

            <p className="text-sm font-semibold text-[#1E293B]" aria-live="polite">
              {monthLabel(view)}
            </p>

            <button
              type="button"
              aria-label="Next month"
              onClick={() => shiftMonth(1)}
              className="flex size-8 items-center justify-center rounded text-[#475569] transition-colors hover:bg-[#EDE7F6] hover:text-[#4A148C]"
            >
              <FaChevronRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-y-1 text-center">
            {WEEKDAYS.map((weekday) => (
              <span
                key={weekday}
                className="pb-1 text-xs font-medium text-[#94A3B8]"
              >
                {weekday}
              </span>
            ))}

            {cells.map((day) => {
              const inMonth = day.getMonth() === view.getMonth();
              const isDisabled = minDay !== null && day < minDay;
              const isSelected = selected !== null && isSameDay(day, selected);
              const isToday = isSameDay(day, today);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={isDisabled}
                  aria-label={dayLabel(day)}
                  aria-pressed={isSelected}
                  onClick={() => selectDay(day)}
                  className={`mx-auto flex size-9 items-center justify-center rounded-full text-sm tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#4A148C] ${
                    isSelected
                      ? "bg-[#4A148C] font-semibold text-white"
                      : isDisabled
                        ? "cursor-not-allowed text-[#CBD5E1]"
                        : inMonth
                          ? "text-[#1E293B] hover:bg-[#EDE7F6]"
                          : "text-[#94A3B8] hover:bg-[#F1F5F9]"
                  } ${
                    isToday && !isSelected ? "ring-1 ring-[#4A148C]/50" : ""
                  }`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E2E8F0] pt-4">
            <p className="text-sm font-medium text-[#1E293B]">Time</p>

            <div className="flex items-center gap-2">
              <select
                aria-label="Hour"
                disabled={!selected}
                value={selected ? selected.getHours() : 23}
                onChange={(e) => changeTime({ hours: Number(e.target.value) })}
                className={selectClass}
              >
                {HOURS.map((hour) => (
                  <option key={hour} value={hour}>
                    {pad(hour)}
                  </option>
                ))}
              </select>

              <span className="text-[#64748B]">:</span>

              <select
                aria-label="Minute"
                disabled={!selected}
                value={selected ? selected.getMinutes() : 59}
                onChange={(e) =>
                  changeTime({ minutes: Number(e.target.value) })
                }
                className={selectClass}
              >
                {MINUTES.map((minute) => (
                  <option key={minute} value={minute}>
                    {pad(minute)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isPast && (
            <p role="alert" className="mt-3 text-xs text-[#B91C1C]">
              Choose a time in the future.
            </p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              disabled={!selected}
              onClick={handleClear}
              className="text-sm font-medium text-[#64748B] hover:text-[#B91C1C] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-[#64748B]"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded bg-[#4A148C] px-5 py-1.5 text-sm font-semibold text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;