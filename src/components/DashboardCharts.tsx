import type { ChartOptions } from "chart.js";
import { ChartLabel, DoughnutChartLabel, RadialSeparators } from "./small";
import { Doughnut, Line } from "react-chartjs-2";

interface RewardPerformanceItem {
  periodStart: string;
  label: string;
  pointsEarned: number;
  pointsRedeemed: number;
}

interface DashboardChartsProps {
  doughnutValues: {
    completed: number;
    delayed: number;
    ongoing: number;
  };
  rewardPerformance: RewardPerformanceItem[];
}

const DashboardCharts = ({
  doughnutValues,
  rewardPerformance,
}: DashboardChartsProps) => {
  const labels = rewardPerformance.map((item) => item.label);
  const earnedData = rewardPerformance.map((item) => item.pointsEarned);
  const redeemedData = rewardPerformance.map(
    (item) => -Math.abs(item.pointsRedeemed),
  );

  const totalPoints = rewardPerformance.reduce(
    (sum, item) => sum + item.pointsEarned,
    0,
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Points Earned",
        data: earnedData,
        borderWidth: 2,
        borderColor: "#7987FF",
        tension: 0.35,
      },
      {
        label: "Points Redeemed",
        data: redeemedData,
        borderWidth: 2,
        borderColor: "#E697FF",
        tension: 0.35,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        position: "left",
        ticks: {
          stepSize: 20,
          font: { size: 11.5, family: "'Sora', sans-serif" },
          color: "black",
        },
        grid: {
          color: "#F1F1F1",
          tickLength: 10,
          tickColor: "white",
        },
      },

      x: {
        ticks: {
          color: "black",
          font: { size: 11.5, family: "'Sora', sans-serif" },
        },
        grid: {
          color: "#F5F5F5",
          tickLength: 10,
          tickColor: "white",
        },
      },
    },

    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
    },
  };

  const remaining =
    100 -
    (doughnutValues.completed +
      doughnutValues.delayed +
      doughnutValues.ongoing);

  const dataTwo = {
    labels: ["Completed", "Delayed", "Ongoing"],
    datasets: [
      {
        data: [
          doughnutValues.completed,
          doughnutValues.delayed,
          doughnutValues.ongoing,
          remaining,
        ],
        backgroundColor: ["#1A932E", "#E5AE21", "#E65F2B", "#00000014"],
        borderWidth: 0,
        cutout: "92%",
      },
    ],
  };

  const optionsTwo: ChartOptions<"doughnut"> = {
    responsive: true,
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    elements: {
      line: {
        borderJoinStyle: "round",
      },
    },
  };

  return (
    <section className="my-7 grid xl:grid-cols-5 gap-6">
      <div className="xl:col-span-3 bg-[#FFFFFFCC] border border-[#F0F1FE] rounded-xl p-3 sm:p-4 overflow-x-auto">
        <h4>Reward Performance</h4>

        <div className="border border-[#F1F1F1] bg-white px-2 py-3 sm:p-3 md:p-4 mt-4">
          <h3 className="mb-4">{totalPoints.toLocaleString()} Points</h3>
          <div className="h-[240px]">
            <Line data={data} options={options} />
          </div>

          <div className="flex gap-5 mt-5">
            <ChartLabel text="points earned" color="#7987FF" />
            <ChartLabel text="points redeemed" color="#E697FF" />
          </div>
        </div>
      </div>
      <div className="xl:col-span-2 bg-white p-3 sm:p-4 rounded-xl">
        <div className="flex-between">
          <h4 className="text-[#060606]">Overall Point Progress</h4>
          <button>All</button>
        </div>

        <div className="relative mx-auto">
          <div className="w-[260px] h-[260px] sm:w-[290px] sm:h-[290px] flex-center mx-auto point-doughnut">
            <Doughnut data={dataTwo} options={optionsTwo} />
          </div>
          <RadialSeparators
            count={50}
            style={{
              background: "#0606064D",
              width: "1px",
              height: "5%",
            }}
          />
          <div className="absolute w-full h-full top-0 flex-center flex-col">
            <h3 className="font-medium text-xl lg:text-2xl mt-10">
              {doughnutValues.completed}%
            </h3>
            <p className="text-sm text-[#9A9A9A]">Completed</p>
          </div>
        </div>
        <div className="flex-between mx-auto max-w-[350px]">
          <DoughnutChartLabel
            text="Total Points"
            value={
              doughnutValues.completed +
              doughnutValues.delayed +
              doughnutValues.ongoing
            }
            color="#060606"
          />
          <DoughnutChartLabel
            text="Completed"
            value={doughnutValues.completed}
            color="#1A932E"
          />
          <DoughnutChartLabel
            text="Delayed"
            value={doughnutValues.delayed}
            color="#DFA510"
          />
          <DoughnutChartLabel
            text="Ongoing"
            value={doughnutValues.ongoing}
            color="#E65F2B"
          />
        </div>
      </div>
    </section>
  );
};

export default DashboardCharts;
