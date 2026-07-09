import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { resetMerchantVerification } from "../../redux/merchant/reducer";
import Button from "../../components/Button";

interface Props {
  onClose: () => void;
}

const VerificationPendingStep = ({ onClose }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(resetMerchantVerification());
    onClose();
    navigate("/dashboard");
  };

  return (
    <div className="px-6 pb-6 flex flex-col items-center gap-4 text-center">
      <h3 className="text-[16px] font-semibold text-[#060606]">
        Verification Pending!
      </h3>
      <p className="text-[13px] text-[#000000] leading-relaxed">
        KYC Verification is pending, we'll notify you when it has been
        completed. Kindly view your progress on your profile
      </p>
      <Button text="Back to Dashboard" onClick={handleClose} />
    </div>
  );
};

export default VerificationPendingStep;
