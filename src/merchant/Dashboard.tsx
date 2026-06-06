import { DashboardCard } from "../pages/dashboard/partials";
import { pointBalance, pointSpent, rank, redeemedPoint } from "../assets";
import DashboardCharts from "../components/DashboardCharts";

const MerchantDashboard = () => {
	const completed = 26;
	const delayed = 35;
	const ongoing = 35;

	const doughnutValues = { completed, delayed, ongoing };

	return (
		<div className="mt-7">
			<section className="overflow-x-auto hide-scroll">
				<div className="grid grid-cols-4 gap-4 min-w-[1000px]">
					<DashboardCard
						icon={pointBalance}
						title="total customers"
						value="100"
						context="user"
						info={{ percentage: 12 }}
					/>
					<DashboardCard
						icon={redeemedPoint}
						title="total points issued"
						value="20,400"
						context="point"
						info={{ percentage: 12 }}
					/>
					<DashboardCard
						icon={rank}
						title="total redemptions"
						value="1,000"
						context="point"
						info={{ percentage: 12 }}
					/>
					<DashboardCard
						icon={pointSpent}
						title="total spent"
						value="10,300"
						// context=""
						info={{ percentage: 2 }}
					/>
				</div>
			</section>

			<DashboardCharts doughnutValues={doughnutValues} />
		</div>
	);
};

export default MerchantDashboard;
