import Skeleton from "react-loading-skeleton";

type ActionButtonProps = {
  type: "edit" | "delete" | "details" | "disable" | "enable" | "approve";
  onClick?: () => void;
  width?: string;
};

export const ActionButton = ({ type, onClick, width }: ActionButtonProps) => (
  <button
    className={`font-inter text-sm ${width ?? "w-[100px]"}  py-1.5 capitalize rounded-[10px] border font-normal ${
      type === "delete"
        ? "text-default-red border-default-red"
        : type === "disable"
          ? "text-default-red border-default-red"
          : type === "enable"
            ? "text-[#1A932E] border-[#1A932E]"
            : type === "approve"
              ? "text-[#1A932E] border-[#1A932E]"
              : "text-[#4A148C] border-[#4A148C]"
    }`}
    onClick={onClick}
  >
    {type}
  </button>
);

type CustomerInfoProps = { imgUrl: string; name: string; email: string };

export const CustomerInfo = ({ imgUrl, name, email }: CustomerInfoProps) => {
  return (
    <div className="w-full flex items-center gap-2">
      <img
        src={imgUrl}
        alt="person"
        className="rounded-full w-[28px] h-[28px]"
      />
      <div className="flex flex-col gap-0.5">
        <p className="font-semibold">{name}</p>
        <p className="text-[#A3A3A3] text-xs">{email}</p>
      </div>
    </div>
  );
};

const ActivityPointSkeleton = () => (
  <div className="grid grid-cols-10 min-w-[650px] gap-5 md:gap-8 items-center py-4">
    <div className="col-span-3">
      <Skeleton className="md:h-[24px] !rounded-md !w-full" baseColor="" />
    </div>
    <div className="col-span-2 flex-center">
      <Skeleton className="md:h-[24px] !rounded-md !w-[40px]" baseColor="" />
    </div>

    <div className="col-span-3">
      <Skeleton className="md:h-[24px] !rounded-md !w-full" baseColor="" />
    </div>
    <div className="col-span-2 grid grid-cols-2 gap-3.5">
      <Skeleton className="h-[38px] !rounded-md rounded-md" baseColor="" />
      <Skeleton className="h-[38px] !rounded-md rounded-md" baseColor="" />
    </div>
  </div>
);

export const FetchActivityPointLoading = ({ length = 5 }) => (
  <div className="grid px-2">
    {Array(length)
      .fill(0)
      .map((_, i) => (
        <ActivityPointSkeleton key={i} />
      ))}
  </div>
);
