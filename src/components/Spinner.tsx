type SpinnerProps = {
  size?: string;
  borderWidth?: string;
  modal?: boolean;
};

const Spinner = ({
  size = "20px",
  borderWidth = "3px",
  modal,
}: SpinnerProps) => {
  if (modal) {
    return (
      <>
        <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-[#07090a55]">
          <span
            className="loader"
            style={{ width: size, height: size, borderWidth }}
          />
        </div>

        <style>{`
          .loader {
            border-radius: 50%;
            border-style: solid;
            border-color: #ede9f6;
            border-top-color: #543776;
            border-right-color: #7c3aed;
            animation: spin 0.75s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <span
        className="loader"
        style={{ width: size, height: size, borderWidth }}
      />

      <style>{`
        .loader {
          border-radius: 50%;
          border-style: solid;
          border-color: #ede9f6;
          border-top-color: #543776;
          border-right-color: #7c3aed;
          animation: spin 0.75s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Spinner;
