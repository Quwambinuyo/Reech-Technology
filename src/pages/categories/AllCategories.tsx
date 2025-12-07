import React from "react";
import { MiniCreateButton } from "../../components/small";
import { FaQuestion } from "react-icons/fa6";
import CategoryList from "./partial/CategoryList";
import { mockCategories } from "../../mock";

const AllCategories = () => {
	const onCreateNewCategory = () => {};

	return (
		<div className="bg-[#FFFFFFCC] rounded-2xl py-4 lg:py-5 px-3 lg:px-4">
			<section className="flex-between gap-3">
				<h4 className="text-light-black sm:text-lg flex items-center gap-1">
					Product Categories <FaQuestion color="#4A148C" size={15} />
				</h4>

				<MiniCreateButton text="create new" onClick={onCreateNewCategory} />
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
	);
};

export default AllCategories;
