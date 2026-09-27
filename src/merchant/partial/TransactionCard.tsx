import moment from "moment";
import { customerImg } from "../../assets";
import { StatusDisplay } from "../../components/small";
import { CustomerInfo } from ".";
import { useAppDispatch } from "../../redux/hooks";
import { onToggleMerchantTransactionDetails } from "../../redux/transaction/reducer";

type MerchantTransactionProps = {
  id: string;
  userId: string;
  name: string;
  email: string;
  profilePicture: string;
  amount: number;
  points: number;
  isDebit: boolean;
  time: string;
};

const TransactionCard = ({
  transaction,
}: {
  transaction: MerchantTransactionProps;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="grid font-ibmplex font-semibold text-neutral-900 gap-4 text-sm xl:text-[14.5px] odd:bg-[#F5F6FF] p-4"
      style={{ gridTemplateColumns: "repeat(20, 1fr)" }}
    >
      <div className="col-span-5">
        <CustomerInfo
          imgUrl={transaction.profilePicture || customerImg}
          name={transaction.name}
          email={transaction.email}
        />
      </div>

      <p className="col-span-3 flex items-center">
        ₦{(transaction.amount ?? 0).toLocaleString()}
      </p>

      <p className="col-span-4 flex-center gap-2 text-sm">
        <span>
          {transaction.time
            ? moment(transaction.time).format("DD/MM/YYYY")
            : "--"}
        </span>
        <span>
          {transaction.time ? moment(transaction.time).format("h:mm A") : "--"}
        </span>
      </p>

      <p className="col-span-3 flex-center">
        {(transaction.points ?? 0).toLocaleString()} points
      </p>

      <div className="col-span-3 text-center">
        <StatusDisplay status={transaction.isDebit ? "Debit" : "Credit"} />
      </div>

      <div className="col-span-2">
        <button
          className="text-[#4A148C] border border-[#4A148C] rounded-lg py-2 text-sm font-inter font-normal w-full"
          onClick={() => dispatch(onToggleMerchantTransactionDetails(transaction))}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;