import { useState } from "react";
import { toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CustomTextInput } from "../../components/CustomInput";
import type { InputEvent } from "../../types";
import Button from "../../components/Button";
import {
	createActivityPoints,
	editActivityPoints,
} from "../../redux/point/action";

type FormProps = { onClose: () => void; context: "new" | "edit" };

const NewActivityPointForm = ({ onClose, context }: FormProps) => {
	const dispatch = useAppDispatch();
	const {
		creatActivityPointLoading,
		toggleEditActivityPoint,
		editActivityPointLoading,
	} = useAppSelector((state) => state.point);

	const [form, setForm] = useState({
		activityName: context === "edit" ? toggleEditActivityPoint?.name : "",
		numOfPoint:
			context === "edit" ? String(toggleEditActivityPoint?.points) : "",
		description: context === "edit" ? toggleEditActivityPoint?.description : "",
	});

	const { activityName, numOfPoint, description } = form;

	const handleChange = (e: InputEvent) => {
		setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const isOldName =
		toggleEditActivityPoint?.name === activityName &&
		toggleEditActivityPoint?.description === description &&
		toggleEditActivityPoint?.points === Number(numOfPoint);

	const getIsOldNameEqual = () => {
		if (context === "edit" && isOldName) {
			return true;
		}
		return false;
	};

	const handleCreatePoint = () => {
		const data = {
			name: activityName as string,
			description: description as string,
			points: Number(numOfPoint) as number,
		};

		if (Number(numOfPoint) < 0) {
			toast.error("Number of points must not be less than '0' ");
		}
		if (context === "edit") {
			dispatch(
				editActivityPoints({
					info: data,
					id: toggleEditActivityPoint?.id as string,
				})
			);
		} else {
			dispatch(createActivityPoints(data));
		}
	};

	const isLoading = creatActivityPointLoading || editActivityPointLoading;

	return (
		<div className="bg-white w-11/12 max-w-[500px] lg:max-w-[600px] rounded-xl p-5 lg:p-6 relative">
			<h3 className="text-[#0D0D0D] font-semibold lg:text-lg text-center">
				{context === "edit" ? "Edit" : "Create New"} Activity Based Point
			</h3>
			<button
				className="absolute text-2xl lg:text-3xl top-4 lg:top-5 right-5"
				onClick={onClose}
			>
				<IoCloseCircleOutline />
			</button>

			<div className="mt-8 lg:mt-10 grid gap-5 lg:gap-6 mb-8 lg:mb-10">
				<CustomTextInput
					label="Activity Name"
					placeholder="Enter a name for this activity"
					id="activityName"
					value={activityName}
					handleChange={handleChange}
				/>
				<CustomTextInput
					label="Number of Point"
					placeholder="input the number of point for this activity"
					id="numOfPoint"
					value={numOfPoint}
					handleChange={handleChange}
					type="number"
					min={0}
				/>
				<CustomTextInput
					label="Description"
					placeholder="Explain this activity briefly"
					id="description"
					value={description}
					handleChange={handleChange}
				/>
			</div>
			<Button
				text={isLoading ? "Submitting..." : "Submit"}
				onClick={handleCreatePoint}
				isDisabled={
					activityName === "" ||
					numOfPoint === "" ||
					description === "" ||
					getIsOldNameEqual()
				}
				isLoading={creatActivityPointLoading || editActivityPointLoading}
			/>
		</div>
	);
};

export default NewActivityPointForm;
