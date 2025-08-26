import person from "../../assets/person.jpg";

const PartFour = () => {
	return (
		<section className="py-4 sm:py-[28px] md:py-[38px] lg:py-10 xl:py-[65px] overflow-hidden">
			<div className="bg-[#DDDFFE] py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 -skew-y-5 xl:-skew-y-6">
				<div className="px-5 sm:px-8 md:px-0 max-w-[600px] md:max-w-[650px] lg:max-w-[720px] xl:max-w-[800px] mx-auto skew-y-5 xl:skew-y-6">
					{reviews.map((a) => (
						<ReviewCard review={a} key={a.id} />
					))}
				</div>
			</div>
		</section>
	);
};

export default PartFour;

type ReviewProps = {
	message: string | React.ReactNode;
	imgUrl: string;
	name: string;
	position: string;
	id: number;
};

const ReviewCard = ({ review }: { review: ReviewProps }) => {
	return (
		<div className="flex-center text-center flex-col gap-5 sm:gap-6 md:gap-7 xl:gap-8">
			<h3 className="text-[#160637] sm:text-[17px] md:text-lg lg:text-[19px] xl:text-xl leading-[1.6]">
				"{review.message}"
			</h3>
			<img
				src={review.imgUrl}
				alt={review.name}
				className="rounded-full w-[80px] sm:w-[85px] md:w-[90px] xl:w-[100px]"
			/>
			<div className="font-bold text-sm sm:text-base lg:text-lg">
				<h4>{review.name}</h4>
				<h4>{review.position}</h4>
			</div>
		</div>
	);
};

const reviews = [
	{
		id: 1,
		message: (
			<>
				What I love about <span className="font-semibold">Reech</span> is the
				easy way we can earn points and money by just using different platforms
			</>
		),
		name: "Mark James",
		position: "Developer / Teacher",
		imgUrl: person,
	},
];
