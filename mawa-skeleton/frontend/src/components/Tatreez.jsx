import '../Styles/Tatreez.css';


function Tatreez({ className = '' }) {
  return (
    <div className={`tatreez ${className}`} aria-hidden="true">
      <svg viewBox="0 0 240 16" preserveAspectRatio="none" className="tatreez__svg">
        <pattern id="tatreezPattern" width="24" height="16" patternUnits="userSpaceOnUse">
          <rect width="24" height="16" fill="transparent" />
          <path
            d="M12 1 L21 8 L12 15 L3 8 Z"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.4"
          />
          <circle cx="12" cy="8" r="1.6" fill="var(--color-accent)" />
        </pattern>
        <rect width="240" height="16" fill="url(#tatreezPattern)" />
      </svg>
    </div>
  );
}
export default Tatreez;