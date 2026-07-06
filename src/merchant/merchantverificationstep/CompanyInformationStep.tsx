import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setCategoryId,
  setCompanyName,
  setAddress,
  setLandmark,
  setCompanyCategory,
} from "../../redux/merchantVerification/reducer";
import { CustomTextInput } from "../../components/CustomInput";
import { CustomSelectNoDropDown } from "../../components/CustomSelect";
import Button from "../../components/Button";
import { fetchAdminCategories } from "../../redux/category/actions";

interface Props {
  onNext: (cacFile: File | null, utilityFile: File | null) => void;
}

type CategoryOption = {
  id: string;
  label: string;
};

const CompanyInformationStep = ({ onNext }: Props) => {
  const dispatch = useAppDispatch();
  const { categoryId, companyName, address, landmark } = useAppSelector(
    (state) => state.merchantVerification,
  );

  const [categoryOpen, setCategoryOpen] = useState(false);
  const cacRef = useRef<HTMLInputElement | null>(null);
  const utilityRef = useRef<HTMLInputElement | null>(null);
  const cacFile = useRef<File | null>(null);
  const utilityFile = useRef<File | null>(null);
  const [cacFileName, setCacFileName] = useState<string | null>(null);
  const [utilityFileName, setUtilityFileName] = useState<string | null>(null);

  const { fetchCategoriesLoading, allCategories } = useAppSelector(
    (state) => state.category,
  );

  const categoryOptions: CategoryOption[] = (allCategories ?? []).map(
    (cat: any) => ({
      id: cat.id,
      label: cat.description,
    }),
  );

  // console.log(categoryOptions);

  const selectedCategory = categoryOptions.find((c) => c.id === categoryId);

  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, []);

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
          onFileChange={(file) => {
            cacFile.current = file;
            setCacFileName(file?.name ?? null);
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
        <p className="text-sm md:text-[14.5px]">Upload Utility Bill</p>
        <FileUploadBox
          inputRef={utilityRef}
          fileName={utilityFileName}
          onFileChange={(file) => {
            utilityFile.current = file;
            setUtilityFileName(file?.name ?? null);
          }}
        />
      </div>

      <Button
        text="Next"
        onClick={() => onNext(cacFile.current, utilityFile.current)}
      />
    </div>
  );
};

interface FileUploadBoxProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  fileName: string | null;
  onFileChange: (file: File | null) => void;
}

const FileUploadBox = ({
  inputRef,
  fileName,
  onFileChange,
}: FileUploadBoxProps) => (
  <div className="border border-dashed border-[#D9D9D9] rounded-xl px-4 py-4 flex items-center gap-4">
    <input
      ref={inputRef}
      type="file"
      className="hidden"
      onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
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
);

export default CompanyInformationStep;
