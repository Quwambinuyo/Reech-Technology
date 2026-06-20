import type { Step } from "./types";

interface Props {
  current: Step;
}

const steps = [
  { n: 1, label: "01 SELECT" },
  { n: 2, label: "02 AMOUNT" },
  { n: 3, label: "03 REVIEW" },
  { n: 4, label: "04 OTP" },
];

const StepBar = ({ current }: Props) => {
  return (
    <div className="flex items-center gap-0 mt-3 mb-5">
      {steps.map((s, i) => {
        const isDone = current > s.n;
        const isActive = current === s.n;
        return (
          <div key={s.n} className="flex items-center flex-1">
            <div className="flex flex-col items-start flex-1">
              <div
                className="w-full h-[3px] rounded-full mb-1.5"
                style={{
                  background: isDone || isActive ? "#4A148C" : "#E0E0F0",
                }}
              />
              <span
                className="text-[9px] font-ibmplex font-semibold tracking-wider whitespace-nowrap"
                style={{ color: isDone || isActive ? "#4A148C" : "#BDBDCF" }}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && <div className="w-2" />}
          </div>
        );
      })}
    </div>
  );
};

export default StepBar;
