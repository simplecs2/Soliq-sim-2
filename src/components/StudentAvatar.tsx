import React from 'react';

interface StudentAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StudentAvatar: React.FC<StudentAvatarProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  }[size];

  return (
    <div className={`relative ${sizeClasses} ${className}`}>
      {/* Outer container with glowing dark-navy gradient & gold/amber trim */}
      <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 border-2 border-amber-400/40 overflow-hidden shadow-lg shadow-blue-950/60 flex items-center justify-center p-1.5 relative group">
        {/* Subtle background ambient radial light */}
        <div className="absolute inset-0 bg-radial from-amber-400/10 via-transparent to-transparent pointer-events-none" />

        {/* Universal Faceless Student with Graduation Cap (Konfederatka) & Backpack */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-slate-100 drop-shadow-md"
        >
          <defs>
            {/* Background glow gradient */}
            <linearGradient id="avatarCapGrad" x1="20" y1="20" x2="80" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="0.6" stopColor="#D97706" />
              <stop offset="1" stopColor="#B45309" />
            </linearGradient>

            <linearGradient id="avatarBodyGrad" x1="25" y1="65" x2="75" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="0.5" stopColor="#2563EB" />
              <stop offset="1" stopColor="#1E3A8A" />
            </linearGradient>

            <linearGradient id="avatarSkinGrad" x1="40" y1="36" x2="60" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>

            <linearGradient id="backpackGrad" x1="20" y1="70" x2="35" y2="95" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
          </defs>

          {/* Student backpack straps (behind shoulders) */}
          <path
            d="M26 68 C22 72 20 82 22 92 C23 96 26 98 29 98"
            stroke="url(#backpackGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M74 68 C78 72 80 82 78 92 C77 96 74 98 71 98"
            stroke="url(#backpackGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Student Body / Jacket & Hoodie */}
          <path
            d="M28 98 C28 82 36 70 50 70 C64 70 72 82 72 98 Z"
            fill="url(#avatarBodyGrad)"
          />

          {/* White collar / T-shirt neck */}
          <path
            d="M44 70 C44 75 50 78 50 78 C50 78 56 75 56 70 Z"
            fill="#F8FAFC"
          />

          {/* Minimalist Neck */}
          <path
            d="M45 56 L45 68 C45 71 55 71 55 68 L55 56 Z"
            fill="url(#avatarSkinGrad)"
            opacity="0.9"
          />

          {/* Faceless Head (Sleek minimalist oval) */}
          <circle cx="50" cy="46" r="14" fill="url(#avatarSkinGrad)" />

          {/* Hair silhouette / shadow under cap */}
          <path
            d="M36 44 C36 38 42 34 50 34 C58 34 64 38 64 44 C64 46 61 48 58 46 C54 44 46 44 42 46 C39 48 36 46 36 44 Z"
            fill="#1E293B"
          />

          {/* Student Graduation Cap (Mortarboard / Konfederatka) Diamond */}
          <polygon
            points="50,16 84,28 50,40 16,28"
            fill="url(#avatarCapGrad)"
            stroke="#FDE68A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Cap Skull Cap (under diamond) */}
          <path
            d="M33 32 C33 32 38 42 50 42 C62 42 67 32 67 32 Z"
            fill="#B45309"
          />

          {/* Mortarboard Central Button */}
          <circle cx="50" cy="28" r="2.5" fill="#FEF3C7" />

          {/* Golden Tassel hanging down */}
          <path
            d="M50 28 Q68 28 72 38 L73 47"
            stroke="#FDE68A"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tassel fringe */}
          <polygon points="70,47 76,47 74,54 72,54" fill="#FDE68A" />

          {/* Small decorative stars / achievement sparkles */}
          <circle cx="82" cy="18" r="1.5" fill="#F59E0B" />
          <circle cx="18" cy="48" r="1.2" fill="#10B981" />
        </svg>
      </div>

      {/* Verified Status Badge (emerald checkmark with border) */}
      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold flex items-center justify-center shadow-md border-2 border-slate-950">
        ✓
      </div>
    </div>
  );
};
