import { IoCloseCircleOutline } from "react-icons/io5";
import { CustomTextInput } from "../../components/CustomInput";
import { CustomSelect } from "../../components/CustomSelect";
import Button from "../../components/Button";
import { useAppSelector } from "../../redux/hooks";

type FormProps = { onClose: () => void };

const NewRankLevelForm = ({ onClose }: FormProps) => {
  const { editingRank } = useAppSelector((state) => state.reward);
  const isEditing = !!editingRank;

  return (
    <div className="bg-white w-11/12 max-w-[500px] lg:max-w-[600px] rounded-xl p-5 lg:p-6 relative">
      <h3 className="text-[#0D0D0D] font-semibold lg:text-lg text-center">
        {isEditing ? "Edit Rank" : "Create New Rank"}
      </h3>
      <button
        className="absolute text-2xl lg:text-3xl top-4 lg:top-5 right-5"
        onClick={onClose}
      >
        <IoCloseCircleOutline />
      </button>

      <div className="mt-8 lg:mt-10 grid gap-5 lg:gap-6 mb-8 lg:mb-10">
        <CustomTextInput
          label="Rank Name"
          placeholder="Enter a name for this rank"
          id="acitivityName"
          defaultValue={editingRank?.rankName ?? ""}
        />
        <CustomTextInput
          label="Minimum Point"
          placeholder="e.g 300 points"
          id="minPoint"
          defaultValue={editingRank ? String(editingRank.pointRange.min) : ""}
        />
        <CustomSelect
          context="Maximum Point"
          placeholder="Select the equivalence"
          value={editingRank ? String(editingRank.pointRange.max) : ""}
        />
      </div>
      <Button text={isEditing ? "Save Changes" : "Submit"} />
    </div>
  );
};

export default NewRankLevelForm;
