import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  createOfflineActivity,
  updateOfflineActivity,
} from "../../redux/offline/action";
import type { OfflineActivity } from "../../redux/offline/reducer";
import {
  ModalShell,
  inputClass,
  outlineButton,
  primaryButton,
} from "./OfflineHelpers";

type ActivityFormModalProps = {
  businessId: string;
  activity: OfflineActivity | null;
  onClose: () => void;
  onSaved: () => void;
};

const ActivityFormModal = ({
  businessId,
  activity,
  onClose,
  onSaved,
}: ActivityFormModalProps) => {
  const dispatch = useAppDispatch();

  const { createActivityLoading, updateActivityLoading } = useAppSelector(
    (state) => state.offlinePoints,
  );

  const [name, setName] = useState(activity?.name ?? "");
  const [points, setPoints] = useState(
    activity ? String(activity.points) : "",
  );
  const [description, setDescription] = useState(activity?.description ?? "");

  const isSaving = createActivityLoading || updateActivityLoading;
  const isValid =
    name.trim() !== "" &&
    Number.isInteger(Number(points)) &&
    Number(points) > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid || isSaving) return;

    const body = {
      businessId,
      name: name.trim(),
      points: Number(points),
      description: description.trim() || undefined,
    };

    const result = activity
      ? await dispatch(updateOfflineActivity({ id: activity.id, ...body }))
      : await dispatch(createOfflineActivity(body));

    if (
      createOfflineActivity.fulfilled.match(result) ||
      updateOfflineActivity.fulfilled.match(result)
    ) {
      onSaved();
    }
  };

  return (
    <ModalShell title={activity ? "Edit activity" : "New activity"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-[#1E293B]">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Bought a carton"
            disabled={isSaving}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[#1E293B]">
          Points
          <input
            type="number"
            min={1}
            step={1}
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="50"
            disabled={isSaving}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[#1E293B]">
          Description (optional)
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Any 1 carton"
            disabled={isSaving}
            className={inputClass}
          />
        </label>

        <div className="flex justify-end gap-3 mt-1">
          <button
            type="button"
            disabled={isSaving}
            onClick={onClose}
            className={outlineButton}
          >
            Cancel
          </button>
          <button type="submit" disabled={!isValid || isSaving} className={primaryButton}>
            {isSaving && <FaSpinner className="animate-spin" />}
            Save
          </button>
        </div>
      </form>
    </ModalShell>
  );
};

export default ActivityFormModal;