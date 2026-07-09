import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import NewPointConversionForm from "./modal/NewPointConversionForm";
import { MiniCreateButton, SeeAllBtn } from "../components/small";
import PointEquivalentCard from "./partial/PointEquivalentCard";
import NewActivityPointForm from "./modal/NewActivityPointForm";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ActivityPointCard from "./partial/ActivityPointCard";
import ConfirmAction from "../components/ConfirmAction";
import { FetchActivityPointLoading } from "./partial";
import Empty from "../components/Empty";
import Modal from "../layout/Modal";
import { Pagination } from "../components/Pagination";
import {
  deleteActivityPoints,
  fetchActivityPoints,
  fetchPointConversions,
  createPointConversions,
  editPointConversions,
} from "../redux/point/action";
import {
  onToggleCreateActivityPoint,
  onToggleCreatePointConversion,
  onToggleDeleteActivityPoint,
  onToggleEditActivityPoint,
  onToggleEditPointConversion,
} from "../redux/point/reducer";

const PointUpload = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [activityPageNumber, setActivityPageNumber] = useState(1);
  const [activityPageSize] = useState(6);
  const [conversionPageNumber, setConversionPageNumber] = useState(1);
  const [conversionPageSize] = useState(6);

  const {
    toggleCreateActivityPoint,
    toggleCreatePointConversion,
    fetchActivityPointsLoading,
    allActivityPoints,
    createActivityPointSuccesss,
    toggleEditActivityPoint,
    editActivityPointSuccess,
    deleteActivityPointLoading,
    deleteActivityPointSuccess,
    toggleDeleteActivityPoint,
    toggleEditPointConversion,
    fetchPointConversionsLoading,
    allPointConversions,
    createPointConversionSuccess,
    createPointConversionLoading,
    editPointConversionSuccess,
    editPointConversionLoading,
    deletePointConversionSuccess,
  } = useAppSelector((state) => state.point);

  const onCreateNewActivity = () => dispatch(onToggleCreateActivityPoint());
  const onCloseEditActivity = () => dispatch(onToggleEditActivityPoint(null));
  const onCreateNewConversion = () => dispatch(onToggleCreatePointConversion());
  const onCloseEditConversion = () =>
    dispatch(onToggleEditPointConversion(null));

  const onDeleteActivityPoint = () => {
    dispatch(deleteActivityPoints(toggleDeleteActivityPoint));
  };

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
      fetchActivityPoints({
        pageNumber: activityPageNumber,
        pageSize: activityPageSize,
      }),
    );
  }, [
    dispatch,
    activityPageNumber,
    activityPageSize,
    createActivityPointSuccesss,
    editActivityPointSuccess,
    deleteActivityPointSuccess,
  ]);

  useEffect(() => {
    dispatch(
      fetchPointConversions({
        pageNumber: conversionPageNumber,
        pageSize: conversionPageSize,
      }),
    );
  }, [
    dispatch,
    conversionPageNumber,
    conversionPageSize,
    createPointConversionSuccess,
    editPointConversionSuccess,
    deletePointConversionSuccess,
  ]);

  return (
    <>
      <Modal modal={!!toggleDeleteActivityPoint}>
        <ConfirmAction
          onClose={() => dispatch(onToggleDeleteActivityPoint(""))}
          action="delete"
          loading={deleteActivityPointLoading}
          onConfirmAction={onDeleteActivityPoint}
        />
      </Modal>

      <Modal modal={!!toggleEditActivityPoint}>
        <NewActivityPointForm onClose={onCloseEditActivity} context="edit" />
      </Modal>

      <Modal modal={toggleCreateActivityPoint}>
        <NewActivityPointForm onClose={onCreateNewActivity} context="new" />
      </Modal>

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
        />
      </Modal>

      <section className="bg-[#FFFFFFCC] rounded-2xl py-4 lg:py-5 px-3 lg:px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h4 className="text-light-black text-lg flex items-center gap-1">
            Activity Based Points <FaQuestion color="#4A148C" size={15} />
          </h4>

          <div className="flex justify-between items-center gap-6 xl:gap-8">
            <SeeAllBtn
              onClick={() => navigate("/upload-points/activity-based")}
              isDisabled={fetchActivityPointsLoading}
            />
            <MiniCreateButton
              text="create new"
              onClick={onCreateNewActivity}
              isDisabled={fetchActivityPointsLoading}
            />
          </div>
        </div>

        <div className="mt-5 lg:mt-6 overflow-x-auto min-h-[350px]">
          {fetchActivityPointsLoading ? (
            <FetchActivityPointLoading />
          ) : allActivityPoints?.result?.length > 0 ? (
            <>
              <div className="grid grid-cols-10 gap-5 font-montserrat font-semibold text-sm min-w-[800px]">
                <p className="col-span-3">Activity Name</p>
                <p className="col-span-2">Points</p>
                <p className="col-span-3">Description</p>
                <p className="col-span-2">Action</p>
              </div>
              <div className="mt-4">
                {allActivityPoints?.result?.map((act) => (
                  <ActivityPointCard act={act} key={act.id} />
                ))}
              </div>
            </>
          ) : (
            <div className="h-[300px] xl:h-[300px]">
              <Empty text="No Activity point has been created yet" />
            </div>
          )}
        </div>

        {allActivityPoints && (
          <Pagination
            currentPage={allActivityPoints.pageNumber}
            totalPages={allActivityPoints.totalPages}
            totalCount={allActivityPoints.totalCount}
            pageSize={activityPageSize}
            onPageChange={setActivityPageNumber}
          />
        )}
      </section>

      <section className="bg-[#FFFFFFCC] rounded-2xl py-4 lg:py-5 px-3 lg:px-4 mt-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h4 className="text-light-black text-lg flex items-center gap-1">
            Point-to-Naira Conversion <FaQuestion color="#4A148C" size={15} />
          </h4>
          <div className="flex justify-between items-center gap-6 xl:gap-8">
            <SeeAllBtn
              onClick={() => navigate("/upload-points/point-conversion")}
              isDisabled={fetchPointConversionsLoading}
            />
            <MiniCreateButton
              text="create new"
              onClick={onCreateNewConversion}
              isDisabled={fetchPointConversionsLoading}
            />
          </div>
        </div>

        <div className="mt-5 lg:mt-6 overflow-x-auto min-h-[350px]">
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
                {allPointConversions?.result.map((act) => (
                  <PointEquivalentCard pointEqui={act} key={act.id} />
                ))}
              </div>
            </>
          ) : (
            <div className="h-[300px] xl:h-[300px]">
              <Empty text="No Point Conversion has been created yet" />
            </div>
          )}
        </div>

        {allPointConversions && (
          <Pagination
            currentPage={allPointConversions.pageNumber}
            totalPages={allPointConversions.totalPages}
            totalCount={allPointConversions.totalCount}
            pageSize={conversionPageSize}
            onPageChange={setConversionPageNumber}
          />
        )}
      </section>
    </>
  );
};

export default PointUpload;
