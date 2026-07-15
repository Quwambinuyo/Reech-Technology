import moment from "moment";
import type { CustomerTransactionProps } from "../../types";
import { StatusDisplay } from "../../components/small";
import { useAppDispatch } from "../../redux/hooks";
import { onToggleTransactionDetails } from "../../redux/transaction/reducer";

const TransactionCard = ({
  transaction,
  page,
}: {
  transaction: CustomerTransactionProps;
  page?: string;
}) => {
  const dispatch = useAppDispatch();

  const onDetailsClick = () => {
    dispatch(onToggleTransactionDetails(transaction));
  };

  return (
    <div
      className="grid font-ibmplex font-semibold text-neutral-900 gap-3 text-sm xl:text-[14.5px] items-center"
      style={{ gridTemplateColumns: "repeat(15,1fr)" }}
    >
      <div
        className={`col-span-4 flex items-center gap-3 ${
          page === "all" ? "xl:pl-5" : "ml-5"
        }`}
      >
        {transaction.businessLogo ? (
          <img
            src={transaction.businessLogo}
            alt={transaction.businessName}
            className="w-[29px] xl:w-[30px] rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-[29px] xl:w-[30px] aspect-square rounded-full border border-[#4A148C] bg-[#4A148C] text-white flex items-center justify-center text-sm font-semibold uppercase shrink-0">
            {transaction.businessName?.charAt(0)}
          </div>
        )}
        <p className="truncate">{transaction.businessName}</p>
      </div>
      <p className="col-span-3 flex items-center">
        {transaction.isDebit ? "-" : "+"} {transaction.points.toLocaleString()}{" "}
        Points
      </p>
      <div className="col-span-3 flex items-center">
        <StatusDisplay status={transaction.status} />
      </div>
      <p className="col-span-3 flex gap-2 items-center">
        <span>{moment(transaction.time).format("DD/MM/YYYY")}</span>
        <span>{moment(transaction.time).format("h:mm A")}</span>
      </p>
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
