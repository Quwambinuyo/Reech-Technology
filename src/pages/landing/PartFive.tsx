import { LandingPageButton } from ".";
import sLogo from "../../assets/logo-s.png";

const PartFive = () => {
	return (
		<section className="px-5 sm:px-8 bg-primary-purple text-white py-8 sm:py-10 md:py-12 lg:py-14  xl:py-16 five">
			<div className="max-w-[400px] md:max-w-[450px] lg:max-w-[500px] gap-5 sm:gap-6 md:gap-7 xl:gap-8 mx-auto flex-col flex-center text-center">
				<img
					src={sLogo}
					alt="logo"
					className="w-[60px] sm:w-[70px] md:w-[80px] lg:w-[90px] xl:w-auto"
				/>
				<div className="flex flex-col gap-3">
					<h3 className="text-4xl md:text-5xl xl:text-[54px] font-semibold leading-[1.25] md:leading-[1.1]">
						Get Started with Reech Today
					</h3>
					<p className="text-[15px] md:text-base">
						Empower your customers with cashback, loyalty points, and exclusive
						discounts while boosting retention. Seamlessly integrate giftMe into
						your business and watch customer engagement soar!
					</p>
				</div>
				<LandingPageButton btnColor="white" btnText="Get started now" />
			</div>
		</section>
	);
};

export default PartFive;
