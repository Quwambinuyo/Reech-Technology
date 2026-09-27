const Skeleton = () => {
  return (
    <div className="mt-7">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, #f1f2f6 25%, #ffffff 50%, #f1f2f6 75%);
          background-size: 800px 100%;
          animation: shimmer 1.6s infinite linear;
        }
      `}</style>

      <section className="overflow-x-auto hide-scroll">
        <div className="grid grid-cols-4 gap-4 min-w-[1000px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#FFFFFFCC] rounded-xl p-4 flex flex-col gap-3 min-w-[220px] xl:min-w-[230px]"
            >
              <div className="w-10 h-10 rounded-lg shimmer" />
              <div className="w-28 h-4 rounded shimmer" />
              <div className="flex items-end gap-2">
                <div className="w-24 h-8 rounded shimmer" />
                <div className="w-12 h-4 rounded shimmer" />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-4 h-4 rounded-full shimmer" />
                <div className="w-32 h-3 rounded shimmer" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="my-7 grid xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3 bg-[#FFFFFFCC] border border-[#F0F1FE] rounded-xl p-4">
          <div className="w-40 h-5 rounded shimmer" />

          <div className="border border-[#F1F1F1] bg-white p-4 mt-4 rounded-lg">
            <div className="w-32 h-7 rounded shimmer mb-6" />

            <div className="relative h-[240px] w-full overflow-hidden rounded-lg shimmer" />

            <div className="flex gap-5 mt-5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shimmer" />
                <div className="w-24 h-3 rounded shimmer" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shimmer" />
                <div className="w-28 h-3 rounded shimmer" />
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 bg-white rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div className="w-40 h-5 rounded shimmer" />
            <div className="w-10 h-5 rounded shimmer" />
          </div>

          <div className="flex justify-center items-center py-8">
            <div className="relative w-[290px] h-[290px]">
              <div className="absolute inset-0 rounded-full border-[18px] border-transparent shimmer" />
              <div className="absolute inset-[48px] rounded-full bg-white" />

              <div className="absolute inset-0 flex flex-col justify-center items-center mt-8">
                <div className="w-20 h-8 rounded shimmer mb-3" />
                <div className="w-24 h-4 rounded shimmer" />
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-3 mt-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 flex-1"
              >
                <div className="w-12 h-4 rounded shimmer" />
                <div className="w-14 h-3 rounded shimmer" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skeleton;