import moment from "moment";
import { customerImg } from "../../assets";
import { StatusDisplay } from "../../components/small";
import { CustomerInfo } from ".";

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
  return (
    <div
      className="grid font-ibmplex font-semibold text-neutral-900 gap-4 text-sm xl:text-[14.5px] odd:bg-[#F5F6FF] p-4"
      style={{ gridTemplateColumns: "repeat(19, 1fr)" }}
    >
      <div className="col-span-4">
        <CustomerInfo
          imgUrl={transaction.profilePicture || customerImg}
          name={transaction.name}
          email={transaction.email}
        />
      </div>

      <p className="col-span-3 flex items-center">
        ₦{transaction.amount.toLocaleString()}
      </p>

      <p className="col-span-4 flex-center gap-2 text-sm">
        <span>{moment(transaction.time).format("DD/MM/YYYY")}</span>
        <span>{moment(transaction.time).format("h:mm A")}</span>
      </p>

      <p className="col-span-3 flex-center">
        {transaction.points.toLocaleString()} points
      </p>

      <div className="col-span-3 text-center">
        <StatusDisplay status={transaction.isDebit ? "Debit" : "Credit"} />
      </div>

      <div className="col-span-2">
        <button className="text-[#4A148C] border border-[#4A148C] rounded-lg py-2 text-sm font-inter font-normal w-full">
          Details
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;
