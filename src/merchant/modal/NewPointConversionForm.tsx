import { IoCloseCircleOutline } from "react-icons/io5";
import { CustomSelect } from "../../components/CustomSelect";
import { useAppSelector } from "../../redux/hooks";
import Button from "../../components/Button";

type FormProps = {
  onClose: () => void;
  context: "new" | "edit";
};

const NewPointConversionForm = ({ onClose, context }: FormProps) => {
  const { toggleEditPointConversion } = useAppSelector((state) => state.point);

  return (
    <div className="bg-white w-11/12 max-w-[500px] lg:max-w-[600px] rounded-xl p-5 lg:p-6 relative">
      <h3 className="text-[#0D0D0D] font-semibold lg:text-lg text-center">
        {context === "edit" ? "Edit" : "Create"} Point Conversion
      </h3>
      <button
        className="absolute text-2xl lg:text-3xl top-4 lg:top-5 right-5"
        onClick={onClose}
      >
        <IoCloseCircleOutline />
      </button>

      <div className="mt-8 lg:mt-10 grid gap-5 lg:gap-6 mb-8 lg:mb-10">
        <CustomSelect
          context="Points Required"
          placeholder="Select the amount of points required for this conversion"
          value={
            context === "edit"
              ? String(toggleEditPointConversion?.points ?? "")
              : ""
          }
        />
        <CustomSelect
          context="Equivalent in ₦"
          placeholder="Select the equivalence"
          value={
            context === "edit"
              ? String((toggleEditPointConversion?.points ?? 0) / 5)
              : ""
          }
        />
      </div>
      <Button text="Submit" />
    </div>
  );
};

export default NewPointConversionForm;
