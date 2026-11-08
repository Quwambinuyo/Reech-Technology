import type { ReactNode } from "react";

export type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  render: (row: T, index: number) => ReactNode;
  align?: "left" | "center" | "right";
  hidden?: boolean;
  pinRight?: boolean;
  maxWidth?: number;
  tooltip?: (row: T) => string | undefined;
  skeletonWidth?: string;
  skeleton?: ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T, index: number) => string;
  isLoading?: boolean;
  skeletonRows?: number;
  error?: string;
  onRetry?: () => void;
  emptyMessage?: string;
  minWidth?: number;
  className?: string;
};

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const cellBase = "px-5 py-4 whitespace-nowrap align-middle";

const headBase =
  "px-5 py-4 whitespace-nowrap font-montserrat font-semibold text-sm text-[#1E293B] bg-white";

const pinShadow = "shadow-[-8px_0_8px_-8px_rgba(15,23,42,0.12)]";

export const DataTable = <T,>({
  columns,
  rows,
  getRowKey,
  isLoading = false,
  skeletonRows = 6,
  error = "",
  onRetry,
  emptyMessage = "No records found",
  minWidth = 900,
  className = "",
}: DataTableProps<T>) => {
  const visibleColumns = columns.filter((column) => !column.hidden);
  const colSpan = visibleColumns.length;

  return (
    <div
      className={`overflow-x-auto rounded-lg border border-[#E2E8F0] ${className}`}
    >
      <table
        className="w-full border-collapse text-sm text-[#475569]"
        style={{ minWidth }}
      >
        <thead>
          <tr className="border-b border-[#E2E8F0]">
            {visibleColumns.map((column) => (
              <th
                key={column.key}
                className={`${headBase} ${alignClass[column.align ?? "left"]} ${
                  column.pinRight ? `sticky right-0 ${pinShadow}` : ""
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading &&
            Array.from({ length: skeletonRows }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white odd:bg-[#F5F6FF] animate-pulse"
              >
                {visibleColumns.map((column) => (
                  <td
                    key={column.key}
                    className={`${cellBase} ${
                      column.pinRight ? "sticky right-0 bg-inherit" : ""
                    }`}
                  >
                    {column.skeleton ?? (
                      <div
                        className={`h-4 rounded bg-[#E2E8F0] ${
                          column.skeletonWidth ?? "w-24"
                        } ${column.align === "right" ? "ml-auto" : ""}`}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}

          {!isLoading && error && (
            <tr>
              <td colSpan={colSpan} className="py-12 text-center">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-sm text-[#475569]">{error}</p>
                  {onRetry && (
                    <button
                      type="button"
                      onClick={onRetry}
                      className="text-sm font-semibold text-[#4A148C]"
                    >
                      Try again
                    </button>
                  )}
                </div>
              </td>
            </tr>
          )}

          {!isLoading && !error && rows.length === 0 && (
            <tr>
              <td
                colSpan={colSpan}
                className="py-12 text-center text-sm text-[#475569]"
              >
                {emptyMessage}
              </td>
            </tr>
          )}

          {!isLoading &&
            !error &&
            rows.map((row, rowIndex) => (
              <tr
                key={getRowKey(row, rowIndex)}
                className="bg-white odd:bg-[#F5F6FF]"
              >
                {visibleColumns.map((column) => (
                  <td
                    key={column.key}
                    title={column.tooltip?.(row)}
                    style={
                      column.maxWidth ? { maxWidth: column.maxWidth } : undefined
                    }
                    className={`${cellBase} ${alignClass[column.align ?? "left"]} ${
                      column.maxWidth ? "truncate" : ""
                    } ${column.pinRight ? `sticky right-0 bg-inherit ${pinShadow}` : ""}`}
                  >
                    {column.render(row, rowIndex)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;