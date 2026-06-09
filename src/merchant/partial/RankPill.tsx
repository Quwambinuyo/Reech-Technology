interface RankPillProps {
  rank: string;
  size?: "sm" | "md" | "lg";
}

const rankStyles: Record<string, { bg: string; text: string; border: string }> =
  {
    bronze: {
      bg: "bg-[#FFF3E0]",
      text: "text-[#BF6B00]",
      border: "border-[#CD7F32]",
    },
    silver: {
      bg: "bg-[#F5F5F5]",
      text: "text-[#6B6B6B]",
      border: "border-[#A8A9AD]",
    },
    gold: {
      bg: "bg-gradient-to-r from-[#FFD700] to-[#FFAE00]",
      text: "text-[#1A1A1A]",
      border: "border-[#FFD700]",
    },
    platinum: {
      bg: "bg-[#E8F4FD]",
      text: "text-[#1565C0]",
      border: "border-[#62B0E8]",
    },
    diamond: {
      bg: "bg-[#F3E5F5]",
      text: "text-[#6A1B9A]",
      border: "border-[#AB47BC]",
    },
  };

const sizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-sm px-4 py-1.5 font-bold tracking-wide",
};

const RankPill = ({ rank, size = "md" }: RankPillProps) => {
  const style = rankStyles[rank.toLowerCase()] ?? {
    bg: "bg-gray-100",
    text: "text-gray-600",
    border: "border-gray-300",
  };

  return (
    <span
      className={`inline-flex items-center capitalize font-semibold rounded-full border ${style.bg} ${style.text} ${style.border} ${sizeStyles[size]}`}
    >
      {rank.toUpperCase()} RANK
    </span>
  );
};

export default RankPill;
