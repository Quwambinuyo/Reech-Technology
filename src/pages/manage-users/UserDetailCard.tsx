import { IoCloseCircleOutline } from "react-icons/io5";
import Logo from "../../assets/logo-s.png";
import Spinner from "../../components/Spinner";
import { useAppSelector } from "../../redux/hooks";
import { formatDateTime, formatNumber } from "../../utils";
import { StatusPill, type AdminUser } from "./UserRow";

interface UserDetailCardProps {
  user?: AdminUser | null;
  onClose: () => void;
  onDelete: () => void;
}

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl bg-[#F5F6FF] px-3 py-3">
    <p className="text-[11px] font-ibmplex text-gray-400">{label}</p>
    <p className="text-base font-ibmplex font-bold text-light-black mt-1">
      {value}
    </p>
  </div>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <li className="flex justify-between gap-4">
    <span className="text-xs font-ibmplex text-gray-400">{label}</span>
    <span className="text-xs font-ibmplex font-semibold text-light-black text-right break-all">
      {value}
    </span>
  </li>
);

const Divider = () => (
  <div className="border-t border-dashed border-[#E0E0FF] mx-4 sm:mx-5 lg:mx-6 xl:mx-7" />
);

const SectionTitle = ({ children }: { children: string }) => (
  <p className="font-montserrat font-bold text-xs text-light-black uppercase tracking-wide mb-3">
    {children}
  </p>
);

const UserDetailCard = ({ user, onClose, onDelete }: UserDetailCardProps) => {
  const { selectedUser, fetchUserLoading, fetchUserError, userNetworkError } =
    useAppSelector((state) => state.user);

  const details =
    user && selectedUser?.profile?.id === user.id ? selectedUser : null;
  const profile = details?.profile ?? user ?? null;

  if (!profile) return null;

  const displayName = profile.name?.trim() || "Unnamed user";
  const photo = profile.photo ?? null;
  const errorMessage = userNetworkError || fetchUserError;
  const isDeleted = profile.status === "deleted";

  return (
    <div className="bg-white rounded-2xl w-full max-w-[460px] md:max-w-[600px] lg:max-w-[650px] mx-auto overflow-hidden shadow-xl border border-dashed border-[#D0D0F0] max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center px-4 sm:px-5 lg:px-6 xl:px-7 pt-4 pb-3">
        <p className="font-montserrat font-semibold text-sm text-light-black">
          User Details
        </p>
        <button className="text-2xl lg:text-3xl" onClick={onClose}>
          <IoCloseCircleOutline />
        </button>
      </div>

      <div className="flex flex-col items-center px-4 sm:px-5 lg:px-6 xl:px-7 pt-5 pb-4">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#E8E8FF] mb-3">
          {photo ? (
            <img
              src={photo}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xl">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <h3 className="font-montserrat font-bold text-light-black text-base leading-tight">
          {displayName}
        </h3>
        <p className="text-gray-400 text-xs font-ibmplex mt-0.5">
          {profile.email}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-3">
          <StatusPill status={profile.status} />
          <span className="text-xs font-ibmplex text-gray-400">
            Joined {formatDateTime(profile.createdAt)}
          </span>
        </div>
      </div>

      <Divider />

      <div className="px-4 sm:px-5 lg:px-6 xl:px-7 py-4">
        <SectionTitle>Account</SectionTitle>
        <ul className="space-y-2.5">
          <InfoRow
            label="Phone number"
            value={details?.phoneNumber || "—"}
          />
          <InfoRow
            label="Email confirmed"
            value={profile.emailConfirmed ? "Yes" : "No"}
          />
          <InfoRow
            label="PIN setup required"
            value={profile.passwordSetupRequired ? "Yes" : "No"}
          />
          {details?.deletedAt && (
            <InfoRow
              label="Deleted on"
              value={formatDateTime(details.deletedAt)}
            />
          )}
        </ul>
      </div>

      <Divider />

      <div className="px-4 sm:px-5 lg:px-6 xl:px-7 py-4">
        <SectionTitle>Points & Transactions</SectionTitle>

        {fetchUserLoading && (
          <div className="py-8 flex items-center justify-center">
            <Spinner size="28px" borderWidth="3px" />
          </div>
        )}

        {!fetchUserLoading && errorMessage && (
          <p className="py-6 text-center text-xs font-ibmplex text-red-500">
            {errorMessage}
          </p>
        )}

        {!fetchUserLoading && !errorMessage && details && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatBox
              label="Point balance"
              value={formatNumber(details.pointBalance)}
            />
            <StatBox
              label="Points received"
              value={formatNumber(details.totalPointsReceived)}
            />
            <StatBox
              label="Points spent"
              value={formatNumber(details.totalPointsSpent)}
            />
            <StatBox
              label="Redeemed points"
              value={formatNumber(details.redeemedPoints)}
            />
            <StatBox
              label="Transactions"
              value={formatNumber(details.totalTransactions)}
            />
          </div>
        )}
      </div>

      {!isDeleted && (
        <>
          <Divider />
          <div className="px-4 sm:px-5 lg:px-6 xl:px-7 py-4 flex justify-end">
            <button
              onClick={onDelete}
              className="text-xs font-semibold text-red-600 border border-red-200 rounded-lg px-4 py-2 hover:bg-red-50"
            >
              Delete user
            </button>
          </div>
        </>
      )}

      <div className="flex justify-center items-center py-3">
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="w-[40px]" />
          <span className="font-poppins font-medium text-[#000000] -ml-1">
            reech
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDetailCard;