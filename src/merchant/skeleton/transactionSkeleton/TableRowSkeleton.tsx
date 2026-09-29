
export const TableRowsSkeleton = () => (
  <div className="grid gap-8 animate-pulse">
    {Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="grid gap-3 items-center"
        style={{ gridTemplateColumns: "repeat(15, 1fr)" }}
      >
        <div className="col-span-4 flex items-center gap-3 xl:pl-5">
          <div className="w-[30px] h-[30px] rounded-full bg-neutral-200 shrink-0" />
          <div className="h-4 w-32 rounded bg-neutral-200" />
        </div>
        <div className="col-span-3">
          <div className="h-4 w-24 rounded bg-neutral-200" />
        </div>
        <div className="col-span-3">
          <div className="h-6 w-20 rounded-full bg-neutral-200" />
        </div>
        <div className="col-span-3">
          <div className="h-4 w-28 rounded bg-neutral-200" />
        </div>
        <div className="col-span-2">
          <div className="h-9 w-full rounded-lg bg-neutral-200" />
        </div>
      </div>
    ))}
  </div>
);