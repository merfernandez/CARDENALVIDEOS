// Ícono de Instagram a color, para que se reconozca la red social
export const InstagramIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#FEDA75" />
        <stop offset="0.3" stopColor="#FA7E1E" />
        <stop offset="0.55" stopColor="#D62976" />
        <stop offset="0.8" stopColor="#962FBF" />
        <stop offset="1" stopColor="#4F5BD5" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="22" height="22" rx="6.5" fill="url(#ig-grad)" />
    <rect
      x="5.5"
      y="5.5"
      width="13"
      height="13"
      rx="4"
      fill="none"
      stroke="#fff"
      strokeWidth="1.8"
    />
    <circle
      cx="12"
      cy="12"
      r="3.2"
      fill="none"
      stroke="#fff"
      strokeWidth="1.8"
    />
    <circle cx="16.4" cy="7.6" r="1.1" fill="#fff" />
  </svg>
);
