import { PiEmptyThin } from "react-icons/pi";

type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
};

const EmptyState = ({
  title = "No data found",
  description = "There is currently nothing to display here.",
  icon,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-[#4A148C] mb-4">
        {icon || <PiEmptyThin size={60} />}
      </div>

      <h3 className="text-neutral-700 font-semibold text-base">{title}</h3>

      <p className="text-neutral-400 text-sm mt-2 max-w-sm">{description}</p>
    </div>
  );
};

export default EmptyState;
