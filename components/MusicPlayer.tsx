'use client';
import { useEffect, useRef, useState } from 'react';

export default function MusicPlayer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const readyRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!document.getElementById('yt-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }

    function initPlayer() {
      const div = document.createElement('div');
      div.id = 'yt-music-player';
      div.style.cssText =
        'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;pointer-events:none;';
      document.body.appendChild(div);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const YT = (window as any).YT;
      playerRef.current = new YT.Player('yt-music-player', {
        width: '1',
        height: '1',
        videoId: '2Vv-BfVoq4g', // Ed Sheeran - Perfect
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: '2Vv-BfVoq4g',
          start: 21, // bắt đầu từ điệp khúc (~1:00)
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            readyRef.current = true;
            setReady(true);
            // Nếu user đã click trước khi player sẵn sàng, phát ngay
            if (pendingPlayRef.current) {
              playerRef.current.playVideo();
              setPlaying(true);
            }
          },
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).YT?.Player) {
      initPlayer();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }

    let started = false;
    function onFirstInteraction() {
      if (started) return;
      started = true;
      document.removeEventListener('click', onFirstInteraction);
      document.removeEventListener('touchstart', onFirstInteraction);

      if (readyRef.current && playerRef.current) {
        playerRef.current.playVideo();
        setPlaying(true);
      } else {
        // Player chưa sẵn sàng → đặt cờ, onReady sẽ xử lý
        pendingPlayRef.current = true;
      }
    }

    document.addEventListener('click', onFirstInteraction);
    document.addEventListener('touchstart', onFirstInteraction);

    return () => {
      document.removeEventListener('click', onFirstInteraction);
      document.removeEventListener('touchstart', onFirstInteraction);
    };
  }, []);

  function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    if (!playerRef.current || !readyRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
      setPlaying(false);
    } else {
      playerRef.current.playVideo();
      setPlaying(true);
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
