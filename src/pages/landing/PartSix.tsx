import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { PageWrapper } from ".";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

const PartSix = () => {
	const [toggleFaq, setTogggleFaq] = useState(0);

	const onToggleClick = (id: number) =>
		setTogggleFaq((exp) => (exp === id ? 0 : id));

	return (
		<section className="py-10 sm:py-12 lg:py-16 xl:py-20 bg-[#FAFAFA]">
			<PageWrapper>
				<div className="flex flex-col md:flex-row gap-8 lg:gap-10 xl:gap-12 lg:mx-6 xl:mx-8 max-w-[500px] mx-auto md:max-w-none">
					<div className="max-w-[450px] md:max-w-none md:w-[48%] flex flex-col gap-4 sm:gap-5 md:gap-6 items-start">
						<h6 className="text-primary-purple font-inter font-semibold six-title rounded-3xl px-5 py-2 sm:text-[17px] xl:text-lg inline">
							Frequently Asked questions 🙋‍♀️
						</h6>

						<h2 className="font-extrabold text-[#2E3539] text-[27px] sm:text-[32px] md:text-[34px] lg:text-[38px] xl:text-[42px] leading-[1.2]">
							Got questions? We got answers!
						</h2>

						<p className="text-[#6C747D] sm:text-[17px] md:text-lg xl:text-[21px]">
							Feel free to reach out to us if you have more questions for us.
						</p>
						<button className="text-white bg-primary-purple text-[15px] px-6 py-3 rounded-xl six-button flex items-center gap-2 font-semibold">
							Contact Us <HiOutlineArrowLongRight color="#ABFF4F" size={28} />
						</button>
					</div>
					<div className="md:w-[52%] grid gap-4 md:gap-5">
						{faqs.map((faq) => (
							<FaqCard
								faq={faq}
								key={faq.id}
								onToggle={() => onToggleClick(faq.id)}
								isOpened={toggleFaq === faq.id}
							/>
						))}
					</div>
				</div>
			</PageWrapper>
		</section>
	);
};

export default PartSix;

const faqs = [
	{
		id: 1,
		header: "What is Reech",
		text: "Our product is called Reech – a powerful reward system that helps businesses incentivize customer engagement through cashback, loyalty points, and exclusive discounts.",
	},
	{
		id: 2,
		header: "How do I sign up for Reech",
		text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum error laborum dicta amet, itaque in quisquam saepe optio repudiandae hic?",
	},
	{
		id: 3,
		header: "Is Reech safe to use",
		text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum error laborum dicta amet, itaque in quisquam saepe optio repudiandae hic?",
	},
	{
		id: 4,
		header: "What payment does Reech support",
		text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum error laborum dicta amet, itaque in quisquam saepe optio repudiandae hic?",
	},
	{
		id: 5,
		header: "Can I pay bills using Reech",
		text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum error laborum dicta amet, itaque in quisquam saepe optio repudiandae hic?",
	},
];

type FaqCardProps = { id: number; header: string; text: string };
const FaqCard = ({
	faq,
	onToggle,
	isOpened,
}: {
	faq: FaqCardProps;
	isOpened: boolean;
	onToggle: () => void;
}) => {
	return (
		<div className="bg-white rounded-2xl p-4 xl:p-5 flex flex-col gap-3">
			<div
				className="flex-between gap-3 text-slate-black cursor-pointer"
				onClick={onToggle}
			>
				<h4 className="font-bold text-[15px] sm:text-base xl:text-[17px]">
					{faq.header}?
				</h4>
				<p className={isOpened ? "down" : "up"}>
					<IoMdArrowDropdown size={24} />
				</p>
			</div>
			{isOpened && (
				<p className="text-sm sm:text-[15px] xl:text-base text-[#64748B]">
					{faq.text}
				</p>
			)}
		</div>
	);
};
