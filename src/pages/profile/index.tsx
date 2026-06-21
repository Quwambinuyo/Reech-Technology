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

const initialApiKeys: ApiKey[] = [
  {
    id: "1",
    keyName: "Production Live",
    secretValue: "k_live••••••••••163f",
    fullKey: "k_live_997811281558197816 3f",
    created: "Oct 12, 2023",
    status: "active",
    createdBy: "James Dalton",
    createdByInitials: "JD",
    lastUsed: "2 minutes ago",
  },
  {
    id: "2",
    keyName: "E-commerce Web",
    secretValue: "k_live••••••••••992a",
    fullKey: "k_live_99781128155819788992a",
    created: "Jan 04, 2024",
    status: "active",
    createdBy: "James Dalton",
    createdByInitials: "JD",
    lastUsed: "1 hour ago",
  },
  {
    id: "3",
    keyName: "Sandbox Test",
    secretValue: "k_test••••••••••428x",
    fullKey: "k_test_9978112815581978428x",
    created: "Feb 15, 2024",
    status: "inactive",
    createdBy: "James Dalton",
    createdByInitials: "JD",
    lastUsed: "5 days ago",
  },
];

type ActiveModal = "create" | "revoke" | "details" | null;

const Profile = () => {
  const role = useRole();
  const [togglePhone, setTogglePhone] = useState(false);
  const [country, setCountry] = useState<CountryProps | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys);
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

  const handleGenerate = (name: string) => {
    const newKey: ApiKey = {
      id: String(Date.now()),
      keyName: name,
      secretValue: `k_live••••••••••${Math.random().toString(36).slice(-4)}`,
      fullKey: `k_live_${Math.random().toString(36).slice(2, 18)}`,
      created: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      status: "active",
      createdBy: fullName || "You",
      createdByInitials: (fullName || "YO").slice(0, 2).toUpperCase(),
      lastUsed: "Just now",
    };
    setApiKeys((prev) => [...prev, newKey]);
    setActiveModal(null);
  };

  const handleRevoke = () => {
    if (!selectedKey) return;
    setApiKeys((prev) => prev.filter((k) => k.id !== selectedKey.id));
    setActiveModal(null);
    setSelectedKey(null);
  };

  const handleRotate = () => {
    if (!selectedKey) return;
    setApiKeys((prev) =>
      prev.map((k) =>
        k.id === selectedKey.id
          ? {
              ...k,
              fullKey: `k_live_${Math.random().toString(36).slice(2, 18)}`,
              lastUsed: "Just now",
            }
          : k,
      ),
    );
    setActiveModal(null);
    setSelectedKey(null);
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
            />
            <ProfileInput
              type="email"
              placeholder="Enter email address"
              label="email address"
              id="email"
              value={email}
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
        <div className="mt-6 flex flex-col lg:flex-row gap-6 xl:gap-8 pb-6 lg:pb-7">
          <div className="w-full lg:w-[30%] xl:w-1/4">
            <h6 className="text-[#1E293B] font-semibold flex items-center gap-1">
              Account API
              <span>
                <PiQuestionBold color="#94A3B8" size={22} />
              </span>
            </h6>
          </div>

          <div className="w-full lg:w-[70%] xl:w-3/4 border border-[#E2E8F0] bg-white rounded-2xl xl:rounded-3xl p-5 xl:p-6 flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-[#1E293B] font-bold text-base">
                  API Credentials
                </h4>
                <p className="text-[#94A3B8] text-sm mt-0.5">
                  Manage your production and sandbox keys
                </p>
              </div>
              <Button
                text="+ Create key"
                onClick={() => setActiveModal("create")}
                width="auto"
              />
            </div>

            <ApiKeysTable
              apiKeys={apiKeys}
              onRotate={(key) => {
                setSelectedKey(key);
                setActiveModal("details");
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
        <CreateApiKeyModal onClose={closeModal} onGenerate={handleGenerate} />
      </Modal>

      <Modal
        modal={activeModal === "revoke" && !!selectedKey}
        onClose={closeModal}
      >
        <RevokeApiKeyModal
          secretValue={selectedKey?.secretValue ?? ""}
          onClose={closeModal}
          onRevoke={handleRevoke}
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
          onRotate={handleRotate}
        />
      </Modal>
    </div>
  );
};

export default Profile;
