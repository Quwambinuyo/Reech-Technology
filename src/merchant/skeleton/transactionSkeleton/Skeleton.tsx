const Skeleton = () => {
  return (
    <div className="mt-7 animate-pulse">
      <section className="overflow-x-auto hide-scroll">
        <div className="grid grid-cols-4 gap-4 min-w-[1000px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 flex flex-col gap-3 min-w-[220px] xl:min-w-[230px]"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-200" />
              <div className="w-28 h-4 rounded bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className="w-24 h-8 rounded bg-gray-300" />
                <div className="w-12 h-4 rounded bg-gray-200" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-200" />
                <div className="w-36 h-3 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-white p-3 lg:p-4 mt-7 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="w-48 h-6 rounded bg-gray-300" />
          <div className="w-20 h-9 rounded-lg bg-gray-200" />
        </div>

        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="w-24 h-10 rounded-full bg-gray-200" />
          ))}
        </div>

        <div className="overflow-x-auto mt-4">
          <div
            className="grid gap-3 px-2 min-w-[1000px]"
            style={{ gridTemplateColumns: "repeat(19, 1fr)" }}
          >
            <div className="col-span-4 h-4 rounded bg-gray-300" />
            <div className="col-span-3 h-4 rounded bg-gray-300" />
            <div className="col-span-4 h-4 rounded bg-gray-300" />
            <div className="col-span-3 h-4 rounded bg-gray-300" />
            <div className="col-span-3 h-4 rounded bg-gray-300" />
            <div className="col-span-2 h-4 rounded bg-gray-300" />
          </div>

          <div className="px-2 py-5 lg:px-3 min-w-[1000px]">
            <div className="grid gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="grid gap-4 p-4 odd:bg-[#F5F6FF]"
                  style={{ gridTemplateColumns: "repeat(19, 1fr)" }}
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-300" />
                    <div className="flex flex-col gap-2">
                      <div className="w-32 h-4 rounded bg-gray-300" />
                      <div className="w-44 h-3 rounded bg-gray-200" />
                    </div>
                  </div>

                  <div className="col-span-3 flex items-center">
                    <div className="w-24 h-4 rounded bg-gray-300" />
                  </div>

                  <div className="col-span-4 flex justify-center items-center gap-2">
                    <div className="w-20 h-4 rounded bg-gray-300" />
                    <div className="w-16 h-4 rounded bg-gray-200" />
                  </div>

                  <div className="col-span-3 flex justify-center items-center">
                    <div className="w-20 h-4 rounded bg-gray-300" />
                  </div>

                  <div className="col-span-3 flex justify-center items-center">
                    <div className="w-20 h-8 rounded-full bg-gray-200" />
                  </div>

                  <div className="col-span-2 flex items-center">
                    <div className="w-full h-9 rounded-lg bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skeleton;
