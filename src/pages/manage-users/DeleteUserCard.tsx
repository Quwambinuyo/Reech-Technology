import type { AdminUser } from "./UserRow";

interface DeleteUserCardProps {
  user: AdminUser;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteUserCard = ({
  user,
  loading,
  onConfirm,
  onCancel,
}: DeleteUserCardProps) => {
  const displayName = user.name?.trim() || user.email;

  return (
    <div className="bg-white rounded-2xl w-full max-w-[420px] mx-auto overflow-hidden shadow-xl border border-dashed border-[#D0D0F0] p-5 sm:p-6">
      <h3 className="font-montserrat font-bold text-light-black text-base">
        Delete user
      </h3>

      <p className="font-ibmplex text-sm text-[#3D3D3D] mt-3 leading-relaxed">
        Are you sure you want to delete{" "}
        <span className="font-semibold">{displayName}</span>? This will block
        their access, but their balance and transaction history will be kept.
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onCancel}
          disabled={loading}
          className="text-sm font-semibold border border-[#E0E0FF] rounded-lg px-4 py-2 disabled:opacity-40"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="text-sm font-semibold bg-red-600 text-white rounded-lg px-4 py-2 disabled:opacity-60"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default DeleteUserCard;