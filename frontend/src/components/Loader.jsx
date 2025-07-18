const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[100vh] w-full">
      <svg
        viewBox="0 0 100 150"
        width="80"
        height="120"
        className="hourglass-container"
        style={{
          display: "block",
          margin: "0 auto",
          transformOrigin: "center",
          animation: "flip 4s ease-in-out infinite",
        }}
      >
        <defs>
          <path id="upper-glass" d="M20 20L50 70L80 20Z" />
          <path id="lower-glass" d="M20 130L50 80L80 130Z" />

          <linearGradient id="sand-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        <g clipPath="url(#upper-clip)">
          <use
            href="#upper-glass"
            fill="none"
            stroke="#f472b6"
            strokeWidth="2"
          />
          <rect
            x="20"
            y="20"
            width="60"
            height="50"
            fill="url(#sand-grad)"
            style={{
              animation: "sandDrain 4s cubic-bezier(0.65, 0, 0.35, 1) infinite",
              transformOrigin: "top",
            }}
          />
        </g>

        <g clipPath="url(#lower-clip)">
          <use
            href="#lower-glass"
            fill="none"
            stroke="#f472b6"
            strokeWidth="2"
          />
          <rect
            x="20"
            y="80"
            width="60"
            height="50"
            fill="url(#sand-grad)"
            style={{
              animation: "sandFill 4s cubic-bezier(0.65, 0, 0.35, 1) infinite",
              transformOrigin: "bottom",
            }}
          />
        </g>

        <rect x="48" y="68" width="4" height="14" fill="#f472b6" rx="1" />

        <g style={{ animation: "sandFall 4s linear infinite" }}>
          {[...Array(5)].map((_, i) => (
            <circle
              key={i}
              cx={50}
              cy={72 + i * 2}
              r={0.8}
              fill="#ec4899"
              opacity={0.9 - i * 0.15}
            />
          ))}
        </g>

        <clipPath id="upper-clip">
          <use href="#upper-glass" />
        </clipPath>
        <clipPath id="lower-clip">
          <use href="#lower-glass" />
        </clipPath>
      </svg>

      <style>
        {`
          @keyframes flip {
            0% { transform: rotate(0deg); }
            90% { transform: rotate(0deg); }
            100% { transform: rotate(180deg); }
          }
          
          @keyframes sandDrain {
            0% { transform: scaleY(1); }
            90% { transform: scaleY(0.01); }
            100% { transform: scaleY(0.01); }
          }
          
          @keyframes sandFill {
            0%, 40% { transform: scaleY(0); }
            90%, 100% { transform: scaleY(1); }
          }
          
          @keyframes sandFall {
            0% { transform: translateY(0); opacity: 0; }
            20% { opacity: 1; }
            80% { transform: translateY(14px); opacity: 0; }
            100% { transform: translateY(14px); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
