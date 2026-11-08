import { useCallback, useEffect, useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiGift,
  FiSearch,
  FiStar,
  FiX,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchWaysToEarn, redeemOfflineCode } from "../redux/dashboard/action";
import { clearRedeemResult } from "../redux/dashboard/reducer";
import { PENDING_CODE_KEY } from "../pages/claim/ClaimRedirect";

const PAGE_SIZE = 12;
const SEARCH_DELAY = 400;
const CODE_LENGTH = 32;
const FALLBACK_DESCRIPTION = "Complete this activity to earn points.";

const KEEP_CODE_ERRORS = [
  "Network error",
  "Authorization failed",
  "Too many attempts. Please wait a minute and try again.",
  "Code is currently unavailable",
  "Code is unavailable",
];

const redeemSteps = [
  "Buy from a partner shop",
  "Get your code",
  "Enter it below",
];

type RewardInfo = {
  rewardType: number;
  points: number;
  percentage: number;
  maxPoints: number | null;
};

const formatReward = ({
  rewardType,
  points,
  percentage,
  maxPoints,
}: RewardInfo) => {
  if (rewardType === 1) {
    const base = `${Number(percentage)}% back`;
    return maxPoints ? `${base} · up to ${maxPoints.toLocaleString()}` : base;
  }

  return `${points.toLocaleString()} points`;
};

const formatCode = (value: string) =>
  value
    .replace(/[^a-z0-9]/gi, "")
    .toUpperCase()
    .slice(0, CODE_LENGTH)
    .replace(/(.{4})(?=.)/g, "$1-");

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "?";

const MerchantLogo = ({ name, logo }: { name: string; logo: string | null }) => {
  const [failed, setFailed] = useState(false);

  if (logo && !failed) {
    return (
      <img
        src={logo}
        alt={name}
        onError={() => setFailed(true)}
        className="size-10 rounded-xl object-cover shrink-0 ring-1 ring-black/5"
      />
    );
  }

  return (
    <span className="size-10 rounded-xl bg-primary-purple text-white text-xs font-semibold flex items-center justify-center shrink-0">
      {getInitials(name)}
    </span>
  );
};

const RewardPill = ({ reward }: { reward: RewardInfo }) => {
  const isPercentage = reward.rewardType === 1;

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        isPercentage
          ? "bg-primary-purple/10 text-primary-purple"
          : "bg-[#E6F6EC] text-[#15803D]"
      }`}
    >
      <FiStar size={12} />
      {formatReward(reward)}
    </span>
  );
};

const CardSkeleton = () => (
  <div className="flex flex-col gap-4 rounded-2xl bg-primary-purple/5 p-4 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="size-10 rounded-xl bg-gray-200" />
      <div className="h-3 w-1/3 rounded bg-gray-200" />
    </div>
    <div className="flex flex-col gap-2">
      <div className="h-4 w-2/3 rounded bg-gray-200" />
      <div className="h-3 w-full rounded bg-gray-200" />
    </div>
    <div className="h-6 w-24 rounded-full bg-gray-200" />
  </div>
);

const RedeemCode = () => {
  const dispatch = useAppDispatch();

  const { redeemResult, loading, error } = useAppSelector(
    (state) => state.dashboard,
  );

  const [code, setCode] = useState(() =>
    formatCode(sessionStorage.getItem(PENDING_CODE_KEY) ?? ""),
  );

  const isComplete = code.replace(/-/g, "").length === CODE_LENGTH;
  const isRedeeming = loading.redeemCode;
  const errorMessage = error.redeemCode;

  useEffect(() => {
    return () => {
      dispatch(clearRedeemResult());
    };
  }, [dispatch]);

  useEffect(() => {
    if (redeemResult) {
      sessionStorage.removeItem(PENDING_CODE_KEY);
    }
  }, [redeemResult]);

  useEffect(() => {
    if (errorMessage && !KEEP_CODE_ERRORS.includes(errorMessage)) {
      sessionStorage.removeItem(PENDING_CODE_KEY);
    }
  }, [errorMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMessage) {
      dispatch(clearRedeemResult());
    }

    setCode(formatCode(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isComplete || isRedeeming) {
      return;
    }

    dispatch(redeemOfflineCode(code));
  };

  const handleAnother = () => {
    sessionStorage.removeItem(PENDING_CODE_KEY);
    dispatch(clearRedeemResult());
    setCode("");
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary-purple p-5 lg:p-6 text-white">
      <span className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10" />
      <span className="pointer-events-none absolute -bottom-12 right-24 size-32 rounded-full bg-white/5" />

      {redeemResult ? (
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="size-12 shrink-0 rounded-full bg-white text-[#15803D] flex items-center justify-center">
              <FiCheckCircle size={24} />
            </span>

            <div>
              <p className="text-xl font-semibold">
                +{redeemResult.pointsAwarded.toLocaleString()} points added
              </p>
              <p className="text-sm text-white/80">
                {redeemResult.activityName} · New balance{" "}
                <span className="font-semibold text-white">
                  {redeemResult.balanceAfter.toLocaleString()} points
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAnother}
            className="h-10 shrink-0 rounded-full bg-white px-5 text-sm font-semibold text-primary-purple transition hover:bg-white/90"
          >
            Redeem another code
          </button>
        </div>
      ) : (
        <div className="relative flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="size-11 shrink-0 rounded-full bg-white/15 flex items-center justify-center">
              <FiGift size={20} />
            </span>

            <div>
              <h5 className="font-semibold lg:text-lg">
                Got a code from a shop?
              </h5>
              <p className="text-sm text-white/80">
                Enter it to add the points to your wallet.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              value={code}
              onChange={handleChange}
              disabled={isRedeeming}
              aria-label="Offline points code"
              placeholder="XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              className={`h-11 w-full min-w-0 flex-1 rounded-full bg-white px-4 font-mono text-xs tracking-wider text-light-black outline-none ring-2 transition placeholder:text-gray-300 sm:text-sm ${
                errorMessage ? "ring-red-300" : "ring-transparent"
              }`}
            />

            <button
              type="submit"
              disabled={!isComplete || isRedeeming}
              className="h-11 shrink-0 rounded-full bg-white px-6 text-sm font-semibold text-primary-purple transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isRedeeming ? "Redeeming..." : "Redeem code"}
            </button>
          </form>

          {errorMessage && (
            <div
              role="alert"
              className="flex w-fit max-w-full items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600"
            >
              <FiAlertCircle size={14} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <ol className="hidden flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/80 sm:flex">
            {redeemSteps.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span className="size-5 rounded-full bg-white/15 text-[11px] font-semibold text-white flex items-center justify-center">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

const WaysToEarn = () => {
  const dispatch = useAppDispatch();

  const { waysToEarn, loading, error } = useAppSelector(
    (state) => state.dashboard,
  );

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, SEARCH_DELAY);

    return () => window.clearTimeout(timer);
  }, [search]);

  const load = useCallback(() => {
    dispatch(
      fetchWaysToEarn({
        pageNumber: page,
        pageSize: PAGE_SIZE,
        search: debouncedSearch,
      }),
    );
  }, [dispatch, page, debouncedSearch]);

  useEffect(() => {
    load();
  }, [load]);

  const handleClear = () => {
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
  };

  const items = waysToEarn?.result ?? [];
  const totalPages = waysToEarn?.totalPages ?? 1;
  const totalCount = waysToEarn?.totalCount ?? 0;
  const isInitialLoad = loading.waysToEarn && !waysToEarn;
  const errorMessage = error.waysToEarn;

  return (
    <div className="flex flex-col gap-5">
      <RedeemCode />

      <section className="rounded-2xl bg-white p-4 lg:p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="size-11 rounded-full bg-primary-purple/5 text-primary-purple flex items-center justify-center shrink-0">
              <FiGift size={20} />
            </span>

            <div>
              <div className="flex items-center gap-2">
                <h5 className="text-light-black font-semibold lg:text-lg">
                  Ways to earn
                </h5>
                {totalCount > 0 && (
                  <span className="rounded-full bg-primary-purple/10 px-2 py-0.5 text-xs font-medium text-primary-purple">
                    {totalCount}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Complete these at our partner merchants to earn points.
              </p>
            </div>
          </div>

          <div className="relative w-full sm:w-56">
            <FiSearch
              size={14}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              aria-label="Search activities or merchants"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="h-9 w-full rounded-full bg-primary-purple/5 pl-9 pr-8 text-sm outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-primary-purple/40"
            />
            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX size={14} />
              </button>
            )}
          </div>
        </div>

        {errorMessage && (
          <div className="flex items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            <span>{errorMessage}</span>
            <button
              type="button"
              onClick={load}
              className="shrink-0 font-medium text-primary-purple"
            >
              Retry
            </button>
          </div>
        )}

        {isInitialLoad ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : items.length > 0 ? (
          <ul
            className={`grid gap-3 md:grid-cols-2 xl:grid-cols-3 transition-opacity ${
              loading.waysToEarn ? "opacity-60" : ""
            }`}
          >
            {items.map((item) => (
              <li
                key={item.activityId}
                className="flex flex-col gap-4 rounded-2xl bg-primary-purple/5 p-4"
              >
                <div className="flex items-center gap-3">
                  <MerchantLogo
                    name={item.businessName}
                    logo={item.businessLogo}
                  />
                  <p className="truncate text-xs font-medium text-gray-500">
                    {item.businessName}
                  </p>
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-light-black">{item.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500 line-clamp-2">
                    {item.description || FALLBACK_DESCRIPTION}
                  </p>
                </div>

                <RewardPill reward={item} />
              </li>
            ))}
          </ul>
        ) : (
          !errorMessage &&
          !loading.waysToEarn && (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <span className="size-12 rounded-full bg-primary-purple/10 text-primary-purple flex items-center justify-center">
                {debouncedSearch ? <FiSearch size={20} /> : <FiGift size={20} />}
              </span>
              <p className="text-sm text-gray-500">
                {debouncedSearch
                  ? `No activities match "${debouncedSearch}".`
                  : "No activities to earn from yet. Check back soon."}
              </p>
            </div>
          )
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 text-sm">
            <button
              type="button"
              aria-label="Previous page"
              disabled={page <= 1 || loading.waysToEarn}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="size-9 rounded-full border border-primary-purple/20 text-primary-purple flex items-center justify-center transition hover:bg-primary-purple/10 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <FiChevronLeft size={16} />
            </button>

            <span className="text-gray-500">
              Page <span className="font-medium text-light-black">{page}</span>{" "}
              of {totalPages}
            </span>

            <button
              type="button"
              aria-label="Next page"
              disabled={page >= totalPages || loading.waysToEarn}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="size-9 rounded-full border border-primary-purple/20 text-primary-purple flex items-center justify-center transition hover:bg-primary-purple/10 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default WaysToEarn;