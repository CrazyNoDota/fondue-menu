export function ForkDivider({ className = "" }: { className?: string }) {
  // A slender fondue fork echoing the logo mark — long handle, braided grip, two tines.
  return (
    <svg
      viewBox="0 0 320 24"
      className={className}
      fill="none"
      aria-hidden="true"
      role="presentation"
    >
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        {/* handle */}
        <line x1="6" y1="12" x2="150" y2="12" />
        {/* braided grip */}
        <path
          d="M150 8c8 0 8 8 16 8s8-8 16-8 8 8 16 8 8-8 16-8"
          strokeWidth="1.2"
        />
        {/* neck */}
        <line x1="214" y1="12" x2="280" y2="12" />
        {/* two tines */}
        <path d="M280 12l28-7M280 12l28 7" strokeWidth="1.2" />
      </g>
      <circle cx="6" cy="12" r="2.4" fill="currentColor" />
    </svg>
  );
}
