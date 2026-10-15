import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setCategoryId,
  setCompanyName,
  setAddress,
  setLandmark,
  setCompanyCategory,
  setUtilityBillType,
  setOtherUtilityBillType,
} from "../../redux/merchant/reducer";
import { CustomTextInput } from "../../components/CustomInput";
import { CustomSelectNoDropDown } from "../../components/CustomSelect";
import Button from "../../components/Button";
import { fetchAdminCategories } from "../../redux/category/actions";
import { validateFile, FILE_ACCEPT_ATTR } from "../../filevalidation";

interface Props {
  onNext: (cacFile: File | null, utilityFile: File | null) => void;
}

type CategoryOption = {
  id: string;
  label: string;
};

type UtilityBillOption = {
  value: string;
  label: string;
};

const OTHER_UTILITY_BILL_TYPE = "99";
const OTHER_TYPE_MAX_LENGTH = 100;

const UTILITY_BILL_TYPES: UtilityBillOption[] = [
  { value: "0", label: "Electricity Bill" },
  { value: "1", label: "Water Bill" },
  { value: "2", label: "Waste Bill" },
  { value: OTHER_UTILITY_BILL_TYPE, label: "Other" },
];

const CompanyInformationStep = ({ onNext }: Props) => {
  const dispatch = useAppDispatch();
  const {
    categoryId,
    companyName,
    address,
    landmark,
    utilityBillType,
    otherUtilityBillType,
  } = useAppSelector((state) => state.merchant);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [utilityTypeOpen, setUtilityTypeOpen] = useState(false);
  const cacRef = useRef<HTMLInputElement | null>(null);
  const utilityRef = useRef<HTMLInputElement | null>(null);
  const cacFile = useRef<File | null>(null);
  const utilityFile = useRef<File | null>(null);
  const [cacFileName, setCacFileName] = useState<string | null>(null);
  const [utilityFileName, setUtilityFileName] = useState<string | null>(null);
  const [cacError, setCacError] = useState<string | null>(null);
  const [utilityError, setUtilityError] = useState<string | null>(null);

  const { fetchCategoriesLoading, allCategories } = useAppSelector(
    (state) => state.category,
  );

  const categoryOptions: CategoryOption[] = (allCategories ?? []).map(
    (cat: any) => ({
      id: cat.id,
      label: cat.description,
    }),
  );

  const selectedCategory = categoryOptions.find((c) => c.id === categoryId);
  const selectedUtilityType = UTILITY_BILL_TYPES.find(
    (t) => t.value === utilityBillType,
  );
  const isOtherUtilitySelected = utilityBillType === OTHER_UTILITY_BILL_TYPE;

  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, [dispatch]);

  const isFormComplete =
    categoryId.trim() !== "" &&
    companyName.trim() !== "" &&
    address.trim() !== "" &&
    landmark.trim() !== "" &&
    utilityBillType.trim() !== "" &&
    (!isOtherUtilitySelected || otherUtilityBillType.trim() !== "") &&
    cacFileName !== null &&
    utilityFileName !== null;

  const canSubmit = isFormComplete && !cacError && !utilityError;

  return (
    <div className="px-6 pb-6 flex flex-col gap-4">
      <h3 className="text-[15px] font-semibold text-[#060606] text-center">
        Company Information
      </h3>

      <div className="flex flex-col gap-1">
        <CustomSelectNoDropDown
          context="Company Category"
          value={selectedCategory?.label ?? ""}
          placeholder="Select category"
          handleToggle={() => setCategoryOpen((prev) => !prev)}
        />
        {categoryOpen && (
          <div className="border border-[#D9D9D9] rounded-xl overflow-hidden shadow-sm">
            {fetchCategoriesLoading ? (
              <p className="px-4 py-2.5 text-[13px] text-[#06060666]">
                Loading...
              </p>
            ) : (
              categoryOptions.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    dispatch(setCategoryId(cat.id));
                    dispatch(setCompanyCategory(cat.label));
                    setCategoryOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-[13px] text-[#060606] hover:bg-[#f5f3ff] transition-colors"
                >
                  {cat.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <CustomTextInput
        id="company-name"
        label="Company Name"
        placeholder="Enter your company name"
        value={companyName}
        handleChange={(e) => dispatch(setCompanyName(e.target.value))}
      />

      <div className="flex flex-col gap-1">
        <p className="text-sm md:text-[14.5px]">Upload CAC Documents</p>
        <FileUploadBox
          inputRef={cacRef}
          fileName={cacFileName}
          error={cacError}
          onFileChange={(file, error) => {
            cacFile.current = error ? null : file;
            setCacFileName(error ? null : (file?.name ?? null));
            setCacError(error);
          }}
        />
      </div>

      <CustomTextInput
        id="business-address"
        label="Business Address"
        placeholder="Enter your Business Address"
        value={address}
        handleChange={(e) => dispatch(setAddress(e.target.value))}
      />

      <CustomTextInput
        id="business-landmark"
        label="Business Address (Landmark)"
        placeholder="Enter your Business Landmark"
        value={landmark}
        handleChange={(e) => dispatch(setLandmark(e.target.value))}
      />

      <div className="flex flex-col gap-1">
        <CustomSelectNoDropDown
          context="Utility Bill Type"
          value={selectedUtilityType?.label ?? ""}
          placeholder="Select Utility Bill Type"
          handleToggle={() => setUtilityTypeOpen((prev) => !prev)}
        />
        {utilityTypeOpen && (
          <div className="border border-[#D9D9D9] rounded-xl overflow-hidden shadow-sm">
            {UTILITY_BILL_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => {
                  dispatch(setUtilityBillType(type.value));
                  setUtilityTypeOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-[13px] text-[#060606] hover:bg-[#f5f3ff] transition-colors"
              >
                {type.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {isOtherUtilitySelected && (
        <CustomTextInput
          id="other-utility-bill-type"
          label="Specify Utility Bill Type"
          placeholder="Enter the type of utility bill"
          value={otherUtilityBillType}
          handleChange={(e) =>
            dispatch(setOtherUtilityBillType(e.target.value))
          }
          otherInputProps={{ maxLength: OTHER_TYPE_MAX_LENGTH }}
        />
      )}

      <div className="flex flex-col gap-1">
        <p className="text-sm md:text-[14.5px]">Upload Utility Bill</p>
        <FileUploadBox
          inputRef={utilityRef}
          fileName={utilityFileName}
          error={utilityError}
          onFileChange={(file, error) => {
            utilityFile.current = error ? null : file;
            setUtilityFileName(error ? null : (file?.name ?? null));
            setUtilityError(error);
          }}
        />
      </div>

      <Button
        text="Next"
        onClick={() => onNext(cacFile.current, utilityFile.current)}
        isDisabled={!canSubmit}
      />
    </div>
  );
};

interface FileUploadBoxProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  fileName: string | null;
  error: string | null;
  onFileChange: (file: File | null, error: string | null) => void;
}

const FileUploadBox = ({
  inputRef,
  fileName,
  error,
  onFileChange,
}: FileUploadBoxProps) => {
  const handleFile = (file: File | null) => {
    const validationError = validateFile(file);
    if (validationError) {
      onFileChange(null, validationError);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    onFileChange(file, null);
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`border border-dashed rounded-xl px-4 py-4 flex items-center gap-4 ${
          error ? "border-red-400" : "border-[#D9D9D9]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={FILE_ACCEPT_ATTR}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
        <button
          onClick={() => inputRef.current?.click()}
          className="border border-[#4A3FA0] text-[#4A3FA0] text-[13px] font-medium px-4 py-2 rounded-lg whitespace-nowrap"
        >
          {fileName ? "Change file" : "Upload files..."}
        </button>
        <p className="text-[#06060666] text-[13px]">
          {fileName ?? "Drop files here"}
        </p>
      </div>
      {error && <p className="text-red-500 text-[12px]">{error}</p>}
    </div>
  );
};

export default CompanyInformationStep;