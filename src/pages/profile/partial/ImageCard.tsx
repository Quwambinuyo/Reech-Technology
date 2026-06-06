import { profileImg } from "../../../assets";

const ImageCard = ({ email, name }: { email: string; name: string }) => {
	return (
		<div className="flex items-center gap-4">
			<img
				src={profileImg}
				alt="profile"
				className="rounded-full max-h-[110px] md:max-h-[128px] w-auto"
			/>
			<div className="font-jakarta flex flex-col gap-1">
				<h3 className="text-[#1E293B] text-xl lg:text-2xl font-extrabold">
					{name}
				</h3>
				<p className="text-[#475569] text-sm lg:text-[15px]">{email}</p>
			</div>
		</div>
	);
};

export default ImageCard;
