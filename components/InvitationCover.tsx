'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function InvitationCover() {
  const [closing, setClosing] = useState(false);
  const [hidden,  setHidden]  = useState(false);
  const openedRef = useRef(false);

  function open() {
    if (openedRef.current) return;
    openedRef.current = true;
    setClosing(true);
    setTimeout(() => setHidden(true), 900);
  }

  if (hidden) return null;

  return (
    <div className={`cover-overlay${closing ? ' cover-closing' : ''}`} onClick={open}>
      {/* Background photo */}
      <div className="cover-photo">
        <Image
          src="/z7593996846495_bcf88d92b7c27eabd11ac3902a72faf9.jpg"
          alt="cover"
          fill
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
          priority
        />
        <div className="cover-photo-dim" />
      </div>

      {/* Card content */}
      <div className="cover-card">
        <p className="cover-label">TRÂN TRỌNG KÍNH MỜI</p>

        <div className="cover-monogram">
          <svg viewBox="0 0 90 78" fill="none" width="80" height="69">
            <text x="2"  y="70" fontFamily="Georgia,'Times New Roman',serif" fontSize="76" fontWeight="700" fill="#c9a254" opacity="0.4">T</text>
            <text x="34" y="74" fontFamily="Georgia,'Times New Roman',serif" fontSize="68" fontStyle="italic" fill="#c9a254" opacity="0.85">T</text>
          </svg>
        </div>

        <h1 className="cover-names">
          <span className="cover-name-script">Quốc Thịnh</span>
          <span className="cover-and">&amp;</span>
          <span className="cover-name-script">Đoan Trinh</span>
        </h1>

        <div className="cover-divider" />

        <p className="cover-date">22 · 04 · 2026</p>
        <p className="cover-venue">Nhà Hàng Bách Việt · Sảnh Rosy Lầu 2 · TP.HCM</p>

        <button className="cover-btn" aria-label="Mở thiệp">
          <span className="cover-btn-text">Nhấn để mở thiệp</span>
          <span className="cover-btn-icon">✦</span>
        </button>
      </div>
    </div>
  );
}
