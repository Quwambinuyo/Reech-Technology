import { LandingPageButton, PageWrapper } from ".";
import patreon from "../../assets/patreon-s.png";
import uber from "../../assets/uber-s.png";
import shopify from "../../assets/shopify-s.png";
import visa from "../../assets/visa-s.png";

const PartOne = () => {
	return (
		<section className="bg-[#EBECFE] mt-[60px] md:mt-[70px] lg:mt-[75px] xl:mt[80px] pt-0 sm:pt-5 md:pt-10 lg:pt-12 xl:pt-12">
			<PageWrapper>
				<div className="flex flex-col md:flex-row md:justify-between gap-12 lg:gap-16 xl:gap-20 max-w-[500px] md:max-w-none mx-auto">
					<div className="md:w-[52%] xl:w-1/2 md:max-w-[450px] lg:max-w-[500px] flex flex-col gap-3 xl:gap-4 pt-4 xl:pt-6 md:pb-12 xl:pb-16">
						<h3 className="text-[32px] sm:text-[40px] lg:text-[46px] xl:text-[54px] font-semibold leading-[1.25] md:leading-[1.15] xl:leading-[1.1]">
							Reward Your Customers, Grow Your Business Effortlessly.
						</h3>
						<div className="flex flex-col gap-4">
							<p className="text-[#64748B] text-base md:text-[15px] lg:text-base">
								Empower your customers with cashback, loyalty points, and
								exclusive discounts while boosting retention. Seamlessly
								integrate giftMe into your business and watch customer
								engagement soar!
							</p>
							<div className="flex gap-3 sm:gap-4 xl:gap-5">
								<LandingPageButton btnColor="purple" btnText="Get started" />
								<LandingPageButton btnColor="white" btnText="Learn more" />
							</div>
							<p>
								Trusted by{" "}
								<span className="text-primary-purple font-bold">500+</span>{" "}
								Companies
							</p>
						</div>
						<div className="flex items-center gap-5 sm:gap-6 md:gap-8 xl:gap-10 mt-1 sm:mt-2  md:mt-3">
							<img
								src={patreon}
								alt="patreon"
								className="w-[80px] h-[14px] md:h-[15px]"
							/>
							<img src={uber} alt="uber" className="w-[50px] h-[16px]" />
							<img src={shopify} alt="shopify" className="w-[70px]" />
							<img src={visa} alt="visa" className="w-[60px]" />
						</div>
					</div>

					<div className="sm:w-11/12 md:w-[46%] lg:w-[48%] xl:w-1/2 overflow-hidden">
						<div className="auth-bg h-[450px] md:h-full relative lg:w-11/12 xl:w-5/6 mx-auto border-[12px] border-b-0 rounded-t-[30px] border-[#0C0316] z-[2]">
							<div className="absolute inset-0 bg-[#4A148C66] z-0"></div>
						</div>
					</div>
				</div>
			</PageWrapper>
		</section>
	);
};

export default PartOne;
