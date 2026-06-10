import { useState } from "react";
import { CustomTextInput } from "../../components/CustomInput";
import { CustomSelectNoDropDown } from "../../components/CustomSelect";
import Button from "../../components/Button";

interface Props {
  onBack: () => void;
  onNext: () => void;
}

const DirectorInformationStep = ({ onNext }: Props) => {
  const [fullName, setFullName] = useState("");
  const [idType, setIdType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="px-6 pb-6 flex flex-col gap-4">
      <h3 className="text-[15px] font-semibold text-[#060606] text-center">
        Director's Information
      </h3>
      <CustomTextInput
        id="director-name"
        label="Full Name"
        placeholder="Enter your Director's Full Name"
        value={fullName}
        handleChange={(e) => setFullName(e.target.value)}
      />
      <CustomSelectNoDropDown
        context="ID Type"
        value={idType}
        placeholder="Select ID Type"
        handleToggle={() => {}}
      />
      <div className="flex flex-col gap-1">
        <p className="text-sm md:text-[14.5px]">Upload ID Card</p>
        <div className="border border-dashed border-[#D9D9D9] rounded-xl px-4 py-4 flex items-center gap-4">
          <button className="border border-[#4A3FA0] text-[#4A3FA0] text-[13px] font-medium px-4 py-2 rounded-lg whitespace-nowrap">
            Upload files...
          </button>
          <p className="text-[#06060666] text-[13px]">Drop files here</p>
        </div>
      </div>
      <CustomTextInput
        id="director-email"
        label="Email address"
        type="email"
        placeholder="Enter your Director's email address"
        value={email}
        handleChange={(e) => setEmail(e.target.value)}
      />
      <CustomTextInput
        id="director-phone"
        label="Phone Number"
        placeholder="Enter your Director's Phone number"
        value={phone}
        handleChange={(e) => setPhone(e.target.value)}
      />
      <Button text="Submit Company Registration" onClick={onNext} />
      <button className="w-full border border-[#06060620] text-[#060606] rounded-xl py-3 text-[15px] font-medium">
        Add Another Director
      </button>
    </div>
  );
};

export default DirectorInformationStep;
