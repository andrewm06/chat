export function LimeLogo() {
  return (
    <div className="flex items-center justify-center gap-3 text-lime-900">
      <svg
        aria-hidden
        viewBox="0 0 200 170"
        className="h-16 w-20 drop-shadow-lg"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8bff5e" />
            <stop offset="100%" stopColor="#5fcf3c" />
          </linearGradient>
        </defs>
        <g transform="translate(8 4)">
          <path
            d="M80 12c-33 0-56 20-56 52 0 32 23 52 56 52s56-20 56-52C136 32 113 12 80 12Z"
            fill="url(#bodyGradient)"
            stroke="#2f7c2a"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M80 18c-28 0-48 17-48 46s20 46 48 46 48-17 48-46S108 18 80 18Z"
            fill="#e8ffe0"
            opacity="0.18"
          />
          <g id="face">
            <ellipse cx="62" cy="70" rx="7" ry="9" fill="#2f7c2a" />
            <ellipse cx="98" cy="70" rx="7" ry="9" fill="#2f7c2a" />
            <circle cx="60" cy="67" r="3" fill="#fff" />
            <circle cx="96" cy="67" r="3" fill="#fff" />
            <path
              d="M62 95c6 5 20 5 26 0"
              fill="none"
              stroke="#2f7c2a"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M72 86c3 2 13 2 16 0"
              fill="none"
              stroke="#2f7c2a"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
          <g id="arms" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M38 76c-9-2-18 4-22 14"
              stroke="#2f7c2a"
              strokeWidth="7"
            />
            <path
              d="M122 76c12-6 20-1 24 8"
              stroke="#2f7c2a"
              strokeWidth="7"
            />
            <circle cx="18" cy="94" r="6" fill="#fff" stroke="#2f7c2a" strokeWidth="4" />
            <circle cx="146" cy="90" r="6" fill="#fff" stroke="#2f7c2a" strokeWidth="4" />
          </g>
          <g id="legs" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M70 116c-4 16-10 28-18 32"
              stroke="#2f7c2a"
              strokeWidth="8"
            />
            <path
              d="M92 116c3 16 9 28 16 32"
              stroke="#2f7c2a"
              strokeWidth="8"
            />
            <path
              d="M46 150c7 1 12-2 14-6"
              stroke="#2f7c2a"
              strokeWidth="6"
            />
            <path
              d="M118 150c-7 1-12-2-14-6"
              stroke="#2f7c2a"
              strokeWidth="6"
            />
            <path
              d="M40 150c6 10 20 10 22 2"
              stroke="#111827"
              strokeWidth="6"
            />
            <path
              d="M110 146c-2 8 13 12 22 2"
              stroke="#111827"
              strokeWidth="6"
            />
          </g>
          <path
            d="M74 32c6 6 18 16 22 30"
            fill="none"
            stroke="#2f7c2a"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M86 30c2 10 3 18 0 28"
            fill="none"
            stroke="#2f7c2a"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M64 36c-6 8-10 16-10 28"
            fill="none"
            stroke="#2f7c2a"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
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
