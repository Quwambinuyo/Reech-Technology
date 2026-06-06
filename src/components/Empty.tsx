import { BsInfoCircleFill } from "react-icons/bs";

const Empty = ({ text }: { text: string }) => {
	return (
		<div className="flex-center h-full">
			<div className="flex-center flex-col gap-4">
				<p className="text-gray-300 text-[100px]">
					<BsInfoCircleFill />
				</p>

				<p className="text-gray-400">{text}</p>
			</div>
		</div>
	);
};

export default Empty;
