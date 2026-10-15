import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addDirector, removeDirector } from "../../redux/merchant/reducer";
import { submitMerchantVerification } from "../../redux/merchant/action";
import Button from "../../components/Button";
import { validateEmail } from "../../utils";
import DirectorForm from "./DirectorForm";

interface Props {
  onBack: () => void;
  onNext: () => void;
  cacFile: File | null;
  utilityFile: File | null;
}

const OTHER_ID_TYPE = "99";
const PHONE_LENGTH = 11;

const toInternationalPhone = (value: string) =>
  value.startsWith("0") ? `+234${value.slice(1)}` : `+${value}`;

const DirectorInformationStep = ({
  onBack,
  onNext,
  cacFile,
  utilityFile,
}: Props) => {
  const dispatch = useAppDispatch();
  const fullState = useAppSelector((state) => state.merchant);
  const { directors, isSubmitting, submitError } = fullState;

  const idCardFiles = useRef<(File | null)[]>(directors.map(() => null));
  const [idCardFileNames, setIdCardFileNames] = useState<(string | null)[]>(
    directors.map(() => null),
  );
  const [idCardErrors, setIdCardErrors] = useState<(string | null)[]>(
    directors.map(() => null),
  );

  const hasFileErrors = idCardErrors.some((error) => error !== null);

  const allDirectorsFilled = directors.every(
    (director, index) =>
      director.fullName.trim() !== "" &&
      director.idType.trim() !== "" &&
      (director.idType !== OTHER_ID_TYPE ||
        director.otherIdType.trim() !== "") &&
      validateEmail(director.emailAddress.trim()) &&
      new RegExp(`^\\d{${PHONE_LENGTH}}$`).test(director.phoneNumber) &&
      idCardFiles.current[index] != null,
  );

  const isFormComplete =
    cacFile != null && utilityFile != null && allDirectorsFilled;

  const canSubmit = isFormComplete && !hasFileErrors && !isSubmitting;

  const handleAddDirector = () => {
    dispatch(addDirector());
    idCardFiles.current.push(null);
    setIdCardFileNames((prev) => [...prev, null]);
    setIdCardErrors((prev) => [...prev, null]);
  };

  const handleRemoveDirector = (index: number) => {
    dispatch(removeDirector(index));
    idCardFiles.current.splice(index, 1);
    setIdCardFileNames((prev) => prev.filter((_, i) => i !== index));
    setIdCardErrors((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    const payload = {
      ...fullState,
      cacDocuments: cacFile,
      utilityBill: utilityFile,
      directors: fullState.directors.map((d, i) => ({
        ...d,
        phoneNumber: toInternationalPhone(d.phoneNumber),
        idCard: idCardFiles.current[i] ?? null,
      })),
    };
    const result = await dispatch(submitMerchantVerification(payload));
    if (submitMerchantVerification.fulfilled.match(result)) {
      onNext();
    }
  };

  return (
    <div className="px-6 pb-6 flex flex-col gap-6">
      <h3 className="text-[15px] font-semibold text-[#060606] text-center">
        Director's Information
      </h3>

      {directors.map((director, index) => (
        <DirectorForm
          key={index}
          index={index}
          director={director}
          showRemove={directors.length > 1}
          idCardFileName={idCardFileNames[index] ?? null}
          onRemove={() => handleRemoveDirector(index)}
          onIdCardChange={(file, error) => {
            idCardFiles.current[index] = error ? null : file;
            setIdCardFileNames((prev) => {
              const updated = [...prev];
              updated[index] = error ? null : (file?.name ?? null);
              return updated;
            });
            setIdCardErrors((prev) => {
              const updated = [...prev];
              updated[index] = error;
              return updated;
            });
          }}
        />
      ))}

      {submitError ? (
        <p className="text-red-500 text-[13px] text-center">{submitError}</p>
      ) : null}

      <Button
        text={isSubmitting ? "Submitting..." : "Submit Company Registration"}
        onClick={handleSubmit}
        isDisabled={!canSubmit}
      />

      <button
        onClick={handleAddDirector}
        className="w-full border border-[#06060620] text-[#060606] rounded-xl py-3 text-[15px] font-medium"
      >
        Add Another Director
      </button>

      <button
        onClick={onBack}
        className="w-full text-[#06060666] text-[13px] font-medium"
      >
        Back
      </button>
    </div>
  );
};

export default DirectorInformationStep;