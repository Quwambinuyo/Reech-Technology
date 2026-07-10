import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa6";

import {
  onToggleCreatePointConversion,
  onToggleEditPointConversion,
} from "../redux/point/reducer";
import {
  fetchPointConversions,
  createPointConversions,
  editPointConversions,
} from "../redux/point/action";
import NewPointConversionForm from "./modal/NewPointConversionForm";
import PointEquivalentCard from "./partial/PointEquivalentCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { MiniCreateButton } from "../components/small";
import { FetchActivityPointLoading } from "./partial";
import Empty from "../components/Empty";
import Modal from "../layout/Modal";

const AllConversionPoints = () => {
  const dispatch = useAppDispatch();

  const {
    toggleCreatePointConversion,
    toggleEditPointConversion,
    fetchPointConversionsLoading,
    allPointConversions,
    createPointConversionLoading,
    createPointConversionSuccess,
    editPointConversionLoading,
    editPointConversionSuccess,
    deletePointConversionSuccess,
  } = useAppSelector((state) => state.point);

  const onCreateNewConversion = () => dispatch(onToggleCreatePointConversion());
  const onCloseEditConversion = () =>
    dispatch(onToggleEditPointConversion(null));

  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [search] = useState("");

  const onCreatePointConversion = (
    points: number,
    amount: number,
    currencyId: string,
  ) => {
    dispatch(createPointConversions({ points, amount, currencyId }));
  };

  const onEditPointConversion = (
    points: number,
    amount: number,
    currencyId: string,
  ) => {
    dispatch(
      editPointConversions({
        id: String(toggleEditPointConversion?.id ?? ""),
        info: { points, amount, currencyId },
      }),
    );
  };

  useEffect(() => {
    dispatch(
      fetchPointConversions({
        pageNumber,
        pageSize,
        search,
      }),
    );
  }, [
    createPointConversionSuccess,
    editPointConversionSuccess,
    deletePointConversionSuccess,
  ]);

  return (
    <>
      <Modal modal={toggleCreatePointConversion}>
        <NewPointConversionForm
          onClose={onCreateNewConversion}
          context="new"
          onSubmit={onCreatePointConversion}
          isLoading={createPointConversionLoading}
        />
      </Modal>

      <Modal modal={!!toggleEditPointConversion}>
        <NewPointConversionForm
          onClose={onCloseEditConversion}
          context="edit"
          onSubmit={onEditPointConversion}
          isLoading={editPointConversionLoading}
          initialPoints={toggleEditPointConversion?.points}
          initialAmount={toggleEditPointConversion?.amount}
          initialCurrencyCode={toggleEditPointConversion?.currencyCode}
        />
      </Modal>

      <div className="bg-[#FFFFFFCC] rounded-2xl py-4 lg:py-5 px-3 lg:px-4">
        <section className="flex-between gap-3">
          <h4 className="text-light-black sm:text-lg flex items-center gap-1">
            Point-to-Naira Conversion <FaQuestion color="#4A148C" size={15} />
          </h4>

          <MiniCreateButton
            text="create new"
            onClick={onCreateNewConversion}
            isDisabled={fetchPointConversionsLoading}
          />
        </section>

        <section className="mt-5 lg:mt-6 overflow-x-auto min-h-[350px]">
          {fetchPointConversionsLoading ? (
            <FetchActivityPointLoading />
          ) : allPointConversions?.result?.length > 0 ? (
            <>
              <div className="gap-5 font-montserrat font-semibold text-sm grid grid-cols-10 px-5 md:px-6 xl:px-8 min-w-[700px]">
                <p className="col-span-3">Points Required</p>
                <p className="col-span-4 flex-center">Equivalent in ₦</p>
                <p className="col-span-3 text-center">Action</p>
              </div>
              <div className="mt-4">
                {allPointConversions?.result?.map((act) => (
                  <PointEquivalentCard pointEqui={act} key={act.id} />
                ))}
              </div>
            </>
          ) : (
            <div className="h-[300px] xl:h-[300px]">
              <Empty text="No Point Conversion has been created yet" />
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default AllConversionPoints;
