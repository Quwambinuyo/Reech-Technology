const Skeleton = () => {
  return (
    <div className="mt-7 animate-pulse">
      <section className="overflow-x-auto hide-scroll">
        <div className="grid grid-cols-4 gap-4 min-w-[1000px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#FFFFFFCC] rounded-xl p-4 flex flex-col gap-3 min-w-[220px] xl:min-w-[230px]"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-200" />
              <div className="w-28 h-4 rounded bg-gray-200" />
              <div className="flex items-end gap-2">
                <div className="w-24 h-8 rounded bg-gray-300" />
                <div className="w-12 h-4 rounded bg-gray-200" />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-4 h-4 rounded-full bg-gray-200" />
                <div className="w-32 h-3 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="my-7 grid xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3 bg-[#FFFFFFCC] border border-[#F0F1FE] rounded-xl p-4">
          <div className="w-40 h-5 rounded bg-gray-300" />

          <div className="border border-[#F1F1F1] bg-white p-4 mt-4 rounded-lg">
            <div className="w-32 h-7 rounded bg-gray-300 mb-6" />

            <div className="relative h-[240px] w-full overflow-hidden rounded-lg bg-gray-100">
              <div className="absolute bottom-10 left-0 right-0 h-[2px] bg-gray-200" />
              <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-gray-200" />
              <div className="absolute top-0 bottom-0 left-[40%] w-[1px] bg-gray-200" />
              <div className="absolute top-0 bottom-0 left-[60%] w-[1px] bg-gray-200" />
              <div className="absolute top-0 bottom-0 left-[80%] w-[1px] bg-gray-200" />

              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 28 C10 22,20 20,30 25 S50 34,60 18 S80 8,100 15"
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="1.5"
                />
                <path
                  d="M0 20 C10 18,20 25,30 15 S50 8,60 28 S80 35,100 22"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <div className="flex gap-5 mt-5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <div className="w-24 h-3 rounded bg-gray-200" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <div className="w-28 h-3 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 bg-white rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div className="w-40 h-5 rounded bg-gray-300" />
            <div className="w-10 h-5 rounded bg-gray-200" />
          </div>

          <div className="flex justify-center items-center py-8">
            <div className="relative w-[290px] h-[290px]">
              <div className="absolute inset-0 rounded-full border-[18px] border-gray-200" />
              <div className="absolute inset-[48px] rounded-full bg-white" />

              <div className="absolute inset-0 flex flex-col justify-center items-center mt-8">
                <div className="w-20 h-8 rounded bg-gray-300 mb-3" />
                <div className="w-24 h-4 rounded bg-gray-200" />
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-3 mt-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 flex-1"
              >
                <div className="w-12 h-4 rounded bg-gray-300" />
                <div className="w-14 h-3 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skeleton;
