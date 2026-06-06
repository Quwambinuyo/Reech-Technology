import Skeleton from "react-loading-skeleton";

const CategorySkeleton = () => (
	<div className="grid grid-cols-10 min-w-[650px] gap-5 md:gap-8 items-center py-4">
		<div className="col-span-2">
			<Skeleton className="md:h-[24px] !rounded-md !w-full" baseColor="" />
		</div>
		<div className="col-span-2">
			<Skeleton className="md:h-[24px] !rounded-md !w-full" baseColor="" />
		</div>

		<div className="col-span-4">
			<Skeleton className="md:h-[24px] !rounded-md !w-full" baseColor="" />
		</div>
		<div className="col-span-2 grid grid-cols-2 gap-3.5">
			<Skeleton className="h-[38px] !rounded-md rounded-md" baseColor="" />
			<Skeleton className="h-[38px] !rounded-md rounded-md" baseColor="" />
		</div>
	</div>
);

export const FetchCategoriesLoading = ({ length = 5 }) => (
	<div className="grid px-2">
		{Array(length)
			.fill(0)
			.map((_, i) => (
				<CategorySkeleton key={i} />
			))}
	</div>
);
