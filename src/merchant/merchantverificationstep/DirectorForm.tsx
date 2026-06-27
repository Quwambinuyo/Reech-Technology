import { useRef, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { updateDirectorField } from "../../redux/merchantVerification/reducer";
import { CustomTextInput } from "../../components/CustomInput";
import { CustomSelectNoDropDown } from "../../components/CustomSelect";

type IdTypeOption = {
  value: string;
  label: string;
};

const ID_TYPES: IdTypeOption[] = [
  { value: "NationalId", label: "National ID" },
  { value: "InternationalPassport", label: "International Passport" },
  { value: "DriverLicense", label: "Driver's License" },
];

interface DirectorFormProps {
  index: number;
  director: {
    fullName: string;
    idType: string;
    emailAddress: string;
    phoneNumber: string;
  };
  showRemove: boolean;
  idCardFileName: string | null;
  onRemove: () => void;
  onIdCardChange: (file: File | null) => void;
}

const DirectorForm = ({
  index,
  director,
  showRemove,
  idCardFileName,
  onRemove,
  onIdCardChange,
}: DirectorFormProps) => {
  const dispatch = useAppDispatch();
  const [idTypeOpen, setIdTypeOpen] = useState(false);
  const idCardRef = useRef<HTMLInputElement | null>(null);

  const selectedIdType = ID_TYPES.find((t) => t.value === director.idType);

  return (
    <div className="flex flex-col gap-4">
      {showRemove && (
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-[#060606]">
            Director {index + 1}
          </p>
          <button onClick={onRemove} className="text-red-500 text-[12px]">
            Remove
          </button>
        </div>
      )}

      <CustomTextInput
        id={`director-name-${index}`}
        label="Full Name"
        placeholder="Enter your Director's Full Name"
        value={director.fullName}
        handleChange={(e) =>
          dispatch(updateDirectorField(index, "fullName", e.target.value))
        }
      />

      <div className="flex flex-col gap-1">
        <CustomSelectNoDropDown
          context="ID Type"
          value={selectedIdType?.label ?? ""}
          placeholder="Select ID Type"
          handleToggle={() => setIdTypeOpen((prev) => !prev)}
        />
        {idTypeOpen && (
          <div className="border border-[#D9D9D9] rounded-xl overflow-hidden shadow-sm">
            {ID_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => {
                  dispatch(updateDirectorField(index, "idType", type.value));
                  setIdTypeOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-[13px] text-[#060606] hover:bg-[#f5f3ff] transition-colors"
              >
                {type.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm md:text-[14.5px]">Upload ID Card</p>
        <div className="border border-dashed border-[#D9D9D9] rounded-xl px-4 py-4 flex items-center gap-4">
          <input
            ref={idCardRef}
            type="file"
            className="hidden"
            onChange={(e) => onIdCardChange(e.target.files?.[0] ?? null)}
          />
          <button
            onClick={() => idCardRef.current?.click()}
            className="border border-[#4A3FA0] text-[#4A3FA0] text-[13px] font-medium px-4 py-2 rounded-lg whitespace-nowrap"
          >
            {idCardFileName ? "Change file" : "Upload files..."}
          </button>
          <p className="text-[#06060666] text-[13px]">
            {idCardFileName ?? "Drop files here"}
          </p>
        </div>
      </div>

      <CustomTextInput
        id={`director-email-${index}`}
        label="Email address"
        type="email"
        placeholder="Enter your Director's email address"
        value={director.emailAddress}
        handleChange={(e) =>
          dispatch(updateDirectorField(index, "emailAddress", e.target.value))
        }
      />

      <CustomTextInput
        id={`director-phone-${index}`}
        label="Phone Number"
        placeholder="Enter your Director's Phone number"
        value={director.phoneNumber}
        handleChange={(e) =>
          dispatch(updateDirectorField(index, "phoneNumber", e.target.value))
        }
      />
    </div>
  );
};

export default DirectorForm;
