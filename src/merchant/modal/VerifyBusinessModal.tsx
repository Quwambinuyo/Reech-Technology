import { useState } from "react";
import Modal from "../../layout/Modal";
import CompanyInformationStep from "../step/CompanyInformationStep";
import DirectorInformationStep from "../step/DirectorInformationStep";
import VerificationPendingStep from "../step/VerificationPendingStep";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
}

const VerifyBusinessModal = ({ isOpen, onClose, firstName }: Props) => {
  const [step, setStep] = useState(1);

  return (
    <Modal modal={isOpen} onClose={onClose}>
      <div className="bg-white rounded-2xl w-[90vw] max-w-[480px] max-h-[90vh] overflow-y-auto">
        <div className="px-6 pt-6 pb-2 text-center">
          <h2 className="text-[17px] font-semibold text-[#060606]">
            Welcome {firstName}!
          </h2>
          <p className="text-[13px] text-[#06060699] mt-1">
            Let's Verify your company to unlock full features
          </p>
          <StepIndicator currentStep={step} />
        </div>

        {step === 1 && <CompanyInformationStep onNext={() => setStep(2)} />}
        {step === 2 && (
          <DirectorInformationStep
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && <VerificationPendingStep onClose={onClose} />}
      </div>
    </Modal>
  );
};

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-4 mb-2">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold border-2 transition-colors
              ${
                currentStep >= step
                  ? "bg-[#4A3FA0] border-[#4A3FA0] text-white"
                  : "bg-white border-[#D9D9D9] text-[#06060666]"
              }`}
          >
            {step}
          </div>
          {step < 3 && (
            <div
              className={`w-10 h-[2px] ${currentStep > step ? "bg-[#4A3FA0]" : "bg-[#D9D9D9]"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default VerifyBusinessModal;
