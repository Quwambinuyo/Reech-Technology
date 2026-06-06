import { ActionButton } from "../../../merchant/partial";
import { onToggleEditProductCategory } from "../../../redux/category/reducer";
import { useAppDispatch } from "../../../redux/hooks";
import type { AdminCategoryListProps } from "../../../types";

const CategoryList = ({ category }: { category: AdminCategoryListProps }) => {
	const dispatch = useAppDispatch();

	const onEditClick = () => {
		dispatch(onToggleEditProductCategory(category));
	};

	const status = "disabled";

	return (
		<div className="grid gap-7 xl:gap-8 grid-cols-10 font-ibmplex font-semibold text-sm lg:text-[14.5px] py-5 odd:bg-[#F5F6FF] px-5 md:px-6 min-w-[800px]">
			<p className="col-span-2 flex items-center capitalize">{category.name}</p>
			<p className="col-span-2 flex-center">{category.numOfMerchants || "0"}</p>
			<p className="col-span-4 text-center">{category.description}</p>
			<div className="col-span-2 flex items-center gap-3 lg:gap-4">
				<ActionButton type="edit" onClick={onEditClick} />
				<ActionButton type={status === "disabled" ? "enable" : "disable"} />
			</div>
		</div>
	);
};

export default CategoryList;
