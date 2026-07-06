export const MiniLoader = ({ size = "20px", borderWidth = "4px" }) => {
  return (
    <>
      <span
        className="mini-loader"
        style={{ width: size, height: size, borderWidth }}
      />

      <style>{`
        .mini-loader {
          display: inline-block;
          border-radius: 50%;
          border-style: solid;
          border-color: #ede9f6;
          border-top-color: #543776;
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
