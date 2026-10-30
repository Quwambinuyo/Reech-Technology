import { IoCloseCircleOutline, IoHourglassOutline } from "react-icons/io5";
import Logo from "../../../assets/logo-s.png";
import Button from "../../../components/Button";

interface Props {
  onClose: () => void;
  points: number;
  expiresAt: string;
  busy: boolean;
  onShow: () => void;
  onCancelToken: () => void;
}

const ActiveTokenStep = ({
  onClose,
  points,
  expiresAt,
  busy,
  onShow,
  onCancelToken,
}: Props) => {
  const validUntil = new Date(expiresAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-2xl w-11/12 max-w-[500px] md:max-w-[560px] mx-auto shadow-xl overflow-hidden relative">
      <div className="px-5 lg:px-6 pt-5 lg:pt-6 pb-5">
        <div className="pr-8">
          <h3 className="font-montserrat font-bold text-light-black text-lg">
            Active Token
          </h3>
          <p className="text-gray-500 text-[13px] font-ibmplex mt-0.5">
            Use it, or cancel it to create a new one.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute text-2xl lg:text-3xl top-4 lg:top-5 right-5 text-black hover:opacity-70 transition-opacity"
        >
          <IoCloseCircleOutline />
        </button>

        <div className="my-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex-center">
            <IoHourglassOutline size={20} />
          </div>
          <div>
            <p className="font-montserrat font-bold text-light-black text-base">
              {points.toLocaleString()} points
            </p>
            <p className="text-[13px] font-ibmplex text-gray-700 mt-0.5">
              You have an active token, valid until{" "}
              <span className="font-semibold">{validUntil}</span>.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex-1">
            <Button
              text={busy ? "Please wait..." : "Cancel token"}
              onClick={onCancelToken}
              isDisabled={busy}
              colorBg="white"
            />
          </div>
          <div className="flex-1">
            <Button text="Show code" onClick={onShow} isDisabled={busy} />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center py-3 border-t border-gray-100">
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="w-[40px]" />
          <span className="font-poppins font-medium text-light-black -ml-1 text-sm">
            reech
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActiveTokenStep;