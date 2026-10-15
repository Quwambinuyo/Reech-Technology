import { useRole } from "../../hooks/useRole";
import { useState, useEffect } from "react";
import type { ApiKeyProps } from "../../types";
import ImageCard from "../profile/partial/ImageCard";
import { MiniInfoCard } from "../profile/partial";
import ProfileInput, {
  AvatarDisplay,
  PlainInput,
} from "../profile/partial/ProfileInputs";
import { PiQuestionBold, PiShieldWarningBold } from "react-icons/pi";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import Modal from "../../layout/Modal";
import CreateApiKeyModal from "./partial/CreateApiKeyModal";
import RevokeApiKeyModal from "./partial/RevokeApiKeyModal";
import KeyDetailsModal from "./partial/KeyDetailsModal";
import ApiKeysTable from "./partial/ApiKeyTable";
import PhoneChangeModal, { toE164 } from "./partial/PhoneChangeModal";
import Button from "../../components/Button";
import RotateKeyModal from "./partial/RotateKeyModal";
import Spinner from "../../components/Spinner";
import { LuCirclePlus } from "react-icons/lu";
import {
  fetchApiKeys,
  createApiKeys,
  rotateApiKeys,
  revokeApiKeys,
} from "../../redux/profile/action";
import { onClearPhoneChange } from "../../redux/auth/authReducer";

type ActiveModal = "create" | "revoke" | "details" | "rotate" | null;

const getApiKeysArray = (allApiKeys: unknown): ApiKeyProps[] => {
  if (!allApiKeys || typeof allApiKeys !== "object") return [];

  const maybeResult = (allApiKeys as { result?: unknown }).result;
  if (Array.isArray(maybeResult)) return maybeResult as ApiKeyProps[];

  const maybeSingleKey = allApiKeys as Partial<ApiKeyProps>;
  if (maybeSingleKey.id && maybeSingleKey.maskedKey) {
    return [maybeSingleKey as ApiKeyProps];
  }

  return [];
};

const Profile = () => {
  const role = useRole();
  const dispatch = useAppDispatch();
  const [phoneModal, setPhoneModal] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [selectedKey, setSelectedKey] = useState<ApiKeyProps | null>(null);

  const { currentUser } = useAppSelector((state) => state.auth);

  const {
    allApiKeys,
    fetchApiKeysLoading,
    createApiKeyLoading,
    rotateApiKeyLoading,
    revokeApiKeyLoading,
  } = useAppSelector((state) => state.apiKey);

  const [form] = useState({
    fullName: `${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`,
    email: currentUser?.email || "",
  });

  const { fullName, email } = form;
  const displayPhone = toE164(currentUser?.phoneNumber);

  useEffect(() => {
    if (role === "BusinessAdmin") {
      dispatch(fetchApiKeys());
    }
  }, [dispatch, role]);

  const closeModal = () => {
    setActiveModal(null);
    setSelectedKey(null);
  };

  const closePhoneModal = () => {
    dispatch(onClearPhoneChange());
    setPhoneModal(false);
  };

  const handleCreateApiKey = async (name: string) => {
    const result = await dispatch(createApiKeys({ name }));
    if (createApiKeys.fulfilled.match(result)) {
      const newKey = result.payload as ApiKeyProps;
      await dispatch(fetchApiKeys());
      setSelectedKey(newKey);
      setActiveModal("details");
    }
  };

  const handleRotateApiKey = async () => {
    if (!selectedKey) return;
    const result = await dispatch(rotateApiKeys(selectedKey.id));
    if (rotateApiKeys.fulfilled.match(result)) {
      const rotatedKey = result.payload as ApiKeyProps;
      await dispatch(fetchApiKeys());
      setSelectedKey(rotatedKey);
      setActiveModal("details");
    }
  };

  const handleRevokeApiKey = async () => {
    if (!selectedKey) return;
    const result = await dispatch(revokeApiKeys(selectedKey.id));
    if (revokeApiKeys.fulfilled.match(result)) {
      window.location.reload();
      await dispatch(fetchApiKeys());
      closeModal();
    }
  };

  return (
    <div className="xl:mt-2">
      <ImageCard email={email} name={fullName} />
      <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 mt-6 border-b border-[#CBD5E1] pb-6 lg:pb-7">
        <MiniInfoCard />
        <div className="w-full lg:w-[70%] xl:w-3/4 border border-[#E2E8F0] bg-white rounded-2xl xl:rounded-3xl p-5 xl:p-6 flex flex-col gap-5 xl:gap-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 xl:gap-6">
            <ProfileInput
              type="text"
              placeholder="Enter full name"
              label="full name"
              id="fullName"
              value={fullName}
              onChange={() => {}}
            />
            <ProfileInput
              type="email"
              placeholder="Enter email address"
              label="email address"
              id="email"
              value={email}
              onChange={() => {}}
            />
            <div className="flex flex-col gap-2">
              <PlainInput
                label="phone number"
                id="phoneNumber"
                value={displayPhone || "Not added"}
              />
              <button
                type="button"
                onClick={() => setPhoneModal(true)}
                className="self-start text-sm font-medium text-[#4A148C]"
              >
                {displayPhone ? "Change phone number" : "Add phone number"}
              </button>
            </div>
            <PlainInput
              label="account type"
              id="accountType"
              value={role === "BusinessAdmin" ? "Merchant" : role}
            />
          </div>
          <AvatarDisplay label="change avatar" />
        </div>
      </div>

      {role === "BusinessAdmin" && (
        <div className="mt-6 flex flex-col lg:flex-row gap-6 xl:gap-8">
          <div className="w-full lg:w-[30%] xl:w-1/4">
            <h6 className="text-[#1E293B] font-semibold flex items-center gap-1">
              Account API
              <span>
                <PiQuestionBold color="#94A3B8" size={22} />
              </span>
            </h6>
          </div>

          <div className="w-full lg:w-[70%] xl:w-3/4 border border-[#E2E8F0] bg-white rounded-2xl xl:rounded-3xl p-5 xl:p-6 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h4 className="text-[#1E293B] font-bold text-base">
                  API Credentials
                </h4>
                <p className="text-[#94A3B8] text-sm mt-0.5">
                  Manage your production and sandbox keys
                </p>
              </div>
              <Button
                icon={<LuCirclePlus size={20} />}
                text="Create key"
                onClick={() => setActiveModal("create")}
                width="auto"
                fontSize="text-[13px]"
              />
            </div>
            <ApiKeysTable
              apiKeys={getApiKeysArray(allApiKeys)}
              loading={fetchApiKeysLoading}
              onDetail={(key) => {
                setSelectedKey(key);
                setActiveModal("details");
              }}
              onRotate={(key) => {
                setSelectedKey(key);
                setActiveModal("rotate");
              }}
              onRevoke={(key) => {
                setSelectedKey(key);
                setActiveModal("revoke");
              }}
            />
            <div className="flex items-start gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3.5">
              <PiShieldWarningBold
                size={18}
                className="text-primary-purple mt-0.5 shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-[#1E293B]">
                  Security Note
                </p>
                <p className="text-xs text-[#475569] mt-0.5">
                  Never share your secret keys in publicly accessible areas. Use
                  environment variables for safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal modal={phoneModal} onClose={closePhoneModal}>
        <>{phoneModal && <PhoneChangeModal onClose={closePhoneModal} />}</>
      </Modal>

      <Modal modal={activeModal === "create"} onClose={closeModal}>
        <CreateApiKeyModal
          onClose={closeModal}
          onGenerate={handleCreateApiKey}
        />
      </Modal>

      <Modal
        modal={activeModal === "revoke" && !!selectedKey}
        onClose={closeModal}
      >
        <RevokeApiKeyModal
          secretValue={selectedKey?.maskedKey ?? ""}
          onClose={closeModal}
          onRevoke={handleRevokeApiKey}
        />
      </Modal>

      <Modal
        modal={activeModal === "rotate" && !!selectedKey}
        onClose={closeModal}
      >
        <RotateKeyModal
          apiKey={selectedKey!}
          onClose={closeModal}
          onRotate={handleRotateApiKey}
        />
      </Modal>

      <Modal
        modal={activeModal === "details" && !!selectedKey}
        onClose={closeModal}
      >
        <KeyDetailsModal
          apiKey={selectedKey?.maskedKey ?? ""}
          plainKey={selectedKey?.plainKey}
          status={selectedKey?.status ?? "active"}
          createdDate={selectedKey?.createdAt ?? ""}
          onClose={closeModal}
          onRotate={handleRotateApiKey}
        />
      </Modal>

      <Modal
        modal={
          fetchApiKeysLoading ||
          createApiKeyLoading ||
          rotateApiKeyLoading ||
          revokeApiKeyLoading
        }
      >
        <Spinner size="40px" />
      </Modal>
    </div>
  );
};

export default Profile;