import React from "react";

/**
 * Procedural Vector Hand Illustration for Predefined Sign Shapes.
 * Draws distinct, high-contrast, scalable SVG hands showing exact handshapes,
 * directional motion arrows, touch targets, and finger positions for all 96+ signs
 * including the complete 26-letter manual alphabet (A-Z).
 */
export default function SignIllustrationSVG({ svgType, term, className = "w-40 h-40" }) {
  const t = (svgType || "").toLowerCase().trim();
  const title = (term || t || "SIGN").toUpperCase();

  // UPRIGHT THUMB (GOOD)
  if (t === "thumbs_up") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ecfdf5" stroke="#10b981" strokeWidth="4" />

        <rect x="70" y="95" width="60" height="55" rx="14" fill="#fcd34d" stroke="#d97706" strokeWidth="3.5" />
        <path d="M70,105 H125 M70,118 H125 M70,132 H120" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M72,105 C68,75 74,45 88,45 C100,45 102,75 100,95 Z" fill="#fcd34d" stroke="#d97706" strokeWidth="3.5" strokeLinejoin="round" />
        <ellipse cx="88" cy="55" rx="4" ry="7" fill="#fbbf24" />
        <path d="M125,50 L135,35 M140,55 L155,55 M135,70 L150,80" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">
          UPRIGHT THUMB (GOOD)
        </text>
      </svg>
    );
  }

  // DOWN THUMB (BAD)
  if (t === "thumbs_down") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fff1f2" stroke="#f43f5e" strokeWidth="4" />

        <rect x="70" y="55" width="60" height="55" rx="14" fill="#fcd34d" stroke="#d97706" strokeWidth="3.5" />
        <path d="M70,68 H125 M70,82 H125 M70,96 H120" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M72,100 C68,125 74,155 88,155 C100,155 102,125 100,105 Z" fill="#fcd34d" stroke="#d97706" strokeWidth="3.5" strokeLinejoin="round" />
        <ellipse cx="88" cy="145" rx="4" ry="7" fill="#fbbf24" />
        <path d="M125,125 L135,140 M140,115 L155,115 M135,100 L150,90" stroke="#e11d48" strokeWidth="3.5" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#be123c" fontSize="11" fontWeight="bold">
          DOWN THUMB (BAD)
        </text>
      </svg>
    );
  }

  // FIST NOD (YES)
  if (t === "fist_nod") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ecfdf5" stroke="#059669" strokeWidth="4" />

        <rect x="70" y="70" width="60" height="60" rx="15" fill="#fcd34d" stroke="#d97706" strokeWidth="3.5" />
        <path d="M70,85 H125 M70,100 H125 M70,115 H125" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="100" cy="95" rx="18" ry="10" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <path d="M145,70 C155,85 155,115 145,130" fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
        <polygon points="142,135 152,128 142,122" fill="#059669" />
        <path d="M55,70 C45,85 45,115 55,130" fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
        <polygon points="58,135 48,128 58,122" fill="#059669" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">
          FIST NOD (YES)
        </text>
      </svg>
    );
  }

  // THREE-FINGER SNAP (NO)
  if (t === "pinch_close") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fef2f2" stroke="#ef4444" strokeWidth="4" />

        <rect x="50" y="85" width="50" height="50" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M90,90 L140,75 L140,88 L95,100 Z" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M85,115 L135,115 L140,100 L90,105 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="3" />
        <path d="M145,65 L145,80" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="145,85 140,75 150,75" fill="#ef4444" />
        <path d="M145,130 L145,115" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="145,110 140,120 150,120" fill="#ef4444" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">
          THREE-FINGER SNAP (NO)
        </text>
      </svg>
    );
  }

  // CIRCULAR CHEST RUB (PLEASE)
  if (t === "palm_circle") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fef3c7" stroke="#f59e0b" strokeWidth="4" />

        <path d="M40,160 C40,120 70,110 100,110 C130,110 160,120 160,160" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
        <rect x="75" y="70" width="45" height="40" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="77" y="38" width="8" height="35" rx="4" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="87" y="34" width="8" height="40" rx="4" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="97" y="36" width="8" height="38" rx="4" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="107" y="42" width="7" height="32" rx="3.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M145,95 A35,35 0 1,1 85,65" fill="none" stroke="#d97706" strokeWidth="4" strokeDasharray="5,4" />
        <polygon points="85,58 85,72 73,65" fill="#d97706" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">
          CIRCULAR CHEST RUB (PLEASE)
        </text>
      </svg>
    );
  }

  // CHIN TO FORWARD (THANK YOU)
  if (t === "chin_forward") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#e0f2fe" stroke="#0284c7" strokeWidth="4" />

        <path d="M45,50 Q65,60 65,85 Q65,105 75,115 Q90,125 100,125" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
        <rect x="80" y="105" width="40" height="30" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M85,105 L85,75 M95,105 L95,70 M105,105 L105,73 M115,105 L115,80" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <path d="M125,100 C150,100 160,115 170,125" fill="none" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
        <polygon points="175,125 160,120 168,135" fill="#0284c7" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
          CHIN TO FORWARD (THANK YOU)
        </text>
      </svg>
    );
  }

  // OPEN PALM WAVE (HELLO)
  if (t === "open_wave") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ecfdf5" stroke="#10b981" strokeWidth="4" />

        <rect x="70" y="85" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="50" y="75" width="10" height="35" rx="5" transform="rotate(-35 55 90)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="68" y="40" width="10" height="50" rx="5" transform="rotate(-15 73 65)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="88" y="32" width="10" height="58" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="108" y="38" width="10" height="52" rx="5" transform="rotate(12 113 64)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="126" y="52" width="9" height="42" rx="4.5" transform="rotate(25 130 73)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M40,50 Q30,70 40,90 M160,50 Q170,70 160,90" fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">
          OPEN PALM WAVE (HELLO)
        </text>
      </svg>
    );
  }

  // FAREWELL WAVE (GOODBYE)
  if (t === "wave_goodbye") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fef3c7" stroke="#f59e0b" strokeWidth="4" />

        <g transform="rotate(15 100 100)">
          <rect x="70" y="85" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
          <rect x="68" y="40" width="10" height="50" rx="5" transform="rotate(-15 73 65)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
          <rect x="88" y="32" width="10" height="58" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
          <rect x="108" y="38" width="10" height="52" rx="5" transform="rotate(12 113 64)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
          <rect x="126" y="52" width="9" height="42" rx="4.5" transform="rotate(25 130 73)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        </g>
        <path d="M150,45 C165,60 165,80 150,95" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
        <path d="M165,55 C175,70 175,85 165,100" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">
          FAREWELL WAVE (GOODBYE)
        </text>
      </svg>
    );
  }

  // UPWARD CHEST SWEEP (HAPPY)
  if (t === "upward_sweep") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fdf4ff" stroke="#d946ef" strokeWidth="4" />

        <circle cx="100" cy="55" r="22" fill="#fde047" stroke="#ca8a04" strokeWidth="2.5" />
        <circle cx="93" cy="50" r="3" fill="#854d0e" />
        <circle cx="107" cy="50" r="3" fill="#854d0e" />
        <path d="M90,60 Q100,72 110,60" fill="none" stroke="#854d0e" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="55" y="100" width="35" height="30" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="110" y="100" width="35" height="30" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M50,135 Q40,105 55,85 M150,135 Q160,105 145,85" fill="none" stroke="#d946ef" strokeWidth="4" strokeLinecap="round" />
        <polygon points="55,80 47,90 60,90" fill="#d946ef" />
        <polygon points="145,80 140,90 153,90" fill="#d946ef" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fdf4ff" stroke="#d946ef" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#a21caf" fontSize="11" fontWeight="bold">
          UPWARD CHEST SWEEP (HAPPY)
        </text>
      </svg>
    );
  }

  // DOWNWARD DRAW (SAD)
  if (t === "face_downward") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#eff6ff" stroke="#3b82f6" strokeWidth="4" />

        <circle cx="100" cy="55" r="22" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="2.5" />
        <circle cx="93" cy="52" r="3" fill="#1e3a8a" />
        <circle cx="107" cy="52" r="3" fill="#1e3a8a" />
        <path d="M90,66 Q100,56 110,66" fill="none" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="112" cy="58" rx="2" ry="4" fill="#3b82f6" />
        <rect x="55" y="90" width="35" height="35" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="110" y="90" width="35" height="35" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M45,95 L45,135 M155,95 L155,135" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
        <polygon points="45,142 39,130 51,130" fill="#3b82f6" />
        <polygon points="155,142 149,130 161,130" fill="#3b82f6" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="bold">
          DOWNWARD DRAW (SAD)
        </text>
      </svg>
    );
  }

  // ARMS CROSSED HEART (LOVE)
  if (t === "arms_cross") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="4" />

        <path d="M100,45 C85,25 50,35 50,65 C50,90 100,120 100,120 C100,120 150,90 150,65 C150,35 115,25 100,45 Z" fill="#fda4af" stroke="#f43f5e" strokeWidth="3" />
        <line x1="50" y1="135" x2="145" y2="75" stroke="#fcd34d" strokeWidth="16" strokeLinecap="round" />
        <line x1="50" y1="135" x2="145" y2="75" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <line x1="150" y1="135" x2="55" y2="75" stroke="#fcd34d" strokeWidth="16" strokeLinecap="round" />
        <line x1="150" y1="135" x2="55" y2="75" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="95" r="14" fill="#f43f5e" />
        <path d="M96,95 L104,95 M100,91 L100,99" stroke="#fff" strokeWidth="2.5" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#be123c" fontSize="11" fontWeight="bold">
          ARMS CROSSED HEART (LOVE)
        </text>
      </svg>
    );
  }

  // INTERLOCKED HOOKS (FRIEND)
  if (t === "interlock_hooks") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ecfdf5" stroke="#10b981" strokeWidth="4" />

        <path d="M60,95 C60,65 95,65 95,95 C95,115 80,125 75,125" fill="none" stroke="#fcd34d" strokeWidth="14" strokeLinecap="round" />
        <path d="M60,95 C60,65 95,65 95,95 C95,115 80,125 75,125" fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <path d="M140,95 C140,125 105,125 105,95 C105,75 120,65 125,65" fill="none" stroke="#fde047" strokeWidth="14" strokeLinecap="round" />
        <path d="M140,95 C140,125 105,125 105,95 C105,75 120,65 125,65" fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="95" r="8" fill="#10b981" />
        <path d="M100,80 L100,110 M85,95 L115,95" stroke="#10b981" strokeWidth="2.5" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">
          INTERLOCKED HOOKS (FRIEND)
        </text>
      </svg>
    );
  }

  // CHEST FIST CIRCLE (SORRY)
  if (t === "fist_circle") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fff7ed" stroke="#ea580c" strokeWidth="4" />

        <path d="M45,155 C45,120 75,110 100,110 C125,110 155,120 155,155" fill="#ffedd5" stroke="#fdba74" strokeWidth="2" />
        <rect x="75" y="70" width="50" height="50" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3.5" />
        <ellipse cx="100" cy="85" rx="14" ry="7" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <path d="M140,95 A35,35 0 1,1 90,60" fill="none" stroke="#ea580c" strokeWidth="4" strokeDasharray="5,4" />
        <polygon points="90,53 90,67 78,60" fill="#ea580c" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#9a3412" fontSize="11" fontWeight="bold">
          CHEST FIST CIRCLE (SORRY)
        </text>
      </svg>
    );
  }

  // THREAD DRAW (LIKE)
  if (t === "pinch_pull") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f0fdf4" stroke="#22c55e" strokeWidth="4" />

        <rect x="50" y="80" width="45" height="40" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M85,90 Q120,70 145,85" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
        <circle cx="145" cy="85" r="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M135,115 L165,115" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
        <polygon points="172,115 160,110 160,120" fill="#22c55e" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
          THREAD DRAW (LIKE)
        </text>
      </svg>
    );
  }

  // DISCARD FLICK (DON'T LIKE)
  if (t === "pinch_drop") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fef2f2" stroke="#ef4444" strokeWidth="4" />

        <g transform="rotate(35 100 100)">
          <rect x="75" y="70" width="45" height="40" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
          <line x1="80" y1="110" x2="80" y2="135" stroke="#fcd34d" strokeWidth="7" strokeLinecap="round" />
          <line x1="95" y1="110" x2="95" y2="140" stroke="#fcd34d" strokeWidth="7" strokeLinecap="round" />
        </g>
        <path d="M120,80 Q150,110 145,145" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
        <polygon points="145,152 138,140 152,140" fill="#ef4444" />
        <path d="M155,130 L165,140 M130,135 L125,148" stroke="#ef4444" strokeWidth="2.5" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">
          DISCARD FLICK (DON'T LIKE)
        </text>
      </svg>
    );
  }

  // SUPPORTING LIFT (HELP)
  if (t === "palm_lift") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="4" />

        <rect x="45" y="130" width="110" height="22" rx="11" fill="#fde68a" stroke="#d97706" strokeWidth="3" />
        <rect x="75" y="85" width="50" height="45" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M78,85 C75,60 80,45 92,45 C102,45 104,65 102,85 Z" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M40,110 L40,80 M160,110 L160,80" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />
        <polygon points="40,73 34,85 46,85" fill="#8b5cf6" />
        <polygon points="160,73 154,85 166,85" fill="#8b5cf6" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#5b21b6" fontSize="11" fontWeight="bold">
          SUPPORTING LIFT (HELP)
        </text>
      </svg>
    );
  }

  // FIRM PALM CHOP (STOP)
  if (t === "palm_chop") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fee2e2" stroke="#ef4444" strokeWidth="4" />

        <rect x="40" y="125" width="85" height="22" rx="10" fill="#fde68a" stroke="#d97706" strokeWidth="3" />
        <path d="M100,45 L125,45 L125,115 L100,115 Z" fill="#fcd34d" stroke="#d97706" strokeWidth="3.5" rx="5" />
        <path d="M108,45 L108,110 M116,45 L116,110" stroke="#b45309" strokeWidth="2" />
        <path d="M85,120 L70,110 M140,120 L155,110 M112,125 L112,118" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">
          FIRM PALM CHOP (STOP)
        </text>
      </svg>
    );
  }

  // LIGHTBULB FLICK (UNDERSTAND)
  if (t === "forehead_flick") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fef9c3" stroke="#ca8a04" strokeWidth="4" />

        <path d="M60,140 Q55,70 95,55 Q135,55 135,100" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
        <rect x="95" y="85" width="45" height="40" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="100" y="45" width="12" height="45" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <circle cx="106" cy="35" r="12" fill="#facc15" stroke="#eab308" strokeWidth="2.5" />
        <path d="M106,15 L106,20 M124,25 L120,29 M88,25 L92,29" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="bold">
          LIGHTBULB FLICK (UNDERSTAND)
        </text>
      </svg>
    );
  }

  // OPEN PALMS (WHAT?)
  if (t === "palms_shrug") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="4" />

        <text x="100" y="70" textAnchor="middle" fill="#8b5cf6" fontSize="34" fontWeight="bold">?</text>
        <rect x="40" y="95" width="45" height="30" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="115" y="95" width="45" height="30" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M35,95 Q25,85 30,75 M165,95 Q175,85 170,75" fill="none" stroke="#8b5cf6" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="30,70 24,78 35,80" fill="#8b5cf6" />
        <polygon points="170,70 165,80 176,78" fill="#8b5cf6" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#5b21b6" fontSize="11" fontWeight="bold">
          OPEN PALMS (WHAT?)
        </text>
      </svg>
    );
  }

  // Y-SHAPE TEMPLE PULL (WHY?)
  if (t === "forehead_y_pull") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="4" />

        <circle cx="65" cy="65" r="6" fill="#c4b5fd" />
        <rect x="85" y="85" width="45" height="40" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="65" y="75" width="25" height="10" rx="5" transform="rotate(-30 75 80)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="125" y="75" width="25" height="10" rx="5" transform="rotate(30 135 80)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <ellipse cx="107" cy="95" rx="12" ry="6" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <path d="M107,130 L107,155" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
        <polygon points="107,162 101,150 113,150" fill="#7c3aed" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#4c1d95" fontSize="11" fontWeight="bold">
          Y-SHAPE TEMPLE PULL (WHY?)
        </text>
      </svg>
    );
  }

  // WAGGING INDEX (WHERE?)
  if (t === "index_wag") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#e0f2fe" stroke="#0284c7" strokeWidth="4" />

        <rect x="75" y="90" width="50" height="50" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="80" y="40" width="14" height="55" rx="7" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M60,55 Q85,45 110,55 M110,55 Q85,65 60,55" fill="none" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
        <polygon points="55,55 65,50 65,60" fill="#0284c7" />
        <polygon points="115,55 105,50 105,60" fill="#0284c7" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
          WAGGING INDEX (WHERE?)
        </text>
      </svg>
    );
  }

  // CIRCLING CHIN (WHO?)
  if (t === "chin_circle") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ecfeff" stroke="#0891b2" strokeWidth="4" />

        <path d="M60,65 Q80,75 80,95 Q80,115 100,120" fill="none" stroke="#a5f3fc" strokeWidth="4" strokeLinecap="round" />
        <rect x="100" y="85" width="45" height="35" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="80" y="95" width="30" height="12" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M105,65 A25,25 0 1,1 70,85" fill="none" stroke="#0891b2" strokeWidth="3.5" strokeDasharray="4,3" />
        <polygon points="70,80 70,92 60,85" fill="#0891b2" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#155e75" fontSize="11" fontWeight="bold">
          CIRCLING CHIN (WHO?)
        </text>
      </svg>
    );
  }

  // ROLLING KNUCKLES (HOW?)
  if (t === "rolling_knuckles") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fff7ed" stroke="#ea580c" strokeWidth="4" />

        <rect x="50" y="80" width="40" height="40" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="110" y="80" width="40" height="40" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M45,75 A18,18 0 1,1 40,105" fill="none" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
        <polygon points="40,112 34,102 46,102" fill="#ea580c" />
        <path d="M155,75 A18,18 0 1,0 160,105" fill="none" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
        <polygon points="160,112 154,102 166,102" fill="#ea580c" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#9a3412" fontSize="11" fontWeight="bold">
          ROLLING KNUCKLES (HOW?)
        </text>
      </svg>
    );
  }

  // ARCHING JUMP (AGAIN)
  if (t === "curved_arc") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f0fdf4" stroke="#16a34a" strokeWidth="4" />

        <rect x="50" y="125" width="100" height="20" rx="10" fill="#fde68a" stroke="#d97706" strokeWidth="3" />
        <rect x="115" y="55" width="35" height="35" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M130,70 Q100,35 85,120" fill="none" stroke="#16a34a" strokeWidth="4.5" strokeDasharray="5,4" />
        <polygon points="85,125 80,112 92,115" fill="#16a34a" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
          ARCHING JUMP (AGAIN)
        </text>
      </svg>
    );
  }

  // ARM SLOW GLIDE (SLOW)
  if (t === "palm_glide") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f1f5f9" stroke="#475569" strokeWidth="4" />

        <rect x="35" y="115" width="130" height="24" rx="12" fill="#fde68a" stroke="#d97706" strokeWidth="3" />
        <rect x="60" y="85" width="45" height="32" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M65,70 L125,70" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        <polygon points="132,70 120,64 120,76" fill="#475569" />
        <path d="M75,60 L75,65 M95,60 L95,65 M115,60 L115,65" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">
          ARM SLOW GLIDE (SLOW)
        </text>
      </svg>
    );
  }

  // WIGGLING FINGERS (WAIT)
  if (t === "wiggle_fingers") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fefce8" stroke="#ca8a04" strokeWidth="4" />

        <rect x="50" y="90" width="40" height="40" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="110" y="90" width="40" height="40" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M55,85 Q60,70 55,55 M75,85 Q80,70 75,55 M115,85 Q120,70 115,55 M135,85 Q140,70 135,55" fill="none" stroke="#ca8a04" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="55" cy="50" r="3" fill="#eab308" />
        <circle cx="75" cy="50" r="3" fill="#eab308" />
        <circle cx="115" cy="50" r="3" fill="#eab308" />
        <circle cx="135" cy="50" r="3" fill="#eab308" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="bold">
          WIGGLING FINGERS (WAIT)
        </text>
      </svg>
    );
  }

  // PALMS DOWN FLICK (FINISHED)
  if (t === "flick_out") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ecfdf5" stroke="#059669" strokeWidth="4" />

        <g transform="rotate(-20 70 95)">
          <rect x="50" y="75" width="40" height="40" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        </g>
        <g transform="rotate(20 130 95)">
          <rect x="110" y="75" width="40" height="40" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        </g>
        <path d="M40,110 Q50,140 70,145 M160,110 Q150,140 130,145" fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
        <polygon points="72,148 60,140 68,135" fill="#059669" />
        <polygon points="128,148 140,140 132,135" fill="#059669" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">
          PALMS DOWN FLICK (FINISHED)
        </text>
      </svg>
    );
  }

  // V-HAND FROM EYES (LOOK)
  if (t === "v_from_eyes") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="4" />

        <path d="M40,75 Q70,50 100,75 Q70,100 40,75 Z" fill="#fff" stroke="#4f46e5" strokeWidth="3" />
        <circle cx="70" cy="75" r="10" fill="#6366f1" />
        <circle cx="72" cy="73" r="3" fill="#fff" />
        <rect x="105" y="85" width="45" height="35" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="145" y="80" width="30" height="9" rx="4.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="145" y="95" width="30" height="9" rx="4.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M100,75 L160,75" stroke="#4f46e5" strokeWidth="3" strokeDasharray="4,3" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#3730a3" fontSize="11" fontWeight="bold">
          V-HAND FROM EYES (LOOK)
        </text>
      </svg>
    );
  }

  // CUPPED HAND AT EAR (LISTEN)
  if (t === "cup_ear") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f0fdf4" stroke="#10b981" strokeWidth="4" />

        <path d="M75,55 C60,55 50,75 50,95 C50,115 65,130 80,125 C90,120 90,105 80,105 C70,105 65,95 65,85 C65,75 75,70 85,75" fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
        <path d="M115,55 C90,55 85,75 85,95 C85,115 90,135 115,135" fill="none" stroke="#fcd34d" strokeWidth="16" strokeLinecap="round" />
        <path d="M115,55 C90,55 85,75 85,95 C85,115 90,135 115,135" fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <path d="M35,75 Q45,95 35,115 M23,65 Q37,95 23,125" fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">
          CUPPED HAND AT EAR (LISTEN)
        </text>
      </svg>
    );
  }

  // PALM TO FOREHEAD (LEARN)
  if (t === "palm_to_forehead") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#eff6ff" stroke="#2563eb" strokeWidth="4" />

        <rect x="35" y="125" width="65" height="18" rx="8" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
        <path d="M135,120 Q145,75 125,50" fill="none" stroke="#93c5fd" strokeWidth="4" strokeLinecap="round" />
        <rect x="105" y="60" width="35" height="35" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M65,115 Q75,65 110,65" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" strokeDasharray="5,4" />
        <polygon points="115,65 105,58 105,72" fill="#2563eb" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="bold">
          PALM TO FOREHEAD (LEARN)
        </text>
      </svg>
    );
  }

  // FLAT-O TAP AT LIPS (EAT)
  if (t === "mouth_tap") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fef3c7" stroke="#d97706" strokeWidth="4" />

        <path d="M45,75 Q65,65 75,75 Q85,85 75,95 Q65,105 45,95" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="3" />
        <line x1="50" y1="85" x2="72" y2="85" stroke="#e11d48" strokeWidth="2" />
        <ellipse cx="120" cy="85" rx="22" ry="16" fill="#fcd34d" stroke="#d97706" strokeWidth="3.5" />
        <path d="M100,85 L125,75 M100,85 L125,85 M100,85 L125,95" stroke="#b45309" strokeWidth="2.5" />
        <path d="M92,72 Q82,85 92,98 M85,77 Q78,85 85,93" fill="none" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">
          FLAT-O TAP AT LIPS (EAT)
        </text>
      </svg>
    );
  }

  // TILT CUP TO MOUTH (DRINK)
  if (t === "cup_tilt") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#e0f2fe" stroke="#0284c7" strokeWidth="4" />

        <g transform="rotate(-30 100 100)">
          <rect x="80" y="55" width="40" height="55" rx="6" fill="#bae6fd" stroke="#0284c7" strokeWidth="3" />
          <path d="M85,75 L115,75 L115,105 L85,105 Z" fill="#38bdf8" />
          <path d="M125,65 C140,65 140,105 125,105" fill="none" stroke="#fcd34d" strokeWidth="12" strokeLinecap="round" />
          <path d="M125,65 C140,65 140,105 125,105" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <path d="M140,120 Q160,95 140,75" fill="none" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
        <polygon points="140,70 148,82 136,80" fill="#0284c7" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
          TILT CUP TO MOUTH (DRINK)
        </text>
      </svg>
    );
  }

  // W-HAND TAP AT CHIN (WATER)
  if (t === "w_chin") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#e0f2fe" stroke="#0284c7" strokeWidth="4" />

        <rect x="75" y="105" width="50" height="40" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="77" y="45" width="9" height="60" rx="4.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="91" y="40" width="9" height="65" rx="4.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="105" y="45" width="9" height="60" rx="4.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <ellipse cx="118" cy="115" rx="8" ry="12" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <path d="M45,70 C45,60 55,45 55,45 C55,45 65,60 65,70 A10,10 0 1,1 45,70 Z" fill="#38bdf8" />
        <path d="M150,75 C150,67 158,55 158,55 C158,55 166,67 166,75 A8,8 0 1,1 150,75 Z" fill="#38bdf8" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
          W-HAND TAP AT CHIN (WATER)
        </text>
      </svg>
    );
  }

  // DRAW DOWN FACE (SLEEP)
  if (t === "face_close") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ede9fe" stroke="#6366f1" strokeWidth="4" />

        <circle cx="100" cy="70" r="32" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2.5" />
        <path d="M82,68 Q90,75 98,68 M102,68 Q110,75 118,68" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
        <path d="M92,85 Q100,90 108,85" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
        <rect x="65" y="105" width="70" height="35" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M55,65 L55,120 M145,65 L145,120" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="55,126 49,115 61,115" fill="#6366f1" />
        <polygon points="145,126 139,115 151,115" fill="#6366f1" />
        <text x="145" y="45" fill="#818cf8" fontSize="16" fontWeight="bold">Z</text>
        <text x="157" y="35" fill="#a5b4fc" fontSize="13" fontWeight="bold">z</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#ede9fe" stroke="#6366f1" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#4338ca" fontSize="11" fontWeight="bold">
          DRAW DOWN FACE (SLEEP)
        </text>
      </svg>
    );
  }

  // FORWARD THRUST (GO)
  if (t === "index_forward") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ecfdf5" stroke="#059669" strokeWidth="4" />

        <rect x="50" y="85" width="55" height="40" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="95" y="90" width="50" height="15" rx="7.5" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M140,80 L175,80 M150,98 L185,98 M140,115 L175,115" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="190,98 178,92 178,104" fill="#059669" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">
          FORWARD THRUST (GO)
        </text>
      </svg>
    );
  }

  // BECKON INWARD (COME)
  if (t === "index_inward") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#e0f2fe" stroke="#0284c7" strokeWidth="4" />

        <rect x="110" y="85" width="45" height="45" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M115,95 C85,95 70,110 85,125" fill="none" stroke="#fcd34d" strokeWidth="12" strokeLinecap="round" />
        <path d="M115,95 C85,95 70,110 85,125" fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <path d="M50,95 Q40,115 65,125" fill="none" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
        <polygon points="70,126 58,128 62,118" fill="#0284c7" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
          BECKON INWARD (COME)
        </text>
      </svg>
    );
  }

  // V-EYES SCAN PAGE (READ)
  if (t === "v_scan") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f8fafc" stroke="#475569" strokeWidth="4" />

        <rect x="40" y="110" width="120" height="26" rx="8" fill="#e2e8f0" stroke="#64748b" strokeWidth="2.5" />
        <line x1="50" y1="120" x2="150" y2="120" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,3" />
        <rect x="80" y="45" width="40" height="35" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="75" y="75" width="10" height="35" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="95" y="75" width="10" height="35" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M60,105 L140,105" stroke="#3b82f6" strokeWidth="3" strokeDasharray="4,3" />
        <polygon points="144,105 135,101 135,109" fill="#3b82f6" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">
          V-EYES SCAN PAGE (READ)
        </text>
      </svg>
    );
  }

  // SCRIBBLING ON PALM (WRITE)
  if (t === "pen_palm") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fdf4ff" stroke="#a855f7" strokeWidth="4" />

        <rect x="40" y="115" width="85" height="25" rx="8" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
        <rect x="95" y="65" width="40" height="35" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <line x1="85" y1="120" x2="125" y2="60" stroke="#7e22ce" strokeWidth="6" strokeLinecap="round" />
        <path d="M55,123 Q65,118 75,123 Q85,128 95,123" fill="none" stroke="#7e22ce" strokeWidth="2.5" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fdf4ff" stroke="#a855f7" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#7e22ce" fontSize="11" fontWeight="bold">
          SCRIBBLING ON PALM (WRITE)
        </text>
      </svg>
    );
  }

  // TWISTING Y-HANDS (PLAY)
  if (t === "y_twist") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fef3c7" stroke="#f59e0b" strokeWidth="4" />

        <g transform="translate(45, 75) rotate(-15)">
          <rect x="0" y="15" width="30" height="30" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
          <line x1="-8" y1="15" x2="5" y2="25" stroke="#fcd34d" strokeWidth="7" strokeLinecap="round" />
          <line x1="25" y1="25" x2="38" y2="15" stroke="#fcd34d" strokeWidth="7" strokeLinecap="round" />
        </g>
        <g transform="translate(125, 75) rotate(15)">
          <rect x="0" y="15" width="30" height="30" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
          <line x1="-8" y1="15" x2="5" y2="25" stroke="#fcd34d" strokeWidth="7" strokeLinecap="round" />
          <line x1="25" y1="25" x2="38" y2="15" stroke="#fcd34d" strokeWidth="7" strokeLinecap="round" />
        </g>
        <path d="M40,65 Q55,55 70,65 M120,65 Q135,55 150,65" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">
          TWISTING Y-HANDS (PLAY)
        </text>
      </svg>
    );
  }

  // F-HAND CIRCLE (FAMILY)
  if (t === "f_circle") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ecfdf5" stroke="#10b981" strokeWidth="4" />

        <circle cx="100" cy="95" r="35" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="6,4" />
        <circle cx="70" cy="95" r="9" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="62" y="65" width="7" height="22" rx="3.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <circle cx="130" cy="95" r="9" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="131" y="65" width="7" height="22" rx="3.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <text x="100" y="100" textAnchor="middle" fill="#047857" fontSize="12" fontWeight="bold">F-F</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">
          F-HAND CIRCLE (FAMILY)
        </text>
      </svg>
    );
  }

  // 5-HAND AT CHIN (MOTHER)
  if (t === "chin_thumb_tap") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fdf2f8" stroke="#ec4899" strokeWidth="4" />

        <path d="M60,65 Q80,75 80,95 Q80,115 100,120" fill="none" stroke="#fbcfe8" strokeWidth="4" strokeLinecap="round" />
        <rect x="95" y="85" width="40" height="35" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="98" y="45" width="7" height="42" rx="3.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="108" y="40" width="7" height="47" rx="3.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="118" y="42" width="7" height="45" rx="3.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="128" y="48" width="7" height="38" rx="3.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <circle cx="85" cy="115" r="7" fill="#ec4899" />
        <circle cx="85" cy="115" r="13" fill="none" stroke="#ec4899" strokeWidth="2" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fdf2f8" stroke="#ec4899" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#be185d" fontSize="11" fontWeight="bold">
          5-HAND AT CHIN (MOTHER)
        </text>
      </svg>
    );
  }

  // 5-HAND AT FOREHEAD (FATHER)
  if (t === "forehead_thumb_tap") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#eff6ff" stroke="#3b82f6" strokeWidth="4" />

        <path d="M60,115 Q60,65 95,55" fill="none" stroke="#bfdbfe" strokeWidth="4" strokeLinecap="round" />
        <rect x="95" y="55" width="40" height="35" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="98" y="15" width="7" height="42" rx="3.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="108" y="10" width="7" height="47" rx="3.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="118" y="12" width="7" height="45" rx="3.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="128" y="18" width="7" height="38" rx="3.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <circle cx="85" cy="60" r="7" fill="#3b82f6" />
        <circle cx="85" cy="60" r="13" fill="none" stroke="#3b82f6" strokeWidth="2" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="bold">
          5-HAND AT FOREHEAD (FATHER)
        </text>
      </svg>
    );
  }

  // ROOF APEX TO WALLS (HOUSE)
  if (t === "roof_walls") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fef3c7" stroke="#d97706" strokeWidth="4" />

        <path d="M50,90 L100,50 L150,90" fill="none" stroke="#fcd34d" strokeWidth="16" strokeLinecap="round" />
        <path d="M50,90 L100,50 L150,90" fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <path d="M55,95 L55,140 M145,95 L145,140" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="55,146 49,135 61,135" fill="#d97706" />
        <polygon points="145,146 139,135 151,135" fill="#d97706" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">
          ROOF APEX TO WALLS (HOUSE)
        </text>
      </svg>
    );
  }

  // PALMS OPENING (BOOK)
  if (t === "open_book") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f0fdf4" stroke="#16a34a" strokeWidth="4" />

        <g transform="translate(10, 0)">
          <rect x="40" y="70" width="45" height="55" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
          <rect x="95" y="70" width="45" height="55" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
          <line x1="90" y1="65" x2="90" y2="130" stroke="#16a34a" strokeWidth="4" />
        </g>
        <path d="M45,55 Q65,45 85,55 M135,55 Q115,45 95,55" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
        <polygon points="45,55 52,62 55,50" fill="#16a34a" />
        <polygon points="135,55 125,50 128,62" fill="#16a34a" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
          PALMS OPENING (BOOK)
        </text>
      </svg>
    );
  }

  // INDEX TAPPING WRIST (TIME)
  if (t === "wrist_tap") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f1f5f9" stroke="#475569" strokeWidth="4" />

        <rect x="35" y="90" width="80" height="25" rx="10" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
        <circle cx="75" cy="102" r="14" fill="#38bdf8" stroke="#0284c7" strokeWidth="2.5" />
        <line x1="75" y1="102" x2="75" y2="95" stroke="#0369a1" strokeWidth="2" />
        <line x1="75" y1="102" x2="81" y2="102" stroke="#0369a1" strokeWidth="2" />
        <rect x="110" y="60" width="45" height="35" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="85" y="80" width="30" height="10" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M75,82 Q85,75 95,82" fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">
          INDEX TAPPING WRIST (TIME)
        </text>
      </svg>
    );
  }

  // CIRCLE TO RAYS (SUN)
  if (t === "sun_circle_rays") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fefce8" stroke="#eab308" strokeWidth="4" />

        <circle cx="100" cy="85" r="26" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
        <path d="M100,45 L100,52 M100,118 L100,125 M60,85 L67,85 M133,85 L140,85 M72,57 L77,62 M128,113 L123,108 M72,113 L77,108 M128,57 L123,62" stroke="#eab308" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M140,85 A42,42 0 1,1 90,43" fill="none" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4,3" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fefce8" stroke="#eab308" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="bold">
          CIRCLE TO RAYS (SUN)
        </text>
      </svg>
    );
  }

  // C-HAND CRESCENT (MOON)
  if (t === "crescent_hand") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#1e1b4b" stroke="#818cf8" strokeWidth="4" />

        <circle cx="100" cy="90" r="28" fill="#fef08a" />
        <circle cx="112" cy="85" r="24" fill="#1e1b4b" />
        <path d="M125,50 C95,50 85,85 85,105 C85,125 105,140 125,140" fill="none" stroke="#fcd34d" strokeWidth="12" strokeLinecap="round" />
        <path d="M125,50 C95,50 85,85 85,105 C85,125 105,140 125,140" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="50,60 52,65 57,66 53,69 54,74 50,71 46,74 47,69 43,66 48,65" fill="#fef08a" />
        <polygon points="145,110 146,113 149,114 147,116 148,119 145,117 142,119 143,116 141,114 144,113" fill="#fef08a" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#e0e7ff" fontSize="11" fontWeight="bold">
          C-HAND CRESCENT (MOON)
        </text>
      </svg>
    );
  }

  // TWINKLE POINTS (STAR)
  if (t === "alternate_point") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" />

        <rect x="55" y="90" width="35" height="40" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="65" y="45" width="10" height="48" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="110" y="80" width="35" height="40" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="125" y="35" width="10" height="48" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M70,25 L73,35 L83,38 L73,41 L70,51 L67,41 L57,38 L67,35 Z" fill="#38bdf8" />
        <path d="M130,15 L132,23 L140,25 L132,27 L130,35 L128,27 L120,25 L128,23 Z" fill="#facc15" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
          TWINKLE POINTS (STAR)
        </text>
      </svg>
    );
  }

  // CLAW HANDS RAIN (RAIN)
  if (t === "rain_drops") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f0f9ff" stroke="#0284c7" strokeWidth="4" />

        <rect x="45" y="65" width="40" height="30" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="115" y="65" width="40" height="30" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <line x1="50" y1="105" x2="45" y2="135" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
        <line x1="70" y1="105" x2="65" y2="135" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
        <line x1="90" y1="100" x2="85" y2="140" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
        <line x1="120" y1="105" x2="115" y2="135" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
        <line x1="140" y1="105" x2="135" y2="135" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
          CLAW HANDS RAIN (RAIN)
        </text>
      </svg>
    );
  }

  // HOT CLAW EXPEL (HOT)
  if (t === "claw_from_mouth") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fef2f2" stroke="#ef4444" strokeWidth="4" />

        <ellipse cx="60" cy="85" rx="14" ry="18" fill="#fda4af" stroke="#e11d48" strokeWidth="2.5" />
        <rect x="100" y="70" width="45" height="40" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M95,65 Q85,75 95,85" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
        <path d="M75,70 Q90,60 110,65 M75,95 Q90,105 110,100" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="120,67 108,61 112,72" fill="#ef4444" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">
          HOT CLAW EXPEL (HOT)
        </text>
      </svg>
    );
  }

  // SHIVERING FISTS (COLD)
  if (t === "shiver_fists") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#eff6ff" stroke="#2563eb" strokeWidth="4" />

        <rect x="55" y="80" width="38" height="42" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="105" y="80" width="38" height="42" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M40,75 L45,85 L38,95 L45,105 M155,75 L150,85 L157,95 L150,105" fill="none" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="100" cy="50" r="5" fill="#60a5fa" />
        <path d="M100,38 L100,62 M88,50 L112,50 M92,42 L108,58 M92,58 L108,42" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="bold">
          SHIVERING FISTS (COLD)
        </text>
      </svg>
    );
  }

  // BRANCH & FOREARM (TREE)
  if (t === "tree_branch") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ecfdf5" stroke="#15803d" strokeWidth="4" />

        <rect x="35" y="130" width="130" height="20" rx="10" fill="#86efac" stroke="#16a34a" strokeWidth="2.5" />
        <rect x="88" y="70" width="22" height="65" rx="6" fill="#fde68a" stroke="#d97706" strokeWidth="3" />
        <rect x="80" y="45" width="40" height="30" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M75,45 Q70,25 65,30 M88,40 Q88,15 95,20 M108,40 Q115,15 110,20 M120,45 Q130,25 125,30" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#ecfdf5" stroke="#15803d" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#14532d" fontSize="11" fontWeight="bold">
          BRANCH & FOREARM (TREE)
        </text>
      </svg>
    );
  }

  // BLOSSOMING PETALS (FLOWER)
  if (t === "flower_bloom") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fdf4ff" stroke="#c026d3" strokeWidth="4" />

        <path d="M100,100 Q95,125 100,150" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="112" cy="130" rx="8" ry="4" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" />
        <circle cx="100" cy="80" r="12" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
        <circle cx="100" cy="62" r="10" fill="#f472b6" stroke="#c026d3" strokeWidth="2" />
        <circle cx="100" cy="98" r="10" fill="#f472b6" stroke="#c026d3" strokeWidth="2" />
        <circle cx="82" cy="80" r="10" fill="#f472b6" stroke="#c026d3" strokeWidth="2" />
        <circle cx="118" cy="80" r="10" fill="#f472b6" stroke="#c026d3" strokeWidth="2" />
        <path d="M68,60 Q80,45 100,45 Q120,45 132,60" fill="none" stroke="#c026d3" strokeWidth="3" strokeLinecap="round" strokeDasharray="3,3" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fdf4ff" stroke="#c026d3" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#86198f" fontSize="11" fontWeight="bold">
          BLOSSOMING PETALS (FLOWER)
        </text>
      </svg>
    );
  }

  // PLANETARY AXIS ROCK (EARTH)
  if (t === "axis_rock") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#eff6ff" stroke="#0284c7" strokeWidth="4" />

        <circle cx="100" cy="90" r="32" fill="#60a5fa" stroke="#0284c7" strokeWidth="3" />
        <path d="M85,75 Q95,85 110,80 Q115,95 105,105 Q90,100 85,75 Z" fill="#86efac" />
        <ellipse cx="100" cy="90" rx="46" ry="14" transform="rotate(-22 100 90)" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="5,4" />
        <path d="M50,70 Q45,90 55,110 M145,110 Q155,90 145,70" fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#eff6ff" stroke="#0284c7" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
          PLANETARY AXIS ROCK (EARTH)
        </text>
      </svg>
    );
  }

  // RISING FLAMES (FIRE)
  if (t === "fire_flames") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fff7ed" stroke="#ea580c" strokeWidth="4" />

        <path d="M100,35 C115,60 135,75 135,100 C135,125 118,140 100,140 C82,140 65,125 65,100 C65,75 85,60 100,35 Z" fill="#f97316" stroke="#ea580c" strokeWidth="3" />
        <path d="M100,65 C110,80 120,90 120,110 C120,125 110,135 100,135 C90,135 80,125 80,110 C80,90 90,80 100,65 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
        <path d="M50,110 L50,90 M150,110 L150,90 M70,75 L70,55 M130,75 L130,55" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#9a3412" fontSize="11" fontWeight="bold">
          RISING FLAMES (FIRE)
        </text>
      </svg>
    );
  }

  // EXPANDING L-HANDS (BIG)
  if (t === "expand_l") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f8fafc" stroke="#475569" strokeWidth="4" />

        <rect x="40" y="80" width="30" height="40" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="40" y="45" width="10" height="40" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="40" y="110" width="35" height="10" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="130" y="80" width="30" height="40" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="150" y="45" width="10" height="40" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="125" y="110" width="35" height="10" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M75,85 L125,85" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
        <polygon points="128,85 116,80 116,90" fill="#3b82f6" />
        <polygon points="72,85 84,80 84,90" fill="#3b82f6" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">
          EXPANDING L-HANDS (BIG)
        </text>
      </svg>
    );
  }

  // COMPRESSED GAP (SMALL)
  if (t === "squeeze_palms") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fefce8" stroke="#ca8a04" strokeWidth="4" />

        <rect x="40" y="65" width="35" height="60" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="125" y="65" width="35" height="60" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M78,95 L95,95 M122,95 L105,95" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
        <polygon points="98,95 90,90 90,100" fill="#ca8a04" />
        <polygon points="102,95 110,90 110,100" fill="#ca8a04" />
        <rect x="98" y="85" width="4" height="20" rx="2" fill="#eab308" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="bold">
          COMPRESSED GAP (SMALL)
        </text>
      </svg>
    );
  }

  // BURSTING LIGHT BEAMS (LIGHT)
  if (t === "flick_chin_light") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fefce8" stroke="#eab308" strokeWidth="4" />

        <circle cx="100" cy="85" r="20" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
        <path d="M100,35 L100,50 M100,120 L100,135 M50,85 L65,85 M135,85 L150,85 M65,50 L75,60 M125,110 L135,120 M65,120 L75,110 M125,60 L135,50" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
        <text x="100" y="90" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="bold">LIGHT</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fefce8" stroke="#eab308" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="bold">
          BURSTING LIGHT BEAMS (LIGHT)
        </text>
      </svg>
    );
  }

  // CROSSING HANDS (DARK)
  if (t === "cross_face_dark") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#1e293b" stroke="#64748b" strokeWidth="4" />

        <circle cx="100" cy="90" r="30" fill="#0f172a" stroke="#475569" strokeWidth="3" />
        <line x1="50" y1="65" x2="140" y2="115" stroke="#fcd34d" strokeWidth="14" strokeLinecap="round" />
        <line x1="50" y1="65" x2="140" y2="115" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="150" y1="65" x2="60" y2="115" stroke="#fcd34d" strokeWidth="14" strokeLinecap="round" />
        <line x1="150" y1="65" x2="60" y2="115" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M45,55 L70,70 M155,55 L130,70" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#f1f5f9" fontSize="11" fontWeight="bold">
          CROSSING HANDS (DARK)
        </text>
      </svg>
    );
  }

  // INDEX SNAP (FAST)
  if (t === "index_snap") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fef2f2" stroke="#dc2626" strokeWidth="4" />

        <rect x="65" y="85" width="55" height="40" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="110" y="90" width="35" height="12" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M125,50 L145,50 L135,70 L155,70 L120,110 L132,80 L115,80 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
        <line x1="150" y1="95" x2="180" y2="95" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">
          INDEX SNAP (FAST)
        </text>
      </svg>
    );
  }

  // INDEX 1 UPRIGHT
  if (t === "num_1") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f8fafc" stroke="#64748b" strokeWidth="4" />

        <rect x="70" y="90" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="75" y="35" width="14" height="60" rx="7" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <ellipse cx="98" cy="108" rx="16" ry="9" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" fill="#3b82f6" fontSize="26" fontWeight="bold">1</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">
          INDEX 1 UPRIGHT
        </text>
      </svg>
    );
  }

  // TWO FINGERS (V-SIGN)
  if (t === "num_2") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f8fafc" stroke="#64748b" strokeWidth="4" />

        <rect x="70" y="95" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="70" y="40" width="13" height="60" rx="6.5" transform="rotate(-12 76 70)" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="98" y="40" width="13" height="60" rx="6.5" transform="rotate(12 104 70)" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <ellipse cx="100" cy="112" rx="16" ry="9" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" fill="#3b82f6" fontSize="26" fontWeight="bold">2</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">
          TWO FINGERS (V-SIGN)
        </text>
      </svg>
    );
  }

  // THUMB + 2 FINGERS (3)
  if (t === "num_3") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f8fafc" stroke="#64748b" strokeWidth="4" />

        <rect x="70" y="95" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="52" y="85" width="25" height="12" rx="6" transform="rotate(-30 65 90)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="78" y="40" width="12" height="60" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="96" y="40" width="12" height="60" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <text x="145" y="65" fill="#3b82f6" fontSize="26" fontWeight="bold">3</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">
          THUMB + 2 FINGERS (3)
        </text>
      </svg>
    );
  }

  // FOUR FINGERS UPRIGHT (4)
  if (t === "num_4") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f8fafc" stroke="#64748b" strokeWidth="4" />

        <rect x="70" y="95" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="72" y="40" width="10" height="58" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="85" y="36" width="10" height="62" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="98" y="38" width="10" height="60" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="111" y="44" width="10" height="54" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <ellipse cx="95" cy="112" rx="14" ry="7" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" fill="#3b82f6" fontSize="26" fontWeight="bold">4</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">
          FOUR FINGERS UPRIGHT (4)
        </text>
      </svg>
    );
  }

  // OPEN 5 SPREAD HAND (5)
  if (t === "num_5") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ecfdf5" stroke="#10b981" strokeWidth="4" />

        <rect x="70" y="85" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="50" y="75" width="10" height="35" rx="5" transform="rotate(-35 55 90)" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="68" y="40" width="10" height="50" rx="5" transform="rotate(-15 73 65)" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="88" y="32" width="10" height="58" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="108" y="38" width="10" height="52" rx="5" transform="rotate(12 113 64)" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="126" y="52" width="9" height="42" rx="4.5" transform="rotate(25 130 73)" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <text x="148" y="65" fill="#10b981" fontSize="26" fontWeight="bold">5</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">
          OPEN 5 SPREAD HAND (5)
        </text>
      </svg>
    );
  }

  // THUMB TOUCHES PINKY (6)
  if (t === "num_6") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f8fafc" stroke="#64748b" strokeWidth="4" />

        <rect x="70" y="95" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="74" y="42" width="10" height="56" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="87" y="38" width="10" height="60" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="100" y="42" width="10" height="56" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <circle cx="118" cy="105" r="9" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" fill="#3b82f6" fontSize="26" fontWeight="bold">6</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">
          THUMB TOUCHES PINKY (6)
        </text>
      </svg>
    );
  }

  // THUMB TOUCHES RING (7)
  if (t === "num_7") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f8fafc" stroke="#64748b" strokeWidth="4" />

        <rect x="70" y="95" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="74" y="40" width="10" height="58" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="87" y="36" width="10" height="62" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="114" y="52" width="9" height="46" rx="4.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <circle cx="102" cy="105" r="9" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" fill="#3b82f6" fontSize="26" fontWeight="bold">7</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">
          THUMB TOUCHES RING (7)
        </text>
      </svg>
    );
  }

  // THUMB TOUCHES MIDDLE (8)
  if (t === "num_8") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f8fafc" stroke="#64748b" strokeWidth="4" />

        <rect x="70" y="95" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="74" y="40" width="10" height="58" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="100" y="44" width="10" height="54" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="114" y="52" width="9" height="46" rx="4.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <circle cx="89" cy="105" r="9" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" fill="#3b82f6" fontSize="26" fontWeight="bold">8</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">
          THUMB TOUCHES MIDDLE (8)
        </text>
      </svg>
    );
  }

  // THUMB TOUCHES INDEX (9)
  if (t === "num_9") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f8fafc" stroke="#64748b" strokeWidth="4" />

        <rect x="70" y="95" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="88" y="40" width="10" height="58" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="102" y="44" width="10" height="54" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="116" y="52" width="9" height="46" rx="4.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <circle cx="76" cy="105" r="9" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" fill="#3b82f6" fontSize="26" fontWeight="bold">9</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">
          THUMB TOUCHES INDEX (9)
        </text>
      </svg>
    );
  }

  // THUMB SHAKE (10)
  if (t === "num_10") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f8fafc" stroke="#64748b" strokeWidth="4" />

        <rect x="70" y="85" width="55" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M72,95 C68,65 74,40 88,40 C100,40 102,65 100,85 Z" fill="#fcd34d" stroke="#d97706" strokeWidth="3.5" />
        <path d="M55,60 Q70,45 85,60 M110,60 Q125,45 140,60" fill="none" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
        <text x="145" y="65" fill="#3b82f6" fontSize="24" fontWeight="bold">10</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">
          THUMB SHAKE (10)
        </text>
      </svg>
    );
  }

  // CLOSED FIST THUMB SIDE (A)
  if (t === "alpha_a") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="75" width="60" height="60" rx="14" fill="#fcd34d" stroke="#d97706" strokeWidth="3.5" />
        <path d="M70,90 H125 M70,105 H125 M70,120 H120" stroke="#b45309" strokeWidth="2.5" />
        <rect x="58" y="75" width="15" height="50" rx="7.5" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">A</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          CLOSED FIST THUMB SIDE (A)
        </text>
      </svg>
    );
  }

  // FLAT 4 UPRIGHT (B)
  if (t === "alpha_b") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="85" width="55" height="55" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="72" y="30" width="10" height="60" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="84" y="26" width="10" height="64" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="96" y="28" width="10" height="62" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="108" y="34" width="10" height="56" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <ellipse cx="96" cy="110" rx="18" ry="8" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">B</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          FLAT 4 UPRIGHT (B)
        </text>
      </svg>
    );
  }

  // CURVED C-HAND (C)
  if (t === "alpha_c") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <path d="M125,55 C80,55 70,85 70,105 C70,125 80,155 125,155" fill="none" stroke="#fcd34d" strokeWidth="22" strokeLinecap="round" />
        <path d="M125,55 C80,55 70,85 70,105 C70,125 80,155 125,155" fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">C</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          CURVED C-HAND (C)
        </text>
      </svg>
    );
  }

  // INDEX UP WITH LOOP (D)
  if (t === "alpha_d") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <circle cx="85" cy="115" r="22" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="95" y="40" width="14" height="75" rx="7" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">D</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          INDEX UP WITH LOOP (D)
        </text>
      </svg>
    );
  }

  // CURLED FINGERS ON THUMB (E)
  if (t === "alpha_e") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="85" width="55" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="72" y="65" width="50" height="25" rx="10" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
        <path d="M84,65 V88 M96,65 V88 M108,65 V88" stroke="#b45309" strokeWidth="2" />
        <ellipse cx="98" cy="100" rx="20" ry="7" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">E</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          CURLED FINGERS ON THUMB (E)
        </text>
      </svg>
    );
  }

  // THREE-UP O-RING (F)
  if (t === "alpha_f") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="95" width="55" height="50" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="85" y="35" width="10" height="60" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="100" y="38" width="10" height="58" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="115" y="46" width="9" height="50" rx="4.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <circle cx="78" cy="108" r="11" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
        <circle cx="78" cy="108" r="4" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">F</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          THREE-UP O-RING (F)
        </text>
      </svg>
    );
  }

  // HORIZONTAL PINCH (G)
  if (t === "alpha_g") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="55" y="75" width="45" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="90" y="80" width="50" height="13" rx="6.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="90" y="105" width="45" height="13" rx="6.5" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
        <line x1="125" y1="94" x2="125" y2="104" stroke="#9333ea" strokeWidth="2" strokeDasharray="2,2" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">G</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          HORIZONTAL PINCH (G)
        </text>
      </svg>
    );
  }

  // TWO-FINGER HORIZONTAL (H)
  if (t === "alpha_h") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="50" y="75" width="45" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="85" y="80" width="55" height="11" rx="5.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <rect x="85" y="93" width="55" height="11" rx="5.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <ellipse cx="80" cy="112" rx="14" ry="7" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">H</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          TWO-FINGER HORIZONTAL (H)
        </text>
      </svg>
    );
  }

  // PINKY EXTENDED (I)
  if (t === "alpha_i") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="85" width="60" height="60" rx="14" fill="#fcd34d" stroke="#d97706" strokeWidth="3.5" />
        <ellipse cx="95" cy="105" rx="18" ry="9" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <rect x="115" y="35" width="11" height="55" rx="5.5" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">I</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          PINKY EXTENDED (I)
        </text>
      </svg>
    );
  }

  // PINKY SWOOP HOOK (J)
  if (t === "alpha_j") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="75" y="75" width="50" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="112" y="45" width="11" height="40" rx="5.5" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M118,50 L118,110 C118,135 88,135 85,115" fill="none" stroke="#9333ea" strokeWidth="4" strokeLinecap="round" strokeDasharray="5,4" />
        <polygon points="85,110 80,122 92,120" fill="#9333ea" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">J</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          PINKY SWOOP HOOK (J)
        </text>
      </svg>
    );
  }

  // V-THUMB CROOK (K)
  if (t === "alpha_k") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="95" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="75" y="35" width="12" height="65" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="90" y="45" width="12" height="60" rx="6" transform="rotate(35 96 75)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="85" y="75" width="11" height="30" rx="5.5" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">K</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          V-THUMB CROOK (K)
        </text>
      </svg>
    );
  }

  // RIGHT-ANGLE L-SHAPE (L)
  if (t === "alpha_l") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="90" width="55" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="72" y="30" width="14" height="65" rx="7" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="25" y="105" width="50" height="14" rx="7" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="68" y="96" width="10" height="10" fill="none" stroke="#9333ea" strokeWidth="2" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">L</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          RIGHT-ANGLE L-SHAPE (L)
        </text>
      </svg>
    );
  }

  // 3 FINGERS OVER THUMB (M)
  if (t === "alpha_m") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="85" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="72" y="65" width="14" height="35" rx="7" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="87" y="63" width="14" height="37" rx="7" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="102" y="65" width="14" height="35" rx="7" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <ellipse cx="118" cy="98" rx="8" ry="6" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">M</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          3 FINGERS OVER THUMB (M)
        </text>
      </svg>
    );
  }

  // 2 FINGERS OVER THUMB (N)
  if (t === "alpha_n") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="85" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="75" y="65" width="16" height="36" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="93" y="65" width="16" height="36" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <ellipse cx="112" cy="98" rx="8" ry="6" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">N</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          2 FINGERS OVER THUMB (N)
        </text>
      </svg>
    );
  }

  // FULL CIRCULAR O-RING (O)
  if (t === "alpha_o") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <ellipse cx="100" cy="95" rx="35" ry="42" fill="none" stroke="#fcd34d" strokeWidth="18" strokeLinecap="round" />
        <ellipse cx="100" cy="95" rx="35" ry="42" fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="100" cy="95" rx="18" ry="24" fill="#faf5ff" stroke="#9333ea" strokeWidth="2" strokeDasharray="3,3" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">O</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          FULL CIRCULAR O-RING (O)
        </text>
      </svg>
    );
  }

  // DOWNWARD INVERTED K (P)
  if (t === "alpha_p") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="60" width="55" height="50" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="75" y="100" width="12" height="60" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="90" y="85" width="50" height="12" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="85" y="70" width="11" height="25" rx="5.5" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">P</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          DOWNWARD INVERTED K (P)
        </text>
      </svg>
    );
  }

  // DOWNWARD PINCH (Q)
  if (t === "alpha_q") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="65" y="55" width="55" height="45" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="72" y="95" width="12" height="55" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="96" y="95" width="12" height="50" rx="6" fill="#fbbf24" stroke="#d97706" strokeWidth="3" />
        <line x1="86" y1="120" x2="94" y2="120" stroke="#9333ea" strokeWidth="2" strokeDasharray="2,2" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">Q</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          DOWNWARD PINCH (Q)
        </text>
      </svg>
    );
  }

  // CROSSED FINGERS (R)
  if (t === "alpha_r") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="95" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="78" y="35" width="12" height="65" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M96,95 L72,40" stroke="#fcd34d" strokeWidth="12" strokeLinecap="round" />
        <path d="M96,95 L72,40" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="85,60 88,68 96,71 88,74 85,82 82,74 74,71 82,68" fill="#a855f7" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">R</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          CROSSED FINGERS (R)
        </text>
      </svg>
    );
  }

  // FIST THUMB IN FRONT (S)
  if (t === "alpha_s") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="75" width="60" height="60" rx="14" fill="#fcd34d" stroke="#d97706" strokeWidth="3.5" />
        <path d="M70,90 H125 M70,105 H125 M70,120 H120" stroke="#b45309" strokeWidth="2.5" />
        <rect x="62" y="95" width="65" height="16" rx="8" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">S</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          FIST THUMB IN FRONT (S)
        </text>
      </svg>
    );
  }

  // THUMB BETWEEN 1 & 2 (T)
  if (t === "alpha_t") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="80" width="60" height="60" rx="14" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <ellipse cx="88" cy="75" rx="9" ry="14" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
        <path d="M72,85 C72,70 88,68 95,78" fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">T</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          THUMB BETWEEN 1 & 2 (T)
        </text>
      </svg>
    );
  }

  // 2 FINGERS PRESSED (U)
  if (t === "alpha_u") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="95" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="80" y="35" width="12" height="65" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="92" y="35" width="12" height="65" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <ellipse cx="100" cy="112" rx="16" ry="8" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">U</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          2 FINGERS PRESSED (U)
        </text>
      </svg>
    );
  }

  // V-PEACE SPREAD (V)
  if (t === "alpha_v") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="95" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="70" y="40" width="12" height="60" rx="6" transform="rotate(-15 76 70)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="98" y="40" width="12" height="60" rx="6" transform="rotate(15 104 70)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <ellipse cx="100" cy="112" rx="16" ry="8" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">V</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          V-PEACE SPREAD (V)
        </text>
      </svg>
    );
  }

  // THREE-FINGER W-SHAPE (W)
  if (t === "alpha_w") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="100" width="60" height="50" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="68" y="45" width="10" height="60" rx="5" transform="rotate(-15 73 75)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="88" y="40" width="10" height="65" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="108" y="45" width="10" height="60" rx="5" transform="rotate(15 113 75)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <ellipse cx="118" cy="115" rx="8" ry="10" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">W</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          THREE-FINGER W-SHAPE (W)
        </text>
      </svg>
    );
  }

  // HOOKED INDEX FINGER (X)
  if (t === "alpha_x") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="85" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M75,95 L75,55 C75,40 100,40 100,60" fill="none" stroke="#fcd34d" strokeWidth="13" strokeLinecap="round" />
        <path d="M75,95 L75,55 C75,40 100,40 100,60" fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="98" cy="105" rx="14" ry="8" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">X</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          HOOKED INDEX FINGER (X)
        </text>
      </svg>
    );
  }

  // THUMB-PINKY HANG LOOSE (Y)
  if (t === "alpha_y") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="70" y="85" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="30" y="75" width="45" height="14" rx="7" transform="rotate(-30 50 82)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="115" y="75" width="45" height="14" rx="7" transform="rotate(30 135 82)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M75,100 H120 M75,115 H120" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">Y</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          THUMB-PINKY HANG LOOSE (Y)
        </text>
      </svg>
    );
  }

  // AIR-TRACED Z-STROKES (Z)
  if (t === "alpha_z") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />

        <rect x="65" y="85" width="55" height="45" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="100" y="90" width="40" height="14" rx="7" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <path d="M50,45 L130,45 L70,110 L150,110" fill="none" stroke="#9333ea" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="155,110 145,104 145,116" fill="#9333ea" />
        <circle cx="90" cy="38" r="8" fill="#a855f7" /><text x="90" y="42" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">1</text>
        <circle cx="95" cy="78" r="8" fill="#a855f7" /><text x="95" y="82" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">2</text>
        <circle cx="110" cy="120" r="8" fill="#a855f7" /><text x="110" y="124" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">3</text>
        <text x="145" y="65" fill="#9333ea" fontSize="28" fontWeight="bold">Z</text>

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">
          AIR-TRACED Z-STROKES (Z)
        </text>
      </svg>
    );
  }

  // KNUCKLES TAP PALM (SOLID)
  if (t === "solid_tap" || t.includes("solid")) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f8fafc" stroke="#475569" strokeWidth="4" />

        <rect x="40" y="125" width="120" height="22" rx="11" fill="#fde68a" stroke="#d97706" strokeWidth="3" />
        <rect x="75" y="55" width="50" height="50" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3.5" />
        <path d="M75,70 H125 M75,85 H125 M75,100 H125" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M60,118 L48,108 M140,118 L152,108" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
        <polygon points="100,123 94,112 106,112" fill="#0284c7" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">
          KNUCKLES TAP PALM (SOLID)
        </text>
      </svg>
    );
  }

  // RISING VAPOR STEAM (GAS)
  if (t === "rising_steam" || t.includes("steam") || t.includes("gas")) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f0f9ff" stroke="#0284c7" strokeWidth="4" />

        <path d="M50,135 Q65,115 80,125 M150,135 Q135,115 120,125" fill="none" stroke="#fcd34d" strokeWidth="12" strokeLinecap="round" />
        <path d="M50,135 Q65,115 80,125 M150,135 Q135,115 120,125" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M75,110 Q65,85 75,65 Q85,45 75,25" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M100,110 Q110,85 100,65 Q90,45 100,25" fill="none" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
        <path d="M125,110 Q115,85 125,65 Q135,45 125,25" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="100,20 94,30 106,30" fill="#0284c7" />

        <rect x="15" y="165" width="170" height="22" rx="6" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
        <text x="100" y="180" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
          RISING VAPOR STEAM (GAS)
        </text>
      </svg>
    );
  }

  // Fallback: Adaptive Contextual Hand Diagram
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <circle cx="100" cy="100" r="90" fill="#f8fafc" stroke="#6366f1" strokeWidth="4" />
      <rect x="70" y="85" width="60" height="55" rx="14" fill="#fcd34d" stroke="#d97706" strokeWidth="3.5" />
      <rect x="75" y="35" width="14" height="60" rx="7" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
      <path d="M120,55 A35,35 0 0,1 155,90" fill="none" stroke="#6366f1" strokeWidth="4" strokeDasharray="4,3" />
      <polygon points="158,95 150,85 160,85" fill="#6366f1" />
      <circle cx="100" cy="115" r="8" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
      <rect x="15" y="165" width="170" height="22" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
      <text x="100" y="180" textAnchor="middle" fill="#3730a3" fontSize="11" fontWeight="bold">
        {title.slice(0, 20)}
      </text>
    </svg>
  );
}
