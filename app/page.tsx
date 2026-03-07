import Image from 'next/image';
import CountdownTimer from '@/components/CountdownTimerLoader';
import WeddingCalendar from '@/components/WeddingCalendar';
import ClientEffects from '@/components/ClientEffects';
import PetalCanvas from '@/components/PetalCanvasLoader';
import ConfettiLoader from '@/components/ConfettiLoader';
import InvitationCoverLoader from '@/components/InvitationCoverLoader';
import MusicPlayer from '@/components/MusicPlayer';

const IMG = {
  hero:         '/z7593996846495_bcf88d92b7c27eabd11ac3902a72faf9.jpg',
  aodai:        '/z7593996850316_675d207b8f6debdcc366b122777d66e3.jpg',
  sofa:         '/z7593996853711_afb6c61f70ac3b620264111e0fd223cd.jpg',
  kiss:         '/z7593996855671_426a92107d19b7df5d84c703a9e88fbe.jpg',
  justMarried:  '/z7593996859975_97a7f79ed0f6a7ceea85c99562029921.jpg',
  bride:        '/z7594758638208_adadad4e502fec8d2e6b6948da3b1525.jpg',
  dance:        '/z7594758638688_d44e484147f61450729bfdde9beffada.jpg',
  flowers:      '/z7594758639067_b1eecbdede65da82d800ecb351c88392.jpg',
  gaze:         '/z7594758639623_da07a057c7fdafb7cc4a8979ad33291a.jpg',
  baroque:      '/z7594758639845_26afd052a55d0a4daa62fe1ce097d0bf.jpg',
  fun:          '/z7594758639968_491a54ff72e0bd2a968e26e1760c0b48.jpg',
  kiss2:        '/z7594758640351_acd6541073dd923e58c99ad6f5555ad9.jpg',
  justMarried2: '/z7594758640641_143ed2406bb8215d70a529303176f8ad.jpg',
  handKiss:     '/z7594758641246_6110cc2c07d336196e1772ff55202e65.jpg',
};

/* ── helper: full-width image box ── */
function ImgBox({ src, alt, h, pos = 'center', className = '' }: {
  src: string; alt: string; h: number; pos?: string; className?: string;
}) {
  return (
    <div className={`img-box ${className}`} style={{ height: h }}>
      <Image src={src} alt={alt} fill style={{ objectFit: 'cover', objectPosition: pos }} />
    </div>
  );
}

const FloralDivider = () => (
  <svg viewBox="0 0 320 55" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.5">
      <path d="M30 48 Q70 25 110 35 Q140 42 160 28" stroke="#c9a254" strokeWidth="1.2" fill="none"/>
      <ellipse cx="75" cy="22" rx="11" ry="6.5" fill="#e8d5a0" transform="rotate(-15,75,22)"/>
      <ellipse cx="100" cy="18" rx="8" ry="5" fill="#d4bc80" transform="rotate(8,100,18)"/>
      <ellipse cx="55" cy="32" rx="7" ry="4.5" fill="#eadcb0" transform="rotate(-22,55,32)"/>
      <circle cx="125" cy="24" r="4" fill="none" stroke="#c9a254" strokeWidth="1"/>
      <circle cx="125" cy="24" r="1.5" fill="#c9a254"/>
    </g>
    <g transform="translate(320,0) scale(-1,1)" opacity="0.5">
      <path d="M30 48 Q70 25 110 35 Q140 42 160 28" stroke="#c9a254" strokeWidth="1.2" fill="none"/>
      <ellipse cx="75" cy="22" rx="11" ry="6.5" fill="#e8d5a0" transform="rotate(-15,75,22)"/>
      <ellipse cx="100" cy="18" rx="8" ry="5" fill="#d4bc80" transform="rotate(8,100,18)"/>
      <circle cx="125" cy="24" r="4" fill="none" stroke="#c9a254" strokeWidth="1"/>
      <circle cx="125" cy="24" r="1.5" fill="#c9a254"/>
    </g>
  </svg>
);

const SunOrnament = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="7" stroke="#c9a254" strokeWidth="1.2"/>
    <circle cx="20" cy="20" r="3.5" fill="#c9a254" opacity="0.35"/>
    {[0,45,90,135,180,225,270,315].map(a => {
      const r = Math.PI * a / 180;
      return <line key={a} x1={20+10*Math.cos(r)} y1={20+10*Math.sin(r)} x2={20+14*Math.cos(r)} y2={20+14*Math.sin(r)} stroke="#c9a254" strokeWidth="1.2"/>;
    })}
  </svg>
);

const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
);

const timeline = [
  { time: '08:30', event: 'Lễ 2 Bên Gia Đình (Tư Gia)' },
  { time: '10:00', event: 'Đón Khách' },
  { time: '10:30', event: 'Lễ Thành Hôn & Vu Quy' },
  { time: '11:00', event: 'Khai Tiệc' },
];

export default function Page() {
  return (
    <>
      <InvitationCoverLoader />
      <PetalCanvas />
      <ClientEffects />
      <MusicPlayer />

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="hero" id="hero">
        <p className="hero-script">Wedding</p>

        {/* Hero photo full bleed */}
        <ImgBox src={IMG.hero} alt="Quốc Thịnh & Đoan Trinh" h={460} pos="top center" />

        <div className="floral-divider"><FloralDivider /></div>

        <div className="hero-names">
          <h1>
            <span>Quốc Thịnh</span>
            <div className="divider-line" />
            <span>Đoan Trinh</span>
          </h1>
          <p className="hero-date">14 . 03 . 2026</p>
        </div>
      </section>

      {/* ══════════════════════════════
          SAVE THE DATE
      ══════════════════════════════ */}
      <section className="std-section" id="save-the-date">
        {/* Monogram */}
        <div className="monogram">
          <svg viewBox="0 0 90 78" fill="none">
            {/* Back T — large serif, lighter */}
            <text x="2" y="70" fontFamily="Georgia, 'Times New Roman', serif" fontSize="76" fontWeight="700" fill="#c9a254" opacity="0.45">T</text>
            {/* Front T — italic script, offset right */}
            <text x="34" y="74" fontFamily="Georgia, 'Times New Roman', serif" fontSize="68" fontStyle="italic" fill="#9e7a32" opacity="0.92">T</text>
          </svg>
        </div>

        <p className="std-subtext">
          WE&apos;VE BEEN WRITING OUR LOVE STORY FOR YEARS...<br/>
          AND THE NEXT CHAPTER BEGINS IN
        </p>
        <div className="std-separator" />
        <div className="std-title-row">
          <span className="std-title">SAVE </span>
          <span className="std-title-script">the</span>
          <span className="std-title"> DATE</span>
        </div>
        <p className="std-date">14 . 03 . 2026</p>

        <div className="floral-divider" style={{ margin: '24px 0 16px' }}><FloralDivider /></div>

        {/* Polaroid photos */}
        <div className="polaroid-grid">
          <div className="polaroid">
            <div className="polaroid-img-wrap">
              <Image src={IMG.aodai} alt="áo dài" fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
            </div>
            <p className="photo-caption">our story</p>
          </div>
          <div className="polaroid polaroid-offset">
            <div className="polaroid-img-wrap">
              <Image src={IMG.sofa} alt="lãng mạn" fill style={{ objectFit: 'cover', objectPosition: '50% 15%' }} />
            </div>
            <p className="photo-caption">memories</p>
          </div>
        </div>

        <a className="direction-btn" href="https://maps.google.com/?q=Trung+Tam+To+Chuc+Su+Kien+Tiec+Cuoi+Nhan+Tam+Hue" target="_blank" rel="noopener noreferrer">
          <PinIcon /> CHỈ ĐƯỜNG
        </a>
      </section>

      {/* ══════════════════════════════
          INVITATION
      ══════════════════════════════ */}
      <section className="invitation-section" id="invitation">
        <ConfettiLoader />
        <div className="floral-divider"><FloralDivider /></div>

        <p className="inv-tagline">
          Trân trọng kính mời bạn đến tham dự<br/>
          hôn lễ của con chúng tôi
        </p>

        {/* Parents block */}
        <div className="inv-parents">
          <div className="inv-family">
            <p className="inv-family-label">Nhà Gái</p>
            <p className="inv-parent">Ông <strong>PHẠM VĂN LẠI</strong></p>
            <p className="inv-parent">Bà <strong>HỒ THỊ KIM ANH</strong></p>
          </div>
          <div className="inv-family-sep" />
          <div className="inv-family">
            <p className="inv-family-label">Nhà Trai</p>
            <p className="inv-parent">Ông <strong>PHẠM QUANG HƯNG</strong></p>
            <p className="inv-parent">Bà <strong>NGUYỄN THỊ THÚY NGA</strong></p>
          </div>
        </div>

        <p className="inv-tagline-sub">trân trọng kính mời</p>

        <div className="inv-couple">
          Quốc Thịnh
          <span className="and-text">and</span>
          Đoan Trinh
        </div>

        <div className="inv-details-box">
          <p className="inv-label">Hôn lễ được tổ chức</p>
          <div className="inv-divider" />
          <div className="inv-date-row">
            <div className="inv-date-month">THÁNG 3</div>
            <div className="inv-date-day">14</div>
            <div className="inv-date-year">NĂM 2026</div>
          </div>
          <div className="inv-divider" />
          <p className="inv-value">Vào lúc 11 giờ 00, Thứ Bảy</p>
          <p className="inv-value-sm">(Nhằm ngày 26 tháng 01 năm Bính Ngọ)</p>
        </div>

        <p className="inv-label" style={{ marginTop: 28 }}>Tại địa điểm</p>
        <p className="venue-name">Trung Tâm Tổ Chức Sự Kiện<br/>Tiệc Cưới Nhân Tâm</p>
        <p className="venue-addr">66 Nguyễn Phúc Nguyên, Phường Phú Xuân, Huế</p>

        <a className="direction-btn" style={{ marginTop: 24 }} href="https://maps.google.com/?q=66+Nguyen+Phuc+Nguyen+Phu+Xuan+Hue" target="_blank" rel="noopener noreferrer">
          <PinIcon /> CHỈ ĐƯỜNG
        </a>
      </section>

      {/* ══════════════════════════════
          COUPLE / LOVE STORY
      ══════════════════════════════ */}
      <section className="couple-section" id="couple">
        {/* Faded full-section background */}
        <div className="couple-bg">
          <Image src={IMG.dance} alt="The love story" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
        </div>

        <p className="couple-message">
          Mỗi khoảnh khắc bên nhau là một trang mới trong câu chuyện tình yêu của chúng mình.
          Hành trình đã dài, nhưng con đường phía trước còn đẹp hơn rất nhiều.
          Cảm ơn bạn đã đồng hành và chứng kiến ngày trọng đại này cùng chúng mình.
        </p>

        {/* Bride & Groom typographic block */}
        <div className="couple-names-block">
          <p className="cn-name">PHẠM THỊ ĐOAN TRINH</p>
          <div className="cn-and-row">
            <div className="cn-side">
              <div className="cn-divider-line" />
              <span className="cn-role">Trưởng Nữ</span>
            </div>
            <span className="cn-script">and</span>
            <div className="cn-side cn-side--right">
              <span className="cn-role">Trưởng Nam</span>
              <div className="cn-divider-line" />
            </div>
          </div>
          <p className="cn-name">PHẠM QUỐC THỊNH</p>
        </div>

      </section>

      {/* ══════════════════════════════
          TIMELINE
      ══════════════════════════════ */}
      <section className="timeline-section" id="timeline">

        {/* Photo with heading overlaid */}
        <div className="timeline-hero">
          <ImgBox src={IMG.flowers} alt="couple" h={300} pos="top center" />
          <div className="timeline-hero-overlay">
            <div className="sun-ornament"><SunOrnament /></div>
            <p className="section-label tl-label-light">CHƯƠNG TRÌNH</p>
            <p className="section-title tl-title-light">TIMELINE OF</p>
            <p className="section-script tl-script-light">Wedding</p>
          </div>
        </div>

        <ul className="timeline-list">
          {timeline.map(({ time, event }) => (
            <li key={time} className="tl-item">
              <div className="tl-time"><p className="tl-hour">{time}</p></div>
              <div className="tl-dot" />
              <div className="tl-content"><p className="tl-event">{event}</p></div>
            </li>
          ))}
        </ul>
      </section>

      {/* ══════════════════════════════
          ALBUM OF LOVE
      ══════════════════════════════ */}
      <section className="album-section" id="album">
        <p className="album-title">ALBUM of</p>
        <div className="album-love">
          {(['L','O','V','E'] as const).map((letter, i) => (
            <div
              key={letter}
              className="album-letter"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <Image
                src={[IMG.kiss, IMG.fun, IMG.justMarried, IMG.handKiss][i]}
                alt={letter} fill
                style={{ objectFit: 'cover', objectPosition: 'top center', mixBlendMode: 'multiply', opacity: 0.7 }}
              />
              <span>{letter}</span>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="album-grid">
          <div className="album-grid__main">
            <ImgBox src={IMG.kiss2} alt="couple" h={280} pos="center" />
          </div>
          <div className="album-grid__side">
            <ImgBox src={IMG.fun} alt="couple" h={136} pos="top center" />
            <ImgBox src={IMG.justMarried} alt="Just Married" h={136} pos="top center" />
          </div>
        </div>

        {/* Strip */}
        <div className="album-strip">
          {[IMG.aodai, IMG.sofa, IMG.baroque, IMG.justMarried2, IMG.dance].map((src, i) => (
            <div key={i} className="strip-wrap">
              <Image src={src} alt="album" fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
            </div>
          ))}
        </div>

        <div className="floral-divider" style={{ marginTop: 24 }}><FloralDivider /></div>
      </section>

      {/* ══════════════════════════════
          COUNTDOWN
      ══════════════════════════════ */}
      <section className="countdown-section" id="countdown">
        <div className="cd-bg">
          <Image src={IMG.aodai} alt="" fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
        </div>
        <div className="cd-overlay" />
        <p className="cal-ngay-chung-doi">Ngày chung đôi</p>
        <p className="countdown-script">Countdown love</p>
        <CountdownTimer />
        <WeddingCalendar />
      </section>

      {/* ══════════════════════════════
          THANK YOU
      ══════════════════════════════ */}
      <section className="thankyou-section" id="thankyou">
        {/* Full-bleed background photo */}
        <div className="ty-bg">
          <Image src={IMG.handKiss} alt="Thank you" fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
        </div>
        {/* Gradient overlay + text */}
        <div className="ty-content">
          <p className="ty-script">Thank you</p>
          <p className="ty-text">
            Cho dù bạn đã ghé thăm và chứng kiến những khoảnh khắc đặc biệt nhất
            của chúng mình, chúng mình sẽ mãi ghi nhớ tình cảm chân thành của mỗi người.
            Kính chúc quý khách cùng gia đình những điều tốt lành nhất.
          </p>
          <p className="ty-heart">✦ &nbsp; ✦ &nbsp; ✦</p>
        </div>
      </section>

      <footer>
        QUỐC THỊNH &amp; ĐOAN TRINH &nbsp;·&nbsp; 14 . 03 . 2026
      </footer>
    </>
  );
}
