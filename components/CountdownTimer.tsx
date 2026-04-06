'use client';
import { useEffect, useRef, useState } from 'react';

const TARGET = new Date('2026-04-22T18:00:00');

function calcDiff() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: '00', hours: '00', mins: '00', secs: '00' };
  return {
    days:  String(Math.floor(diff / 86400000)).padStart(2, '0'),
    hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
    mins:  String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
    secs:  String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
  };
}

function FlipNum({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value && ref.current) {
      ref.current.classList.remove('flip');
      void ref.current.offsetWidth;
      ref.current.classList.add('flip');
      prev.current = value;
    }
  }, [value]);

  return <span className="cd-value" ref={ref}>{value}</span>;
}

export default function CountdownTimer() {
  const [val, setVal] = useState(calcDiff);

  useEffect(() => {
    const id = setInterval(() => setVal(calcDiff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown-grid">
      <div className="cd-unit"><FlipNum value={val.days}  /><div className="cd-label">NGÀY</div></div>
      <div className="cd-sep">:</div>
      <div className="cd-unit"><FlipNum value={val.hours} /><div className="cd-label">GIỜ</div></div>
      <div className="cd-sep">:</div>
      <div className="cd-unit"><FlipNum value={val.mins}  /><div className="cd-label">PHÚT</div></div>
      <div className="cd-sep">:</div>
      <div className="cd-unit"><FlipNum value={val.secs}  /><div className="cd-label">GIÂY</div></div>
    </div>
  );
}
