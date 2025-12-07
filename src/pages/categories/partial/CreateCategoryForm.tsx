import { IoCloseCircleOutline } from "react-icons/io5";
import { CustomTextInput } from "../../../components/CustomInput";
import Button from "../../../components/Button";

const CreateCategoryForm = ({ onClose }: { onClose: () => void }) => {
	return (
		<div className="bg-white w-11/12 max-w-[500px] lg:max-w-[600px] rounded-xl p-5 lg:p-6 relative">
			<h3 className="text-[#0D0D0D] font-semibold lg:text-lg text-center">
				Create Product Category Point
			</h3>
			<button
				className="absolute text-2xl lg:text-3xl top-4 lg:top-5 right-5"
				onClick={onClose}
			>
				<IoCloseCircleOutline />
			</button>

			<div className="mt-8 lg:mt-10 grid gap-5 lg:gap-6 mb-8 lg:mb-10">
				<CustomTextInput
					label="Category Name"
					placeholder="Enter a name for this category"
					id="categoryName"
				/>
				<CustomTextInput
					label="Description"
					placeholder="Explain this category briefly"
					id="description"
				/>
			</div>
			<Button text="Submit" />
		</div>
	);
};

export default CreateCategoryForm;
