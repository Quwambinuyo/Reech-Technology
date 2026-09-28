import moment from "moment";
import type { MerchantTransactionCardProps } from "../../types";
import { StatusDisplay } from "../../components/small";
import { useAppDispatch } from "../../redux/hooks";
import { onToggleMerchantTransactionDetails } from "../../redux/transaction/reducer";
import { fetchMerchantTransactionDetails } from "../../redux/dashboard/action";

const TransactionCard = ({
  transaction,
}: {
  transaction: MerchantTransactionCardProps;
}) => {
  const dispatch = useAppDispatch();

  const onDetailsClick = () => {
    dispatch(onToggleMerchantTransactionDetails(transaction));
    dispatch(fetchMerchantTransactionDetails(transaction.id));
  };

  return (
    <div
      className="grid font-ibmplex font-semibold text-neutral-900 gap-3 text-sm xl:text-[14.5px] items-center"
      style={{ gridTemplateColumns: "repeat(20, 1fr)" }}
    >
      <div className="col-span-5 ml-5 flex items-center gap-3">
        {transaction.profilePicture ? (
          <img
            src={transaction.profilePicture}
            alt={transaction.name}
            className="w-[29px] xl:w-[30px] aspect-square rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-[29px] xl:w-[30px] aspect-square rounded-full border border-[#4A148C] bg-[#4A148C] text-white flex items-center justify-center text-sm font-semibold uppercase shrink-0">
            {transaction.name?.charAt(0)}
          </div>
        )}
        <p className="truncate">{transaction.name}</p>
      </div>
      <p className="col-span-3 flex items-center">
        ₦{transaction.amount.toLocaleString()}
      </p>
      <p className="col-span-4 flex gap-2 items-center justify-center">
        <span>{moment(transaction.time).format("DD/MM/YYYY")}</span>
        <span>{moment(transaction.time).format("h:mm A")}</span>
      </p>
      <p className="col-span-3 flex items-center justify-center">
        {transaction.isDebit ? "-" : "+"} {transaction.points.toLocaleString()}{" "}
        Points
      </p>
      <div className="col-span-3 flex items-center">
        <StatusDisplay status={transaction.status} />
      </div>
      <button
        className="text-[#4A148C] border border-[#4A148C] rounded-lg py-2 font-normal text-sm font-inter col-span-2"
        onClick={onDetailsClick}
      >
        Details
      </button>
    </div>
  );
};

export default TransactionCard;