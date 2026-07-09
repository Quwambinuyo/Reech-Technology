import { useMemo } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
};

const DOTS = "dots" as const;

function getPageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): (number | typeof DOTS)[] {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + siblingCount * 2;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, DOTS, totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + siblingCount * 2;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1,
    );
    return [1, DOTS, ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i,
  );
  return [1, DOTS, ...middleRange, DOTS, totalPages];
}

export function Pagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  siblingCount = 1,
  className = "",
}: PaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);

  const pageRange = useMemo(
    () => getPageRange(currentPage, safeTotalPages, siblingCount),
    [currentPage, safeTotalPages, siblingCount],
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === safeTotalPages;

  const rangeStart = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalCount);

  const handlePageClick = (page: number) => {
    const isSamePage = page === currentPage;
    const isOutOfBounds = page < 1 || page > safeTotalPages;
    if (isSamePage || isOutOfBounds) return;
    onPageChange(page);
  };

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-between gap-4 ${className}`}
    >
      <p className="text-sm text-netral-900/60">
        Showing{" "}
        <span className="font-medium text-netral-900">{rangeStart}</span> to{" "}
        <span className="font-medium text-netral-900">{rangeEnd}</span> of{" "}
        <span className="font-medium text-netral-900">{totalCount}</span>
      </p>

      <ul className="flex items-center gap-1">
        <li>
          <button
            type="button"
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={isFirstPage}
            aria-label="Previous page"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-netral-900/10 text-netral-900 transition-colors enabled:hover:bg-primary-purple enabled:hover:text-white enabled:hover:border-primary-purple disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FiChevronLeft size={16} />
          </button>
        </li>

        {pageRange.map((page, index) =>
          page === DOTS ? (
            <li
              key={`dots-${index}`}
              className="flex h-9 w-9 items-center justify-center text-netral-900/40"
            >
              &#8230;
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                onClick={() => handlePageClick(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={
                  page === currentPage
                    ? "flex h-9 w-9 items-center justify-center rounded-lg bg-primary-purple text-sm font-medium text-white"
                    : "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium text-netral-900 transition-colors hover:bg-primary-purple/10"
                }
              >
                {page}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={isLastPage}
            aria-label="Next page"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-netral-900/10 text-netral-900 transition-colors enabled:hover:bg-primary-purple enabled:hover:text-white enabled:hover:border-primary-purple disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FiChevronRight size={16} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
