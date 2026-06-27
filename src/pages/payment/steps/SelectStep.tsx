import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TbSend } from "react-icons/tb";
import Logo from "../../../assets/logo-s.png";
import StepBar from "./StepBar";
import { CustomTextInput } from "../../../components/CustomInput";
import type { Merchant, Step } from "./types";

interface Props {
  onClose: () => void;
  onContinue: (merchant: Merchant) => void;
}

const merchants: Merchant[] = [
  {
    id: "1",
    name: "Shoprite",
    category: "Supermarket & Retail",
    initials: "SR",
    color: "#E53935",
  },
  {
    id: "2",
    name: "MTN Nigeria",
    category: "Telecom & Data",
    initials: "MT",
    color: "#FDD835",
  },
  {
    id: "3",
    name: "KFC",
    category: "Fast Food & Dining",
    initials: "KF",
    color: "#E53935",
  },
  {
    id: "4",
    name: "Slot",
    category: "Electronics & Tech",
    initials: "SL",
    color: "#1E88E5",
  },
  {
    id: "5",
    name: "Jumia",
    category: "E-commerce Marketplace",
    initials: "JU",
    color: "#AB47BC",
  },
];

const SelectStep = ({ onClose, onContinue }: Props) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Merchant | null>(null);

  const filtered = merchants.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-2xl max-h-[600px] w-full max-w-[370px] sm:max-w-[500px]  md:max-w-[606px] mx-auto shadow-xl overflow-hidden border border-dashed border-[#D0D0F0]">
      <div className="px-5 pt-5 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-montserrat font-bold text-[#0D0D0D] text-lg">
              Send Points
            </h3>
            <p className="text-gray-400 text-[12px] font-ibmplex mt-0.5">
              Select a merchant to send your points to.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-black hover:text-gray-600 transition-colors"
          >
            <IoCloseCircleOutline />
          </button>
        </div>

        <StepBar current={1 as Step} />

        <div className="mb-4">
          <CustomTextInput
            id="merchant-search"
            label=""
            placeholder="Search by name or category..."
            value={search}
            handleChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 max-h-[318px] overflow-y-auto pr-0.5">
          {filtered.map((merchant) => {
            const isSelected = selected?.id === merchant.id;
            return (
              <button
                key={merchant.id}
                onClick={() => setSelected(merchant)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? "border-[#4A148C] bg-[#F7F3FF]"
                    : "border-[#EFEFFF] bg-white hover:bg-[#FAFAFF]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: merchant.color }}
                  >
                    {merchant.initials}
                  </div>
                  <div className="text-left">
                    <p className="text-[13px] font-montserrat font-semibold text-[#0D0D0D]">
                      {merchant.name}
                    </p>
                    <p className="text-[11px] font-ibmplex text-[#9E9EB8]">
                      {merchant.category}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                    isSelected
                      ? "border-[#7542BB] bg-[#7542BB]"
                      : "border-[#D0D0F0]"
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full " />}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => selected && onContinue(selected)}
          disabled={!selected}
          className="mt-5 w-full bg-[#5617A2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white font-montserrat font-semibold rounded-4xl py-4 flex items-center justify-center gap-2"
        >
          <TbSend size={18} />
          Continue
        </button>
      </div>

      <div className="flex justify-center items-center py-3 border-t border-gray-100">
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="w-[40px]" />
          <span className="font-poppins font-medium text-[#000000] -ml-1 text-sm">
            reech
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectStep;
