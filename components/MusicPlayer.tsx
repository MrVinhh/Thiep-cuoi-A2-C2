'use client';
import { useEffect, useRef, useState } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    audio.addEventListener('canplaythrough', () => setReady(true));

    let started = false;
    function onFirstInteraction() {
      if (started) return;
      started = true;
      document.removeEventListener('click', onFirstInteraction);
      document.removeEventListener('touchstart', onFirstInteraction);
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }

    document.addEventListener('click', onFirstInteraction);
    document.addEventListener('touchstart', onFirstInteraction);

    return () => {
      document.removeEventListener('click', onFirstInteraction);
      document.removeEventListener('touchstart', onFirstInteraction);
      audio.pause();
      audio.src = '';
    };
  }, []);

  function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio || !ready) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Tắt nhạc' : 'Bật nhạc'}
      title={playing ? 'Tắt nhạc' : 'Bật nhạc'}
      className={`music-btn ${playing ? 'music-btn--playing' : ''} ${ready ? 'music-btn--ready' : ''}`}
    >
      <span className="music-disc">
        <span className="music-disc-center" />
      </span>
      <svg className="music-note" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
      </svg>
    </button>
  );
}
