import type { ActivityPointProps } from "../../types";

export const getRewardText = (act: ActivityPointProps) => {
  if (act.rewardType === 1) {
    const base = `${act.percentage ?? 0}% of amount spent`;
    return act.maxPoints ? `${base} (max ${act.maxPoints} points)` : base;
  }

  return `${act.points} points`;
};