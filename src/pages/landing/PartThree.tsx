import { PageWrapper } from ".";
import step1 from "../../assets/step1.png";
import step2 from "../../assets/step2.png";
import step3 from "../../assets/step3.png";

const PartThree = () => {
	return (
		<section className="bg-[#F8FAFC] pt-2 pb-8 sm:py-12 xl:pt-16">
			<PageWrapper>
				<h3 className="text-black-slate font-semibold text-3xl sm:text-4xl max-w-[450px] md:max-w-none mx-auto">
					How it works?
				</h3>
				<div className="mt-6 sm:mt-8 lg:mt-10 text-slate-black grid md:grid-cols-3 gap-6 max-w-[450px] md:max-w-none mx-auto">
					<div className="flex flex-col gap-3">
						<img src={step1} alt="step1" />
						<div className="flex flex-col gap-1">
							<p className="text-sm text-primary-purple">Step 1</p>
							<h5 className="font-semibold text-lg md:text-xl">
								Sign Up Easily
							</h5>
							<p className="text-[#64748B] text-[15px]">
								Merchant sign up and create points to activities to be completed
								on their users app
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-3">
						<img src={step2} alt="step2" />
						<div className="flex flex-col gap-1">
							<p className="text-sm text-primary-purple">Step 2</p>
							<h5 className="font-semibold text-lg md:text-xl">
								Start Gaining Points
							</h5>
							<p className="text-[#64748B] text-[15px]">
								Merchant users complete process on the app and{" "}
								<span className="font-semibold text-primary-purple">Reech</span>{" "}
								will be notified to reward points to the users.
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-3">
						<img src={step3} alt="step3" />
						<div className="flex flex-col gap-1">
							<p className="text-sm text-primary-purple">Step 3</p>
							<h5 className="font-semibold text-lg md:text-xl ">
								Sign Up Easily
							</h5>
							<p className="text-[#64748B] text-[15px]">
								Users can access point and use it as discount for subsequent
								purchase at same merchant or other{" "}
								<span className="font-semibold text-primary-purple">Reech</span>{" "}
								partnered merchants
							</p>
						</div>
					</div>
				</div>
			</PageWrapper>
		</section>
	);
};

export default PartThree;
