import { BsCheck2Circle } from "react-icons/bs";
import { PageWrapper } from ".";
import revcard from "../../assets/p-card.png";
import hero1 from "../../assets/route.png";
import hero2 from "../../assets/diffuse.png";
import lock from "../../assets/lock.jpg";
import laptop from "../../assets/laptop.jpg";
import products from "../../assets/products.png";
import { LuShieldCheck } from "react-icons/lu";
import { FiStar } from "react-icons/fi";

const PartTwo = () => {
	return (
		<section className="bg-white py-10 sm:py-12 xl:py-16">
			<PageWrapper>
				<h3 className="text-[#020617] font-semibold text-[19px] sm:text-[24px] md:text-2xl lg:text-3xl xl:text-4xl md:max-w-[650px] lg:max-w-[750px] xl:max-w-[900px] leading-[1.4] md:leading-[1.3] lg:leading-[1.25] xl:leading-[1.2]">
					You can create happy customers by making them earn points for using
					your app and they can use the points in other merchants location for
					online and offline transaction
				</h3>

				<div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-12 xl:gap-16 mt-6 sm:mt-8 lg:mt-10 max-w-[600px] mx-auto md:max-w-none">
					<div className="bg-[#EBF1FF] rounded-2xl md:w-[63%] xl:w-[65%] flex flex-col items-center md:justify-around gap-8 pt-3 pb-8 sm:pb-10">
						<div>
							<img src={revcard} alt="rev-card" />
						</div>
						<div className="flex-center text-center gap-2 md:gap-3 flex-col px-5 max-w-[450px] xl:max-w-[580px] mx-auto">
							<h6 className="font-semibold text-[#020617] text-xl lg:text-[22px]">
								Scalability 🚀
							</h6>
							<p className="text-[#64748B] text-sm xl:text-base">
								As your business grows, Reech grows with you. Whether you're a
								small shop or a large enterprise, Reech adapts to your needs,
								handling an increasing number of users, transactions, and reward
								structures without any hassle.
							</p>
						</div>
					</div>
					<div className="md:w-[37%] xl:w-[35%] flex flex-col gap-6 mx-auto">
						<div className="border border-[#D7D7D7] rounded-lg overflow-hidden">
							<img src={hero1} alt="one" />
							<p className="flex items-center gap-3 font-semibold p-3">
								<BsCheck2Circle size={22} color="#320D5E" />{" "}
								<span className="text-[#020617]">Speed</span>
							</p>
						</div>
						<div className="border border-[#D7D7D7] rounded-lg overflow-hidden">
							<img src={hero2} alt="two" />
							<p className="flex items-center gap-3 font-semibold p-3">
								<BsCheck2Circle size={22} color="#320D5E" />{" "}
								<span className="text-[#020617]">Transparency</span>
							</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col md:flex-row gap-4 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 mt-8 lg:mt-10 max-w-[600px] md:max-w-none mx-auto">
					<div className="mx-auto md:w-[37%] xl:w-[35%] flex flex-col gap-6">
						<div>
							<img src={lock} alt="lock" />
							<p className="flex items-center gap-3 font-semibold p-3">
								<LuShieldCheck size={22} color="#320D5E" />{" "}
								<span className="text-[#020617]">Safe & Secure</span>
							</p>
						</div>
						<div>
							<img src={laptop} alt="laptop" />
							<p className="flex items-center gap-3 font-semibold p-3">
								<FiStar size={22} color="#320D5E" />{" "}
								<span className="text-[#020617]">Reech Experience</span>
							</p>
						</div>
					</div>

					<div className="bg-primary-purple rounded-2xl md:w-[67%] xl:w-[65%] flex flex-col md:items-center md:justify-around pt-4 pb-8 sm:pt-5 sm:pb-10 gap-2">
						<div>
							<img src={products} alt="products" />
						</div>
						<div className="flex-center text-center gap-2 md:gap-3 flex-col px-5 max-w-[450px] xl:max-w-[580px] mx-auto text-white">
							<h6 className="font-semibold text-xl lg:text-[22px]">
								Effortless Integration
							</h6>
							<p className="text-sm xl:text-base">
								Reech seamlessly integrates with your existing business
								systems—whether you're using an e-commerce store, POS system, or
								mobile app. No complex setups, just plug in and start rewarding
								your customers instantly.
							</p>
						</div>
					</div>
				</div>
			</PageWrapper>
		</section>
	);
};

export default PartTwo;
