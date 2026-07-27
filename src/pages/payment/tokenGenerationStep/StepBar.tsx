import type { Step } from "../types";

interface Props {
  current: Step;
}

const TOTAL_STEPS = 3;

const StepBar = ({ current }: Props) => {
  return (
    <div className="flex items-center gap-1.5 my-4">
      {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
        <div
          key={index}
          className={`h-1 flex-1 rounded-full ${
            index <= current ? "bg-[#4A148C]" : "bg-[#EFEFFF]"
          }`}
        />
      ))}
    </div>
  );
};

export default StepBar;
