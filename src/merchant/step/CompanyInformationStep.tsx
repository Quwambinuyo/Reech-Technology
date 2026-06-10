import { useState } from "react";
import { CustomTextInput } from "../../components/CustomInput";
import { CustomSelectNoDropDown } from "../../components/CustomSelect";
import Button from "../../components/Button";

interface Props {
  onNext: () => void;
}

const CompanyInformationStep = ({ onNext }: Props) => {
  const [category, setCategory] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");

  return (
    <div className="px-6 pb-6 flex flex-col gap-4">
      <h3 className="text-[15px] font-semibold text-[#060606] text-center">
        Company Information
      </h3>

      <CustomSelectNoDropDown
        context="Company Category"
        value={category}
        placeholder="Select category"
        handleToggle={() => {}}
      />

      <CustomTextInput
        id="company-name"
        label="Company Name"
        placeholder="Enter your company name"
        value={companyName}
        handleChange={(e) => setCompanyName(e.target.value)}
      />

      <div className="flex flex-col gap-1">
        <p className="text-sm md:text-[14.5px]">Upload CAC Documents</p>
        <FileUploadBox />
      </div>

      <CustomTextInput
        id="business-address"
        label="Business Address"
        placeholder="Enter your Business Address"
        value={address}
        handleChange={(e) => setAddress(e.target.value)}
      />

      <CustomTextInput
        id="business-landmark"
        label="Business Address (Landmark)"
        placeholder="Enter your Business Address"
        value={landmark}
        handleChange={(e) => setLandmark(e.target.value)}
      />

      <div className="flex flex-col gap-1">
        <p className="text-sm md:text-[14.5px]">Upload Utility Bill</p>
        <FileUploadBox />
      </div>

      <Button text="Next" onClick={onNext} />
    </div>
  );
};

const FileUploadBox = () => (
  <div className="border border-dashed border-[#D9D9D9] rounded-xl px-4 py-4 flex items-center gap-4">
    <button className="border border-[#4A3FA0] text-[#4A3FA0] text-[13px] font-medium px-4 py-2 rounded-lg whitespace-nowrap">
      Upload files...
    </button>
    <p className="text-[#06060666] text-[13px]">Drop files here</p>
  </div>
);

export default CompanyInformationStep;
