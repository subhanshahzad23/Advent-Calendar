/** Document-level gradients shared by the activation markers. */
export function SvgDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id="mkWarm" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ffe3a6" />
          <stop offset="55%" stopColor="#f2b84b" />
          <stop offset="100%" stopColor="#e88735" />
        </linearGradient>
        <linearGradient id="mkCold" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#3a5d86" />
          <stop offset="100%" stopColor="#1d3557" />
        </linearGradient>
      </defs>
    </svg>
  );
}
