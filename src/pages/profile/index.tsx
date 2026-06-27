import { useRole } from "../../hooks/useRole";
import { useState } from "react";
import type { CountryProps } from "../../types";
import ImageCard from "../profile/partial/ImageCard";
import { MiniInfoCard } from "../profile/partial";
import ProfileInput, {
  AvatarDisplay,
  PlainInput,
} from "../profile/partial/ProfileInputs";
import { PiQuestionBold, PiShieldWarningBold } from "react-icons/pi";
import { useAppSelector } from "../../redux/hooks";
import Modal from "../../layout/Modal";
import CreateApiKeyModal from "./partial/CreateApiKeyModal";
import RevokeApiKeyModal from "./partial/RevokeApiKeyModal";
import KeyDetailsModal from "./partial/KeyDetailsModal";
import ApiKeysTable from "./partial/ApiKeyTable";
import Button from "../../components/Button";
import { initialApiKeys } from "../../mock";
import RotateKeyModal from "./partial/RotateKeyModal";
import { LuCirclePlus } from "react-icons/lu";

type ApiKey = {
  id: string;
  keyName: string;
  secretValue: string;
  fullKey: string;
  created: string;
  status: "active" | "inactive";
  createdBy: string;
  createdByInitials: string;
  lastUsed: string;
};

type ActiveModal = "create" | "revoke" | "details" | "rotate" | null;

const Profile = () => {
  const role = useRole();
  const [togglePhone, setTogglePhone] = useState(false);
  const [country, setCountry] = useState<CountryProps | null>(null);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);

  const { currentUser } = useAppSelector((state) => state.auth);

  const [form] = useState({
    fullName: `${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`,
    email: currentUser?.email || "",
  });

  const { fullName, email } = form;

  const onCountrySelect = (opt: any) => {
    setCountry(opt);
    setTogglePhone(false);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedKey(null);
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
            <ProfileInput
              type="tel"
              placeholder="Enter phone number"
              label="phone number"
              id="phoneNumber"
              togglePhoneInput={togglePhone}
              onTogglePhone={() => setTogglePhone(!togglePhone)}
              onCountrySelect={onCountrySelect}
              selectedCountry={country}
              value="09067793929"
              onChange={() => {}}
            />
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
              apiKeys={initialApiKeys as ApiKey[]}
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

      <Modal modal={activeModal === "create"} onClose={closeModal}>
        <CreateApiKeyModal onClose={closeModal} onGenerate={closeModal} />
      </Modal>

      <Modal
        modal={activeModal === "revoke" && !!selectedKey}
        onClose={closeModal}
      >
        <RevokeApiKeyModal
          secretValue={selectedKey?.secretValue ?? ""}
          onClose={closeModal}
          onRevoke={closeModal}
        />
      </Modal>

      <Modal
        modal={activeModal === "rotate" && !!selectedKey}
        onClose={closeModal}
      >
        <RotateKeyModal
          apiKey={selectedKey!}
          onClose={closeModal}
          onRotate={closeModal}
        />
      </Modal>

      <Modal
        modal={activeModal === "details" && !!selectedKey}
        onClose={closeModal}
      >
        <KeyDetailsModal
          apiKey={selectedKey?.fullKey ?? ""}
          status={selectedKey?.status ?? "active"}
          createdBy={selectedKey?.createdBy ?? ""}
          createdByInitials={selectedKey?.createdByInitials ?? ""}
          createdDate={selectedKey?.created ?? ""}
          lastUsed={selectedKey?.lastUsed ?? ""}
          onClose={closeModal}
          onRotate={closeModal}
        />
      </Modal>
    </div>
  );
};

export default Profile;
