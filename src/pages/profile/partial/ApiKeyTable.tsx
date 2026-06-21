import { useRef, useState } from "react";
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

interface Props {
  apiKeys: ApiKey[];
  onRotate: (key: ApiKey) => void;
  onRevoke: (key: ApiKey) => void;
}

const ApiKeysTable = ({ apiKeys, onRotate, onRevoke }: Props) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const columns = [
    { key: "keyName", header: "Key Name" },
    { key: "secretValue", header: "Secret Value" },
    { key: "created", header: "Created" },
    { key: "status", header: "Status" },
    { key: "actions", header: "" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#F1F5F9]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider pb-3 pr-4 ${
                  col.key === "actions" ? "text-right" : ""
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F1F5F9]">
          {apiKeys.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-8 text-center text-sm text-[#94A3B8]"
              >
                No API keys found.
              </td>
            </tr>
          ) : (
            apiKeys.map((key) => (
              <tr key={key.id}>
                <td className="py-4 pr-4 font-semibold text-[#1E293B] text-sm">
                  {key.keyName}
                </td>
                <td className="py-4 pr-4 text-[#475569] font-mono text-sm">
                  {key.secretValue}
                </td>
                <td className="py-4 pr-4 text-[#475569] text-sm whitespace-nowrap">
                  {key.created}
                </td>
                <td className="py-4 pr-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      key.status === "active"
                        ? "bg-green-50 text-green-600"
                        : "bg-[#F1F5F9] text-[#94A3B8]"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        key.status === "active"
                          ? "bg-green-500"
                          : "bg-[#94A3B8]"
                      }`}
                    />
                    {key.status}
                  </span>
                </td>
                <td className="py-4 text-right relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === key.id ? null : key.id)
                    }
                    className="text-[#94A3B8] hover:text-[#475569] transition-colors"
                  >
                    <HiOutlineDotsVertical size={18} />
                  </button>
                  {openMenuId === key.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 top-10 z-50 bg-white border border-[#E2E8F0] rounded-xl shadow-lg py-1 w-36"
                    >
                      <button
                        onClick={() => {
                          onRotate(key);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
                      >
                        Rotate key
                      </button>
                      <button
                        onClick={() => {
                          onRevoke(key);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Revoke key
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApiKeysTable;
