import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Button from "../../../components/Button";
import { CustomTextInput } from "../../../components/CustomInput";
import { updateUsername } from "../../../redux/auth/authActions";

interface UsernameModalProps {
  onClose: () => void;
}

const UsernameModal = ({ onClose }: UsernameModalProps) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState(currentUser?.userName || "");
  const [loading, setLoading] = useState(false);

  const trimmed = username.trim();

  const handleSave = () => {
    if (loading) return;

    if (!trimmed) {
      toast.error("Enter a username.");
      return;
    }

    if (trimmed === (currentUser?.userName || "")) {
      toast.error("This is already your username.");
      return;
    }

    setLoading(true);
    dispatch(updateUsername(trimmed))
      .unwrap()
      .then(() => onClose())
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-[90vw] max-w-[420px] flex flex-col gap-4">
      <h3 className="text-[18px] font-semibold text-[#1E293B]">
        {currentUser?.userName ? "Change username" : "Add username"}
      </h3>

      <p className="text-sm text-[#475569]">
        Enter the username you want to use on your account.
      </p>

      <CustomTextInput
        label="Username"
        id="new-username"
        type="text"
        placeholder="Enter your username"
        value={username}
        handleChange={(e) => setUsername(e.target.value)}
        otherInputProps={{
          autoComplete: "username",
        }}
      />

      <Button
        text={loading ? "Saving..." : "Save username"}
        onClick={handleSave}
        isDisabled={loading || !trimmed}
        isLoading={loading}
      />

      <button
        type="button"
        onClick={onClose}
        className="text-sm text-[#64748B] underline self-center"
      >
        Cancel
      </button>
    </div>
  );
};

export default UsernameModal;