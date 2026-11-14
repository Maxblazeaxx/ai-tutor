import React from "react";

/**
 * Procedural Vector Hand Illustration for Predefined Sign Shapes.
 * Draws clear, high-contrast, scalable SVG hands showing exact handshapes,
 * directional motion arrows, touch targets, and finger positions.
 */
export default function SignIllustrationSVG({ svgType, term, className = "w-40 h-40" }) {
  const t = svgType || "default";

  // Thumbs Up (Good)
  if (t === "thumbs_up") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <radialGradient id="gradGood" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ecfdf5" />
            <stop offset="100%" stopColor="#d1fae5" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#gradGood)" stroke="#10b981" strokeWidth="4" />
        {/* Palm fist base */}
        <rect x="70" y="95" width="60" height="55" rx="14" fill="#fcd34d" stroke="#d97706" strokeWidth="4" />
        {/* Curled finger segments */}
        <path d="M70,105 H125 M70,118 H125 M70,132 H120" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
        {/* Thumb pointing upright */}
        <path d="M72,105 C68,75 74,45 88,45 C100,45 102,75 100,95 Z" fill="#fcd34d" stroke="#d97706" strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="88" cy="55" rx="4" ry="7" fill="#fbbf24" />
        {/* Upward motion glow sparkles */}
        <path d="M125,50 L135,35 M140,55 L155,55 M135,70 L150,80" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
        <text x="100" y="180" textAnchor="middle" fill="#047857" fontSize="13" fontWeight="bold">UPRIGHT THUMB (GOOD)</text>
      </svg>
    );
  }

  // Thumbs Down (Bad)
  if (t === "thumbs_down") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <radialGradient id="gradBad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff1f2" />
            <stop offset="100%" stopColor="#ffe4e6" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#gradBad)" stroke="#f43f5e" strokeWidth="4" />
        {/* Palm fist base */}
        <rect x="70" y="55" width="60" height="55" rx="14" fill="#fcd34d" stroke="#d97706" strokeWidth="4" />
        {/* Curled finger segments */}
        <path d="M70,68 H125 M70,82 H125 M70,96 H120" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
        {/* Thumb pointing straight down */}
        <path d="M72,100 C68,125 74,155 88,155 C100,155 102,125 100,105 Z" fill="#fcd34d" stroke="#d97706" strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="88" cy="145" rx="4" ry="7" fill="#fbbf24" />
        {/* Downward emphasis arrows */}
        <path d="M125,125 L135,140 M140,115 L155,115 M135,100 L150,90" stroke="#e11d48" strokeWidth="3.5" strokeLinecap="round" />
        <text x="100" y="180" textAnchor="middle" fill="#be123c" fontSize="13" fontWeight="bold">DOWN THUMB (BAD)</text>
      </svg>
    );
  }

  // Please (Palm Circle on Chest)
  if (t === "palm_circle") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fef3c7" stroke="#f59e0b" strokeWidth="4" />
        {/* Torso outline */}
        <path d="M40,170 C40,130 70,120 100,120 C130,120 160,130 160,170" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
        {/* Open flat palm on heart */}
        <g transform="translate(10, -5)">
          <rect x="75" y="70" width="45" height="40" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
          <rect x="77" y="38" width="8" height="35" rx="4" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
          <rect x="87" y="34" width="8" height="40" rx="4" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
          <rect x="97" y="36" width="8" height="38" rx="4" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
          <rect x="107" y="42" width="7" height="32" rx="3.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        </g>
        {/* Circular stroke arrow around palm */}
        <path d="M145,95 A35,35 0 1,1 85,65" fill="none" stroke="#d97706" strokeWidth="4" strokeDasharray="5,4" />
        <polygon points="85,58 85,72 73,65" fill="#d97706" />
        <text x="100" y="182" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="bold">CIRCULAR CHEST RUB</text>
      </svg>
    );
  }

  // Thank You (Chin Forward)
  if (t === "chin_forward") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#e0f2fe" stroke="#0284c7" strokeWidth="4" />
        {/* Face side profile outline */}
        <path d="M45,50 Q65,60 65,85 Q65,105 75,115 Q90,125 100,125" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
        {/* Hand touching chin */}
        <rect x="80" y="105" width="40" height="30" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M85,105 L85,75 M95,105 L95,70 M105,105 L105,73 M115,105 L115,80" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
        {/* Forward sweeping arrow */}
        <path d="M125,100 C150,100 160,115 170,125" fill="none" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
        <polygon points="175,125 160,120 168,135" fill="#0284c7" />
        <text x="100" y="180" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">CHIN TO FORWARD</text>
      </svg>
    );
  }

  // Stop (Palm Chop)
  if (t === "palm_chop") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#fee2e2" stroke="#ef4444" strokeWidth="4" />
        {/* Base horizontal open palm */}
        <rect x="40" y="125" width="85" height="22" rx="10" fill="#fde68a" stroke="#d97706" strokeWidth="3" />
        <path d="M125,130 C140,130 145,138 140,145 L45,145" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
        {/* Vertical chopping hand coming down */}
        <g transform="translate(10, 0)">
          <path d="M90,45 L115,45 L115,115 L90,115 Z" fill="#fcd34d" stroke="#d97706" strokeWidth="3.5" rx="5" />
          <path d="M98,45 L98,110 M106,45 L106,110" stroke="#b45309" strokeWidth="2" />
        </g>
        {/* Impact strike lines */}
        <path d="M85,120 L70,110 M130,120 L145,110 M105,122 L105,116" stroke="#b91c1c" strokeWidth="4" strokeLinecap="round" />
        <text x="100" y="180" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="bold">FIRM CHOPPING CONTACT</text>
      </svg>
    );
  }

  // Help (Palm Lift)
  if (t === "palm_lift") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="4" />
        {/* Base lifting palm */}
        <rect x="45" y="130" width="110" height="22" rx="11" fill="#fde68a" stroke="#d97706" strokeWidth="3" />
        {/* Thumbs up fist resting on top of palm */}
        <rect x="75" y="85" width="50" height="45" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <path d="M78,85 C75,60 80,45 92,45 C102,45 104,65 102,85 Z" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        {/* Two upward lift motion arrows */}
        <path d="M40,110 L40,80 M160,110 L160,80" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
        <polygon points="40,73 34,85 46,85" fill="#7c3aed" />
        <polygon points="160,73 154,85 166,85" fill="#7c3aed" />
        <text x="100" y="180" textAnchor="middle" fill="#5b21b6" fontSize="13" fontWeight="bold">SUPPORTING LIFT</text>
      </svg>
    );
  }

  // Water (W-handshape at chin)
  if (t === "w_chin") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#e0f2fe" stroke="#0284c7" strokeWidth="4" />
        {/* W-hand: 3 fingers tall, pinky curled */}
        <rect x="75" y="105" width="50" height="40" rx="10" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        {/* 3 upright fingers (Index, Middle, Ring) */}
        <rect x="77" y="45" width="9" height="60" rx="4.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="91" y="40" width="9" height="65" rx="4.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="105" y="45" width="9" height="60" rx="4.5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        {/* Curled thumb over pinky */}
        <ellipse cx="118" cy="115" rx="8" ry="12" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        {/* Water droplet accents */}
        <path d="M45,70 C45,60 55,45 55,45 C55,45 65,60 65,70 A10,10 0 1,1 45,70 Z" fill="#38bdf8" />
        <text x="100" y="180" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">W-SIGN TAP AT CHIN</text>
      </svg>
    );
  }

  // Number 1
  if (t === "num_1") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f1f5f9" stroke="#64748b" strokeWidth="4" />
        {/* Fist body */}
        <rect x="70" y="90" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        {/* Single index finger straight up */}
        <rect x="75" y="35" width="14" height="60" rx="7" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        {/* Thumb crossing curled fingers */}
        <ellipse cx="98" cy="108" rx="16" ry="9" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x="100" y="180" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="bold">INDEX 1 UPRIGHT</text>
      </svg>
    );
  }

  // Number 2 / V-hand
  if (t === "num_2" || t === "v_from_eyes") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#f1f5f9" stroke="#64748b" strokeWidth="4" />
        <rect x="70" y="95" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        {/* V-fingers spread */}
        <rect x="70" y="40" width="13" height="60" rx="6.5" transform="rotate(-12 76 70)" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <rect x="98" y="40" width="13" height="60" rx="6.5" transform="rotate(12 104 70)" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        <ellipse cx="100" cy="112" rx="16" ry="9" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x="100" y="180" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="bold">TWO FINGERS (V-SIGN)</text>
      </svg>
    );
  }

  // Number 5 / Open Palm
  if (t === "num_5" || t === "open_wave") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="90" fill="#ecfdf5" stroke="#10b981" strokeWidth="4" />
        {/* Palm base */}
        <rect x="70" y="85" width="60" height="55" rx="12" fill="#fcd34d" stroke="#d97706" strokeWidth="3" />
        {/* 5 spread fingers */}
        <rect x="50" y="75" width="10" height="35" rx="5" transform="rotate(-35 55 90)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="68" y="40" width="10" height="50" rx="5" transform="rotate(-15 73 65)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="88" y="32" width="10" height="58" rx="5" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="108" y="38" width="10" height="52" rx="5" transform="rotate(12 113 64)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <rect x="126" y="52" width="9" height="42" rx="4.5" transform="rotate(25 130 73)" fill="#fcd34d" stroke="#d97706" strokeWidth="2.5" />
        <text x="100" y="180" textAnchor="middle" fill="#047857" fontSize="13" fontWeight="bold">OPEN 5 SPREAD HAND</text>
      </svg>
    );
  }

  // Generic Iconic Sign Hand Illustration (Default fallback)
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <circle cx="100" cy="100" r="90" fill="#eef2ff" stroke="#6366f1" strokeWidth="4" />
      {/* Universal communicating hands graphic */}
      <path d="M60,115 Q100,75 140,115" stroke="#4f46e5" strokeWidth="10" strokeLinecap="round" fill="none" />
      <line x1="55" y1="135" x2="145" y2="135" stroke="#4f46e5" strokeWidth="10" strokeLinecap="round" />
      <circle cx="100" cy="70" r="16" fill="#818cf8" stroke="#4338ca" strokeWidth="3" />
      <circle cx="70" cy="100" r="7" fill="#6366f1" />
      <circle cx="130" cy="100" r="7" fill="#6366f1" />
      <text x="100" y="180" textAnchor="middle" fill="#3730a3" fontSize="12" fontWeight="bold">
        {term ? `${term.toUpperCase()} SIGN` : "FIXED SIGN SHAPE"}
      </text>
    </svg>
  );
}
