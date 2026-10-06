import { IoCloseCircleOutline } from "react-icons/io5";
import { StatusDisplay } from "../../components/small";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { onToggleMerchantTransactionDetails } from "../../redux/transaction/reducer";
import { clearMerchantTransactionDetails } from "../../redux/dashboard/reducer";
import { formatDateTime } from "../../utils";
import Logo from "../../assets/logo-s.png";

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-6 py-4 border-b border-neutral-300">
    <p className="text-sm text-neutral-700 shrink-0">{label}</p>
    <div className="text-sm sm:text-base font-semibold text-neutral-900 text-right break-all">
      {value}
    </div>
  </div>
);

const DetailsSkeleton = () => (
  <div className="animate-pulse flex flex-col gap-5">
    <div className="flex items-center gap-3">
      <div className="w-[42px] h-[42px] rounded-full bg-neutral-200" />
      <div className="h-4 w-40 rounded bg-neutral-200" />
    </div>
    <div className="h-px bg-neutral-200" />
    <div className="h-8 w-48 rounded bg-neutral-200" />
    <div className="h-5 rounded bg-neutral-200" />
    <div className="h-5 rounded bg-neutral-200" />
    <div className="h-5 rounded bg-neutral-200" />
  </div>
);

const MerchantTransactionDetails = () => {
  const dispatch = useAppDispatch();

  const { merchantTransactionDetails, loading, error } = useAppSelector(
    (state) => state.dashboard,
  );

  const onClose = () => {
    dispatch(onToggleMerchantTransactionDetails(null));
    dispatch(clearMerchantTransactionDetails());
  };

  const renderBody = () => {
    if (error.merchantTransactionDetails) {
      return (
        <p className="text-sm text-red-600">
          {error.merchantTransactionDetails}
        </p>
      );
    }

    if (loading.merchantTransactionDetails || !merchantTransactionDetails) {
      return <DetailsSkeleton />;
    }

    const {
      name,
      email,
      profilePicture,
      points,
      isDebit,
      amount,
      status,
      reference,
      time,
    } = merchantTransactionDetails;

    return (
      <>
        <div className="flex items-center gap-3 pb-5 border-b border-neutral-300">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt={name}
              className="w-[42px] h-[42px] rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-[42px] h-[42px] rounded-full bg-[#4A148C] text-white flex items-center justify-center text-base font-semibold uppercase shrink-0">
              {name?.charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-neutral-900 truncate">{name}</p>
            <p className="text-xs text-neutral-500 truncate">{email}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 py-5">
          <p className="text-xl sm:text-2xl font-bold text-neutral-900">
            {isDebit ? "-" : "+"} {points.toLocaleString()} Points
          </p>
          <span
            className={`flex items-center gap-2 rounded-md px-6 sm:px-10 py-2.5 text-sm font-medium ${
              isDebit
                ? "bg-[#E3F2E1] text-[#43A047]"
                : "bg-[#EDE7F6] text-[#4A148C]"
            }`}
          >
            <span className="w-1 h-1 rounded-full bg-current" />
            {isDebit ? "Debit" : "Credit"}
          </span>
        </div>

        <div className="flex flex-col">
          <DetailRow label="Amount" value={`₦${amount.toLocaleString()}`} />
          <DetailRow label="Status" value={<StatusDisplay status={status} />} />
          <DetailRow label="Reference" value={reference} />
          <DetailRow label="Date/Time" value={formatDateTime(time)} />
        </div>
      </>
    );
  };

  return (
    <div className="bg-white rounded-2xl px-7 py-7 w-[92vw] max-w-[650px] font-ibmplex">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-xl sm:text-2xl font-semibold text-neutral-900">
          Transaction Details
        </h5>
        <button
          onClick={onClose}
          className="text-neutral-900 text-3xl"
          aria-label="Close"
        >
          <IoCloseCircleOutline />
        </button>
      </div>

      {renderBody()}

      <div className="flex justify-center items-center pt-6">
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

export default MerchantTransactionDetails;