const SkeletonRow = ({
  valueClassName,
  valueHeight = "h-5 sm:h-6",
}: {
  valueClassName: string;
  valueHeight?: string;
}) => (
  <div className="flex items-center justify-between gap-6 py-4 border-b border-neutral-300">
    <div className="h-5 w-20 rounded bg-neutral-200 shrink-0" />
    <div className={`${valueHeight} ${valueClassName} rounded bg-neutral-200`} />
  </div>
);

const TransactionDetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex items-center gap-3 pb-5 border-b border-neutral-300">
      <div className="w-[42px] h-[42px] rounded-full bg-neutral-200 shrink-0" />
      <div className="min-w-0 flex flex-col gap-1.5">
        <div className="h-4 w-36 rounded bg-neutral-200" />
        <div className="h-3 w-48 rounded bg-neutral-200" />
      </div>
    </div>

    <div className="flex items-center justify-between gap-4 py-5">
      <div className="h-8 w-48 rounded bg-neutral-200" />
      <div className="h-10 w-32 sm:w-40 rounded-md bg-neutral-200" />
    </div>

    <div className="flex flex-col">
      <SkeletonRow valueClassName="w-24" />
      <SkeletonRow valueClassName="w-32" valueHeight="h-10" />
      <SkeletonRow valueClassName="w-48" />
      <SkeletonRow valueClassName="w-40" />
    </div>
  </div>
);

export default TransactionDetailSkeleton;