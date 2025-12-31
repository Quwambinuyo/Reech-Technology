import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

import { CustomTextInput } from "../../../components/CustomInput";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import type { InputEvent } from "../../../types";
import Button from "../../../components/Button";
import {
	createAdminCategories,
	editAdminCategories,
} from "../../../redux/category/actions";

const CreateCategoryForm = ({
	onClose,
	context,
}: {
	onClose: () => void;
	context: "edit" | "create";
}) => {
	const dispatch = useAppDispatch();

	const {
		createCategoryLoading,
		toggleEditProductCategory,
		updateCategoryLoading,
	} = useAppSelector((state) => state.category);

	const [form, setForm] = useState({
		name: context === "edit" ? toggleEditProductCategory?.name : "",
		description:
			context === "edit" ? toggleEditProductCategory?.description : "",
	});

	const handleChange = (e: InputEvent) => {
		setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const isOldName =
		toggleEditProductCategory?.name === form.name &&
		toggleEditProductCategory?.description === form.description;

	const getIsOldNameEqual = () => {
		if (context === "edit" && isOldName) {
			return true;
		}
		return false;
	};

	const onCreateCategory = () => {
		const data = {
			name: form.name as string,
			description: form.description as string,
		};

		if (context === "edit") {
			dispatch(
				editAdminCategories({
					info: data,
					id: toggleEditProductCategory?.id as string,
				})
			);
		} else {
			dispatch(createAdminCategories(data));
		}
	};

	const isLoading = createCategoryLoading || updateCategoryLoading;

	return (
		<div className="bg-white w-11/12 max-w-[500px] lg:max-w-[600px] rounded-xl p-5 lg:p-6 relative">
			<h3 className="text-[#0D0D0D] font-semibold lg:text-lg text-center">
				{context === "edit" ? "Update" : "Create"} Product Category Point
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
					id="name"
					value={form.name}
					handleChange={handleChange}
				/>
				<CustomTextInput
					label="Description"
					placeholder="Explain this category briefly"
					id="description"
					value={form.description}
					handleChange={handleChange}
				/>
			</div>
			<Button
				text={isLoading ? "Submitting..." : "Submit"}
				onClick={onCreateCategory}
				isDisabled={
					form.name === "" || form.description === "" || getIsOldNameEqual()
				}
				isLoading={createCategoryLoading || updateCategoryLoading}
			/>
		</div>
	);
};

export default CreateCategoryForm;
