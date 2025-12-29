export function LimeLogo() {
  return (
    <div className="flex items-center justify-center gap-3 text-lime-900">
      <svg
        aria-hidden
        viewBox="0 0 120 120"
        className="h-14 w-14 drop-shadow-lg"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="56" fill="#65d943" stroke="#2f7c2a" strokeWidth="6" />
        <path
          d="M60 8a52 52 0 1052 52A52 52 0 0060 8zm0 6a46 46 0 0146 46 2 2 0 01-2 2H16a2 2 0 01-2-2 46 46 0 0146-46z"
          fill="#e8ffe0"
        />
        <path
          d="M60 18c-11 9-18 22-18 36s7 27 18 36c11-9 18-22 18-36S71 27 60 18z"
          fill="#2f7c2a"
          opacity="0.2"
        />
        <circle cx="60" cy="60" r="10" fill="#e8ffe0" />
      </svg>
      <div>
        <p className="text-xl font-extrabold leading-tight text-lime-900">Lime</p>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-800">
          Window Cleaning
        </p>
      </div>
    </div>
  );
}
