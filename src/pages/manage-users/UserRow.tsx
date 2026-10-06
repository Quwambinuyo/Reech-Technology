import type { AdminUser } from "../../redux/users/reducer";
import { formatDateTime } from "../../utils";

export type { AdminUser };

interface UserRowProps {
  user: AdminUser;
  onView: () => void;
  onDelete: () => void;
}

interface CustomerInfoProps {
  name: string;
  email: string;
  imgUrl?: string;
}

interface ActionButtonProps {
  onClick: () => void;
}

export const StatusPill = ({ status }: { status: string }) => {
  const isActive = status === "active";
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
        isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
      }`}
    >
      {status}
    </span>
  );
};

const CustomerInfo = ({ name, email, imgUrl }: CustomerInfoProps) => (
  <div className="flex items-center gap-3 min-w-0">
    <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden border border-[#E8E8FF]">
      {imgUrl ? (
        <img src={imgUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
    <div className="min-w-0">
      <p className="font-montserrat font-semibold text-light-black text-sm truncate">
        {name}
      </p>
      <p className="font-ibmplex text-xs text-gray-400 font-normal truncate">
        {email}
      </p>
    </div>
  </div>
);

const ViewButton = ({ onClick }: ActionButtonProps) => (
  <button
    onClick={onClick}
    className="text-sm font-medium text-[#4A148C] bg-white border border-[#4A148C] rounded-lg px-6 py-2 hover:bg-[#F5F0FA] transition-colors"
  >
    View
  </button>
);

const DeleteButton = ({ onClick }: ActionButtonProps) => (
  <button
    onClick={onClick}
    className="text-sm font-medium text-red-600 bg-white border border-red-600 rounded-lg px-6 py-2 hover:bg-red-50 transition-colors"
  >
    Delete
  </button>
);

export const UserRowSkeleton = () => (
  <div className="animate-pulse py-5 odd:bg-[#F5F6FF] min-w-[900px] px-4 sm:px-5 md:px-6 lg:px-8 grid grid-cols-10 gap-5">
    <div className="col-span-3 flex items-center gap-3">
      <div className="w-10 h-10 shrink-0 rounded-full bg-neutral-200" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-3.5 w-32 rounded bg-neutral-200" />
        <div className="h-3 w-44 rounded bg-neutral-200" />
      </div>
    </div>

    <div className="col-span-2 flex items-center">
      <div className="h-6 w-16 rounded-full bg-neutral-200" />
    </div>

    <div className="col-span-2 flex items-center">
      <div className="h-4 w-36 rounded bg-neutral-200" />
    </div>

    <div className="col-span-3 flex items-center justify-end gap-3">
      <div className="h-9 w-[84px] rounded-lg bg-neutral-200" />
      <div className="h-9 w-[92px] rounded-lg bg-neutral-200" />
    </div>
  </div>
);

const UserRow = ({ user, onView, onDelete }: UserRowProps) => {
  const displayName = user.name?.trim() || "Unnamed user";
  const isDeleted = user.status === "deleted";

  return (
    <div className="font-ibmplex font-semibold text-sm lg:text-[14.5px] py-5 odd:bg-[#F5F6FF] min-w-[900px] px-4 sm:px-5 md:px-6 lg:px-8 grid grid-cols-10 gap-5">
      <div className="col-span-3">
        <CustomerInfo
          name={displayName}
          email={user.email}
          imgUrl={user.photo ?? undefined}
        />
      </div>

      <div className="col-span-2 flex flex-col items-start justify-center gap-1">
        <StatusPill status={user.status} />
        {user.passwordSetupRequired && (
          <span className="text-[11px] font-medium text-amber-600">
            PIN awaiting setup
          </span>
        )}
      </div>

      <p className="col-span-2 flex items-center">
        {formatDateTime(user.createdAt)}
      </p>

      <div className="col-span-3 flex items-center justify-end gap-3">
        <ViewButton onClick={onView} />
        {!isDeleted && <DeleteButton onClick={onDelete} />}
      </div>
    </div>
  );
};

export default UserRow;