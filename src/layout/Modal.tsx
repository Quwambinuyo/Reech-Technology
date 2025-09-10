import { useEffect, type JSX } from "react";

type ModalProps = {
	children: JSX.Element;
	modal: boolean;
	onClose?: () => void;
};

const Modal = ({ modal, children }: ModalProps) => {
	useEffect(() => {
		if (modal) {
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [modal]);

	return (
		modal && (
			<div className="grid place-items-center fixed inset-0 bg-black/70 z-[1002]">
				{/* <div className="mt-16 md:mt-20 xl:mt-24 flex-center justify-center"> */}
				{children}
				{/* </div> */}
			</div>
		)
	);
};

export default Modal;
