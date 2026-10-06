import { useCallback, useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa6";
import { pointBalance, pointSpent, rank, redeemedPoint } from "../../assets";
import { MiniDropDown } from "../../components/CustomSelect";
import { DashboardCard } from "../dashboard/partials";
import Modal from "../../layout/Modal";
import UserRow, { UserRowSkeleton, type AdminUser } from "./UserRow";
import UserDetailCard from "./UserDetailCard";
import DeleteUserCard from "./DeleteUserCard";
import { Pagination } from "../../components/Pagination";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
	fetchUsers,
	fetchUserById,
	deleteUser,
} from "../../redux/users/action";
import { clearSelectedUser } from "../../redux/users/reducer";

type StatusFilter = "active" | "deleted" | "all";

const PAGE_SIZE = 20;
const SKELETON_ROWS = 5;

const STATUS_OPTIONS: { label: string; value: StatusFilter }[] = [
	{ label: "Active", value: "active" },
	{ label: "Deleted", value: "deleted" },
	{ label: "All", value: "all" },
];

const STATUS_LABELS = STATUS_OPTIONS.map((option) => option.label);

const ManageUsers = () => {
	const dispatch = useAppDispatch();
	const {
		allUsers,
		fetchUsersLoading,
		fetchUsersError,
		usersNetworkError,
		deleteUserLoading,
	} = useAppSelector((state) => state.user);

	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [status, setStatus] = useState<StatusFilter>("active");
	const [page, setPage] = useState(1);
	const [viewingId, setViewingId] = useState<string | null>(null);
	const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

	const loadUsers = useCallback(() => {
		dispatch(
			fetchUsers({
				PageNumber: page,
				PageSize: PAGE_SIZE,
				Search: debouncedSearch,
				Status: status,
			}),
		);
	}, [dispatch, page, debouncedSearch, status]);

	useEffect(() => {
		loadUsers();
	}, [loadUsers]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(search.trim());
			setPage(1);
		}, 400);
		return () => clearTimeout(timer);
	}, [search]);

	const viewingUser =
		allUsers.result.find((user: AdminUser) => user.id === viewingId) ?? null;

	const selectedStatusLabel =
		STATUS_OPTIONS.find((option) => option.value === status)?.label ??
		STATUS_OPTIONS[0].label;

	const handleStatusSelect = (label: string) => {
		const match = STATUS_OPTIONS.find((option) => option.label === label);
		if (!match) return;
		setStatus(match.value);
		setPage(1);
	};

	const handleView = (user: AdminUser) => {
		setViewingId(user.id);
		dispatch(fetchUserById(user.id));
	};

	const closeDetail = () => {
		setViewingId(null);
		dispatch(clearSelectedUser());
	};

	const handleConfirmDelete = async () => {
		if (!deleteTarget) return;
		try {
			await dispatch(deleteUser(deleteTarget.id)).unwrap();
			const wasLastOnPage = allUsers.result.length === 1 && page > 1;
			if (viewingId === deleteTarget.id) closeDetail();
			setDeleteTarget(null);
			if (wasLastOnPage) {
				setPage(page - 1);
			} else {
				loadUsers();
			}
		} catch {
			return;
		}
	};

	const hasError = Boolean(fetchUsersError || usersNetworkError);

	return (
		<>
			<Modal modal={Boolean(viewingUser)}>
				<>
					{viewingUser && (
						<UserDetailCard
							user={viewingUser}
							onClose={closeDetail}
							onDelete={() => setDeleteTarget(viewingUser)}
						/>
					)}
				</>
			</Modal>

			<Modal modal={Boolean(deleteTarget)}>
				<>
					{deleteTarget && (
						<DeleteUserCard
							user={deleteTarget}
							loading={deleteUserLoading}
							onConfirm={handleConfirmDelete}
							onCancel={() => setDeleteTarget(null)}
						/>
					)}
				</>
			</Modal>

			<section className="flex-between">
				<h4 className="text-xl text-[#060606] font-medium">Overview</h4>
				<MiniDropDown />
			</section>

			<section className="overflow-x-auto hide-scroll mt-7">
				<div className="grid grid-cols-4 gap-4 min-w-[1000px]">
					<DashboardCard
						icon={pointBalance}
						title="total customers"
						value={allUsers.totalCount}
						context="user"
						info={{ percentage: 12 }}
					/>
					<DashboardCard
						icon={redeemedPoint}
						title="total transactions"
						value={1200}
						context="user"
						info={{ percentage: -10 }}
					/>
					<DashboardCard
						icon={rank}
						title="total spent rewards"
						value={25}
						context="point"
						info={{ percentage: 8 }}
					/>
					<DashboardCard
						icon={pointSpent}
						title="total points"
						value={120000}
						context="point"
						info={{ percentage: 2 }}
					/>
				</div>
			</section>

			<section className="rounded-xl bg-white p-3 lg:p-4 mt-7 flex flex-col gap-4">
				<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<h4 className="text-light-black sm:text-lg flex items-center gap-1">
						Users <FaQuestion color="#4A148C" size={15} />
					</h4>

					<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search by name or email"
							className="font-ibmplex text-sm border border-[#E0E0FF] rounded-lg px-3 py-2 outline-none focus:border-[#4A148C] w-full sm:w-64"
						/>
						<MiniDropDown
							options={STATUS_LABELS}
							selectedOption={selectedStatusLabel}
							onSelect={handleStatusSelect}
						/>
					</div>
				</div>

				<div className="mt-5 lg:mt-6 overflow-x-auto">
					<div className="px-4 sm:px-5 md:px-6 lg:px-8 gap-5 font-montserrat font-semibold text-sm min-w-[900px] grid grid-cols-10">
						<p className="col-span-3">Name</p>
						<p className="col-span-2">Status</p>
						<p className="col-span-2">Joined</p>
						<p className="col-span-3 text-right">Action</p>
					</div>

					<div className="mt-4">
						{fetchUsersLoading &&
							Array.from({ length: SKELETON_ROWS }).map((_, index) => (
								<UserRowSkeleton key={index} />
							))}

						{!fetchUsersLoading && hasError && (
							<div className="py-10 text-center text-sm font-ibmplex text-gray-500">
								<p>{usersNetworkError || fetchUsersError}</p>
								<button
									onClick={loadUsers}
									className="mt-3 text-[#4A148C] font-semibold underline"
								>
									Try again
								</button>
							</div>
						)}

						{!fetchUsersLoading &&
							!hasError &&
							allUsers.result.length === 0 && (
								<p className="py-10 text-center text-sm font-ibmplex text-gray-400">
									No users found.
								</p>
							)}

						{!fetchUsersLoading &&
							!hasError &&
							allUsers.result.map((user: AdminUser) => (
								<UserRow
									key={user.id}
									user={user}
									onView={() => handleView(user)}
									onDelete={() => setDeleteTarget(user)}
								/>
							))}
					</div>
				</div>

				{!hasError && allUsers.totalCount > 0 && (
					<Pagination
						currentPage={page}
						totalPages={allUsers.totalPages}
						totalCount={allUsers.totalCount}
						pageSize={PAGE_SIZE}
						onPageChange={setPage}
						className="pt-2"
					/>
				)}
			</section>
		</>
	);
};

export default ManageUsers;