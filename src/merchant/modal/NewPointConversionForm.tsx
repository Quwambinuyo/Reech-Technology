import { useEffect, useState, useRef } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { CustomTextInput } from "../../components/CustomInput";
import { CustomSelectNoDropDown } from "../../components/CustomSelect";
import Button from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCurrencies } from "../../redux/currency/action";
import type { InputEvent } from "../../types";

type FormProps = {
  onClose: () => void;
  context: "new" | "edit";
  onSubmit: (points: number, amount: number, currencyId: string) => void;
  isLoading?: boolean;
  initialPoints?: number;
  initialAmount?: number;
  initialCurrencyCode?: string;
};

const NewPointConversionForm = ({
  onClose,
  context,
  onSubmit,
  isLoading,
  initialPoints,
  initialAmount,
  initialCurrencyCode,
}: FormProps) => {
  const dispatch = useAppDispatch();
  const { allCurrencies, fetchCurrenciesLoading } = useAppSelector(
    (state) => state.currency,
  );

  const [points, setPoints] = useState(
    context === "edit" ? String(initialPoints ?? "") : "",
  );
  const [amount, setAmount] = useState(
    context === "edit" ? String(initialAmount ?? "") : "",
  );
  const [currencyId, setCurrencyId] = useState("");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  useEffect(() => {
    if (!allCurrencies?.result?.length) return;

    if (context === "edit" && initialCurrencyCode) {
      const match = allCurrencies.result.find(
        (c) => c.code === initialCurrencyCode,
      );
      if (match) setCurrencyId(match.id);
    } else if (!currencyId) {
      setCurrencyId(allCurrencies.result[0].id);
    }
  }, [allCurrencies]);

  const selectedCurrency = allCurrencies?.result?.find(
    (c) => c.id === currencyId,
  );

  const handleSubmit = () => {
    onSubmit(Number(points), Number(amount), currencyId);
  };

  return (
    <div className="bg-white w-11/12 max-w-[500px] lg:max-w-[600px] rounded-xl p-5 lg:p-6 relative">
      <h3 className="text-[#0D0D0D] font-semibold lg:text-lg text-center">
        {context === "edit" ? "Edit" : "Create"} Point Conversion
      </h3>
      <button
        className="absolute text-2xl lg:text-3xl top-4 lg:top-5 right-5"
        onClick={onClose}
      >
        <IoCloseCircleOutline />
      </button>

      <div className="mt-8 lg:mt-10 grid gap-5 lg:gap-6 mb-8 lg:mb-10">
        <div className="relative" ref={dropdownRef}>
          <CustomSelectNoDropDown
            context="Currency"
            value={selectedCurrency ? ` ${selectedCurrency.name}` : ""}
            placeholder={
              fetchCurrenciesLoading
                ? "Loading currencies..."
                : "Select currency"
            }
            handleToggle={() => setIsCurrencyOpen((prev) => !prev)}
          />

          {isCurrencyOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-[#00000014] py-2 w-full z-50 max-h-[220px] overflow-y-auto">
              {allCurrencies?.result?.map((currency) => (
                <button
                  key={currency.id}
                  type="button"
                  onClick={() => {
                    setCurrencyId(currency.id);
                    setIsCurrencyOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#F5F6FF] transition-colors text-sm"
                >
                  {currency.code} - {currency.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <CustomTextInput
          id="points"
          label="Points Required"
          type="number"
          placeholder="Enter the amount of points required for this conversion"
          value={points}
          handleChange={(e: InputEvent) => setPoints(e.target.value)}
        />
        <CustomTextInput
          id="amount"
          label="Equivalent in ₦"
          type="number"
          placeholder="Enter the equivalence"
          value={amount}
          handleChange={(e: InputEvent) => setAmount(e.target.value)}
        />
      </div>
      <Button
        text="Submit"
        onClick={handleSubmit}
        isDisabled={isLoading || !currencyId}
      />
    </div>
  );
};

export default NewPointConversionForm;
