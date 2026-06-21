import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";

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

type MenuAction = {
  label: string;
  action: "details" | "rotate" | "revoke";
  className?: string;
};

const MENU_ACTIONS: MenuAction[] = [
  { label: "View details", action: "details" },
  { label: "Rotate key", action: "rotate" },
  {
    label: "Revoke key",
    action: "revoke",
    className: "text-red-500 hover:bg-red-50",
  },
];

const GRID = "repeat(3, 1fr) 120px 5px";

const RowMenu = ({
  apiKey,
  onAction,
}: {
  apiKey: ApiKey;
  onAction: (action: MenuAction["action"], key: ApiKey) => void;
}) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open) return;
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect)
      setCoords({
        top: rect.bottom + window.scrollY + 6,
        left: rect.right + window.scrollX - 144,
      });

    const close = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !btnRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="flex justify-end">
      <button
        ref={btnRef}
        onClick={() => setOpen((p) => !p)}
        className="text-[#94A3B8] hover:text-[#475569] transition-colors"
      >
        <HiOutlineDotsVertical size={16} />
      </button>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            className="absolute z-[9999] bg-white border border-[#E2E8F0] rounded-xl shadow-lg py-1 w-36"
            style={coords}
          >
            {MENU_ACTIONS.map((m) => (
              <button
                key={m.action}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  onAction(m.action, apiKey);
                }}
                className={`w-full text-left px-4 py-2.5 text-[12px] transition-colors hover:bg-[#F8FAFC] ${m.className ?? "text-[#1E293B]"}`}
              >
                {m.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
};

interface Props {
  apiKeys: ApiKey[];
  onDetail: (key: ApiKey) => void;
  onRotate: (key: ApiKey) => void;
  onRevoke: (key: ApiKey) => void;
  maxHeight?: string;
}

const ApiKeysTable = ({
  apiKeys,
  onDetail,
  onRotate,
  onRevoke,
  maxHeight = "320px",
}: Props) => {
  const handleAction = (action: MenuAction["action"], key: ApiKey) => {
    if (action === "details") onDetail(key);
    if (action === "rotate") onRotate(key);
    if (action === "revoke") onRevoke(key);
  };

  return (
    <div className="w-full">
      <div
        className="grid px-8 py-4 text-[#4A454F] bg-[#F1F4FB]"
        style={{ gridTemplateColumns: GRID }}
      >
        {["Key Name", "Secret Value", "Created", "Status", ""].map((h) => (
          <span
            key={h}
            className="text-[11px] font-semibold uppercase tracking-wider"
          >
            {h}
          </span>
        ))}
      </div>

      <div
        className="divide-y divide-[#F1F5F9] overflow-y-auto hide-scroll"
        style={{ maxHeight }}
      >
        {apiKeys.length === 0 ? (
          <div className="py-8 text-center text-[12px] text-[#94A3B8]">
            No API keys found.
          </div>
        ) : (
          apiKeys.map((key) => (
            <div
              key={key.id}
              className="grid items-center px-8 py-5"
              style={{ gridTemplateColumns: GRID }}
            >
              <span className="text-[12px] text-[#1E293B]">{key.keyName}</span>
              <span className="text-[12px] text-[#475569]">
                {key.secretValue}
              </span>
              <span className="text-[12px] text-[#475569] whitespace-nowrap">
                {key.created}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold w-fit ${key.status === "active" ? "bg-green-50 text-green-600" : "bg-[#F1F5F9] text-[#94A3B8]"}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${key.status === "active" ? "bg-green-500" : "bg-[#94A3B8]"}`}
                />
                {key.status}
              </span>
              <RowMenu apiKey={key} onAction={handleAction} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApiKeysTable;
