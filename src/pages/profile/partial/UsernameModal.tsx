import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Button from "../../../components/Button";
import { CustomTextInput } from "../../../components/CustomInput";
import {
  checkUsernameAvailable,
  updateUsername,
} from "../../../redux/auth/authActions";

interface UsernameModalProps {
  onClose: () => void;
}

type Status = "idle" | "checking" | "available" | "taken" | "invalid";

const USERNAME_RULE = /^[a-z][a-z0-9_.]{2,19}$/;
const RULE_TEXT =
  "3–20 characters, starting with a letter, then letters, numbers, _ or .";

const normalize = (value: string) =>
  value.trim().replace(/^@/, "").toLowerCase();

const UsernameModal = ({ onClose }: UsernameModalProps) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const currentUsername = currentUser?.username ?? currentUser?.userName ?? "";

  const [username, setUsername] = useState(currentUsername);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const normalized = normalize(username);

  useEffect(() => {
    if (!normalized || normalized === currentUsername.toLowerCase()) {
      setStatus("idle");
      setMessage("");
      return;
    }

    if (!USERNAME_RULE.test(normalized)) {
      setStatus("invalid");
      setMessage(RULE_TEXT);
      return;
    }

    setStatus("checking");
    setMessage("");

    let cancelled = false;

    const id = setTimeout(() => {
      dispatch(checkUsernameAvailable(normalized))
        .unwrap()
        .then((result) => {
          if (cancelled) return;
          if (result.available) {
            setStatus("available");
            setMessage("");
          } else {
            setStatus("taken");
            setMessage("That username is taken");
          }
        })
        .catch((error) => {
          if (cancelled) return;
          setStatus("invalid");
          setMessage(
            typeof error === "string" ? error : "Could not check username",
          );
        });
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [normalized, currentUsername, dispatch]);

  const handleSave = () => {
    if (saving || status !== "available") return;

    setSaving(true);
    dispatch(updateUsername(normalized))
      .unwrap()
      .then(() => onClose())
      .catch(() => {})
      .finally(() => setSaving(false));
  };

  const borderColor =
    status === "available"
      ? "#16A34A"
      : status === "taken" || status === "invalid"
        ? "#F87171"
        : undefined;

  return (
    <div className="bg-white rounded-2xl p-6 w-[90vw] max-w-[420px] flex flex-col gap-4">
      <h3 className="text-[18px] font-semibold text-[#1E293B]">
        {currentUsername ? "Change username" : "Add username"}
      </h3>

      <p className="text-sm text-[#475569]">
        Other customers will use this to send you credits.
      </p>

      <div className="flex flex-col gap-1.5">
        <CustomTextInput
          label="Username"
          id="new-username"
          type="text"
          placeholder="@ada_o"
          value={username}
          handleChange={(e) => setUsername(e.target.value)}
          borderColor={borderColor}
          otherInputProps={{
            autoComplete: "off",
            maxLength: 21,
          }}
        />

        {status === "checking" && (
          <p className="text-xs text-[#64748B]">Checking...</p>
        )}
        {status === "available" && (
          <p className="text-xs text-green-600">✓ Available</p>
        )}
        {(status === "taken" || status === "invalid") && (
          <p className="text-xs text-red-500">{message}</p>
        )}
        {(status === "idle" || status === "checking") && (
          <p className="text-xs text-[#94A3B8]">{RULE_TEXT}</p>
        )}
      </div>

      <Button
        text={saving ? "Saving..." : "Save username"}
        onClick={handleSave}
        isDisabled={saving || status !== "available"}
        isLoading={saving}
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