import { useState } from "react";
import { ActionButton, CustomerInfo } from ".";
import type { UserProps } from "../../types";
import RankDetailCard from "./RankDetailCard";
import Modal from "../../layout/Modal";

interface RankProps {
  id: number;
  customer: UserProps;
  rank: string;
  totalPoints: number;
}

const UserRankCard = ({ user }: { user: RankProps }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <Modal modal={showDetail}>
        <RankDetailCard user={user} onClose={() => setShowDetail(false)} />
      </Modal>

      <div className="font-ibmplex font-semibold text-sm lg:text-[14.5px] py-5 odd:bg-[#F5F6FF] min-w-[800px] px-4 sm:px-5 md:px-6 lg:px-8 grid grid-cols-8 gap-5">
        <div className="col-span-3">
          <CustomerInfo
            name={user.customer.name}
            email={user.customer.email}
            imgUrl={user.customer.avatarUrl}
          />
        </div>

        <p className="col-span-2 flex items-center capitalize">{user.rank}</p>

        <p className="col-span-2 flex items-center">
          {user.totalPoints} points
        </p>

        <div className="col-span-1 flex items-center">
          <ActionButton type="details" onClick={() => setShowDetail(true)} />
        </div>
      </div>
    </>
  );
};

export default UserRankCard;
