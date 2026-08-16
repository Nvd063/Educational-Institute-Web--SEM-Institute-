/** Eight-point star motif taken from the school crest. */
export function StarMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <path
        d="M50 2 61 18 79 12 79 31 96 39 84 52 96 65 79 73 79 92 61 86 50 102 39 86 21 92 21 73 4 65 16 52 4 39 21 31 21 12 39 18Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
