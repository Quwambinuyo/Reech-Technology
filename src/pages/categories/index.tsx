import { useEffect } from "react";
import { FaQuestion } from "react-icons/fa6";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAdminCategories } from "../../redux/category/actions";
import CreateCategoryForm from "./partial/CreateCategoryForm";
import { MiniCreateButton } from "../../components/small";
import { FetchCategoriesLoading } from "./partial";
import CategoryList from "./partial/CategoryList";
import Empty from "../../components/Empty";
import Modal from "../../layout/Modal";
import {
	onToggleCreateProductCategory,
	onToggleEditProductCategory,
} from "../../redux/category/reducer";

const ManageCategories = () => {
	const dispatch = useAppDispatch();

	const {
		toggleCreateProductCategory,
		fetchCategoriesLoading,
		allCategories,
		createCategorySuccess,
		toggleEditProductCategory,
		updateCategorySuccess,
	} = useAppSelector((state) => state.category);

	const onToggleCreateNewCategoryModal = () => {
		dispatch(onToggleCreateProductCategory());
	};

	useEffect(() => {
		dispatch(fetchAdminCategories());
	}, [createCategorySuccess, updateCategorySuccess]);

	return (
		<>
			<Modal modal={!!toggleEditProductCategory}>
				<CreateCategoryForm
					onClose={() => dispatch(onToggleEditProductCategory())}
					context="edit"
				/>
			</Modal>
			<Modal modal={toggleCreateProductCategory}>
				<CreateCategoryForm
					onClose={onToggleCreateNewCategoryModal}
					context="create"
				/>
			</Modal>

			<div className="bg-[#FFFFFFCC] rounded-2xl py-4 lg:py-5 px-3 lg:px-4">
				<section className="flex-between gap-3">
					<h4 className="text-light-black sm:text-lg flex items-center gap-1">
						Product Categories <FaQuestion color="#4A148C" size={15} />
					</h4>

					<MiniCreateButton
						text="create new"
						onClick={onToggleCreateNewCategoryModal}
						isDisabled={fetchCategoriesLoading}
					/>
					{/* <div className="flex justify-between items-center gap-6 xl:gap-8">
					<SeeAllBtn onClick={() => navigate("/manage-categories/all")} />
					<MiniCreateButton text="create new" onClick={onCreateNewCategory} />
				</div> */}
				</section>

				<section className="mt-6 lg:mt-7 overflow-x-auto min-h-[350px]">
					{fetchCategoriesLoading ? (
						<FetchCategoriesLoading />
					) : allCategories?.length > 0 ? (
						<>
							<div className="grid grid-cols-10 gap-5 font-montserrat font-semibold text-sm min-w-[800px]">
								<p className="col-span-2">Category Name</p>
								<p className="col-span-2 text-center">Total Merchants</p>
								<p className="col-span-4 text-center">Description</p>
								<p className="col-span-2 text-center">Action</p>
							</div>
							<div className="mt-4">
								{allCategories.map((cat) => (
									<CategoryList category={cat} key={cat.id} />
								))}
							</div>
						</>
					) : (
						<div className="h-[300px] xl:h-[300px]">
							<Empty text="No Categories has been created yet" />
						</div>
					)}
				</section>
			</div>
		</>
	);
};

export default ManageCategories;
