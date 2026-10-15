import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MerchantStatusSelect } from "../../admin/partial";
// import { useNavigate } from "react-router-dom";
// import { MiniCreateButton } from "../../components/small";
// import { mockMerchantLists } from "../../mock";
// import { FaQuestion } from "react-icons/fa6";
// import MerchantList from "./MerchantList";
import MerchantRow from "./MerchantRow";
import { Pagination } from "../../components/Pagination";
import {
	fetchAdminMerchants,
	type AdminMerchantsQuery,
} from "../../redux/merchant/action";
import { setMerchantListFilters } from "../../redux/merchant/reducer";
import type { AppDispatch, RootState } from "../../redux/store";

const PAGE_SIZE = 20;
const STALE_MS = 60_000;
const SKELETON_ROWS = 6;

const statusFilterMap: Record<string, 0 | 1 | 2> = {
	pending: 0,
	approved: 1,
	active: 1,
	declined: 2,
};

const getStatusFilter = (value: string) => statusFilterMap[value.toLowerCase()];

const isSameQuery = (a: AdminMerchantsQuery | null, b: AdminMerchantsQuery) =>
	!!a &&
	a.pageNumber === b.pageNumber &&
	a.pageSize === b.pageSize &&
	a.search === b.search &&
	a.status === b.status;

const MerchantRowSkeleton = () => (
	<div
		className="py-5 odd:bg-[#F5F6FF] min-w-[1000px] px-4 sm:px-5 md:px-6 grid gap-6 items-center animate-pulse"
		style={{ gridTemplateColumns: "repeat(12,1fr)" }}
	>
		<div className="col-span-4 flex items-center gap-3">
			<div className="w-[30px] h-[30px] rounded-full bg-[#E2E8F0] shrink-0" />
			<div className="h-4 w-32 bg-[#E2E8F0] rounded" />
		</div>
		<div className="col-span-3">
			<div className="h-4 w-36 bg-[#E2E8F0] rounded" />
		</div>
		<div className="col-span-2">
			<div className="h-6 w-20 bg-[#E2E8F0] rounded" />
		</div>
		<div className="col-span-3 flex justify-end">
			<div className="h-8 w-[78px] bg-[#E2E8F0] rounded" />
		</div>
	</div>
);

const ManageMerchants = () => {
	// const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const {
		adminMerchants,
		adminMerchantsTotalPages,
		adminMerchantsTotalCount,
		isFetchingAdminMerchants,
		fetchAdminMerchantsError,
		adminMerchantsQuery,
		adminMerchantsFetchedAt,
		merchantListFilters,
	} = useSelector((state: RootState) => state.merchant);

	const { statusLabel, search, page } = merchantListFilters;

	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [searchInput, setSearchInput] = useState(search);

	const status = getStatusFilter(statusLabel);

	const query = useMemo<AdminMerchantsQuery>(
		() => ({ pageNumber: page, pageSize: PAGE_SIZE, search, status }),
		[page, search, status],
	);

	useEffect(() => {
		if (searchInput.trim() === search) return;

		const timer = setTimeout(() => {
			dispatch(setMerchantListFilters({ search: searchInput.trim(), page: 1 }));
		}, 400);

		return () => clearTimeout(timer);
	}, [dispatch, searchInput, search]);

	useEffect(() => {
		const isFresh =
			adminMerchantsFetchedAt !== null &&
			Date.now() - adminMerchantsFetchedAt < STALE_MS;

		if (isSameQuery(adminMerchantsQuery, query) && isFresh) return;

		dispatch(fetchAdminMerchants(query));
	}, [dispatch, query, adminMerchantsQuery, adminMerchantsFetchedAt]);

	const onSelectClick = (value: string) => {
		setIsSelectOpen((prev) => !prev);
		dispatch(setMerchantListFilters({ statusLabel: value, page: 1 }));
	};

	const refetch = () => {
		dispatch(fetchAdminMerchants(query));
	};

	const hasLoaded = adminMerchantsFetchedAt !== null;
	const isStaleView = !isSameQuery(adminMerchantsQuery, query);
	const showSkeleton =
		(!hasLoaded && !fetchAdminMerchantsError) ||
		(isFetchingAdminMerchants && (isStaleView || adminMerchants.length === 0));

	return (
		<>
			<section className="rounded-xl bg-white p-4 lg:p-5 mt-2 flex flex-col gap-4">
				<div className="flex-between gap-4 flex-wrap">
					<MerchantStatusSelect
						selectedText={`${statusLabel} Merchants`}
						isOpen={isSelectOpen}
						onToggle={() => setIsSelectOpen((prev) => !prev)}
						handleSelect={onSelectClick}
					/>

					<div className="flex gap-5 items-center">
						<input
							type="text"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							placeholder="Search merchants"
							className="border border-[#CBD5E1] rounded px-3 py-2 text-sm outline-none focus:border-[#4A148C] w-[200px]"
						/>
					</div>
				</div>

				<div className="mt-5 lg:mt-6 overflow-x-auto">
					<div
						className="gap-6 font-montserrat font-semibold text-sm grid px-1 min-w-[1000px]"
						style={{ gridTemplateColumns: "repeat(12,1fr)" }}
					>
						<p className="col-span-4">Merchant Name</p>
						<p className="col-span-3">Created At</p>
						<p className="col-span-2">Status</p>
						<p className="col-span-3 text-right">Action</p>
					</div>

					<div className="mt-4">
						{showSkeleton &&
							Array.from({ length: SKELETON_ROWS }).map((_, i) => (
								<MerchantRowSkeleton key={i} />
							))}

						{!showSkeleton && fetchAdminMerchantsError && (
							<div className="py-10 text-center flex flex-col items-center gap-3 min-w-[1000px]">
								<p className="text-sm text-[#475569]">
									{fetchAdminMerchantsError}
								</p>
								<button
									type="button"
									onClick={refetch}
									className="text-sm text-[#4A148C] font-semibold"
								>
									Try again
								</button>
							</div>
						)}

						{!showSkeleton &&
							!fetchAdminMerchantsError &&
							adminMerchants.length === 0 && (
								<p className="py-10 text-center text-sm text-[#475569] min-w-[1000px]">
									No merchants found
								</p>
							)}

						{!showSkeleton &&
							!fetchAdminMerchantsError &&
							adminMerchants.map((merchant) => (
								<MerchantRow merchant={merchant} key={merchant.id} />
							))}
					</div>
				</div>

				{!fetchAdminMerchantsError && adminMerchantsTotalCount > 0 && (
					<Pagination
						className="mt-2"
						currentPage={page}
						totalPages={adminMerchantsTotalPages}
						totalCount={adminMerchantsTotalCount}
						pageSize={PAGE_SIZE}
						onPageChange={(nextPage) =>
							dispatch(setMerchantListFilters({ page: nextPage }))
						}
					/>
				)}
			</section>

			{/* <section className="rounded-xl bg-white p-4 lg:p-5 mt-6 flex flex-col gap-4">
				<div className="flex-between">
					<h4 className="text-light-black sm:text-lg flex items-center gap-1">
						Redemption Merchants <FaQuestion color="#4A148C" size={15} />
					</h4>

					<div className="flex gap-5 items-center">
						<button
							className="text-sm text-[#4A148C]"
							onClick={() => navigate("")}
						>
							See All
						</button>
						<MiniCreateButton text="create new" onClick={() => {}} />
					</div>
				</div>

				<div className="mt-5 lg:mt-6 overflow-x-auto">
					<div
						className="gap-6 font-montserrat font-semibold text-sm grid px-1 min-w-[1000px]"
						style={{ gridTemplateColumns: "repeat(12,1fr)" }}
					>
						<p className="col-span-3">Merchant Name</p>
						<p className="col-span-2">Total Users</p>
						<p className="col-span-2">Total Points</p>
						<p className="col-span-2">Status</p>
						<p className="col-span-3 text-right">Action</p>
					</div>
					<div className="mt-4">
						{mockMerchantLists.slice(0, 6).map((act) => (
							<MerchantList merchant={act} key={act.id} />
						))}
					</div>
				</div>
			</section> */}
		</>
	);
};

export default ManageMerchants;