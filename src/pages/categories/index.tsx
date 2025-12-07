import { FaQuestion } from "react-icons/fa6";
import { MiniCreateButton } from "../../components/small";
import { mockCategories } from "../../mock";
import CategoryList from "./partial/CategoryList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { onToggleCreateProductCategory } from "../../redux/category/reducer";
import Modal from "../../layout/Modal";
import CreateCategoryForm from "./partial/CreateCategoryForm";
// import { useNavigate } from "react-router-dom";

const ManageCategories = () => {
	const dispatch = useAppDispatch();

	const { toggleCreateProductCategory } = useAppSelector(
		(state) => state.category
	);
	// const navigate = useNavigate();

	const onToggleCreateNewCategoryModal = () => {
		dispatch(onToggleCreateProductCategory());
	};

	return (
		<>
			<Modal modal={toggleCreateProductCategory}>
				<CreateCategoryForm onClose={onToggleCreateNewCategoryModal} />
			</Modal>

			<div className="bg-[#FFFFFFCC] rounded-2xl py-4 lg:py-5 px-3 lg:px-4">
				<section className="flex-between gap-3">
					<h4 className="text-light-black sm:text-lg flex items-center gap-1">
						Product Categories <FaQuestion color="#4A148C" size={15} />
					</h4>

					<MiniCreateButton
						text="create new"
						onClick={onToggleCreateNewCategoryModal}
					/>
					{/* <div className="flex justify-between items-center gap-6 xl:gap-8">
					<SeeAllBtn onClick={() => navigate("/manage-categories/all")} />
					<MiniCreateButton text="create new" onClick={onCreateNewCategory} />
				</div> */}
				</section>

				<section className="mt-5 lg:mt-6 overflow-x-auto">
					<div className="grid grid-cols-10 gap-5 font-montserrat font-semibold text-sm min-w-[800px]">
						<p className="col-span-2">Category Name</p>
						<p className="col-span-2 text-center">Total Merchants</p>
						<p className="col-span-4 text-center">Description</p>
						<p className="col-span-2 text-center">Action</p>
					</div>
					<div className="mt-4">
						{mockCategories.map((cat) => (
							<CategoryList category={cat} key={cat.id} />
						))}
					</div>
				</section>
			</div>
		</>
	);
};

export default ManageCategories;
