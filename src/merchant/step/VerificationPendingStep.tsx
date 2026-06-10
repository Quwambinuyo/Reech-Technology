interface Props {
  onClose: () => void;
}

const VerificationPendingStep = ({ onClose }: Props) => {
  return (
    <div className="px-6 pb-6 flex flex-col items-center gap-4 text-center">
      <h3 className="text-[16px] font-semibold text-[#060606]">
        Verification Pending!
      </h3>
      <p className="text-[13px] text-[#06060699] leading-relaxed">
        KYC Verification is pending, we'll notify you when it has been
        completed. Kindly view your progress on your profile
      </p>
      <button
        onClick={onClose}
        className="w-full bg-[#4A3FA0] text-white rounded-xl py-3 text-[15px] font-medium mt-2"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default VerificationPendingStep;
