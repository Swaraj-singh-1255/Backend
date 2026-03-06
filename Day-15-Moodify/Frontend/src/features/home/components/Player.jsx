import { useContext, useRef, useState, useEffect } from "react";
import { songContext } from "../song.context";
import { useSong } from "../hooks/useSong";
import "../style/player.scss";

const moodConfig = {
  happy:   { accent: "#FFD93D", glow: "rgba(255,217,61,0.45)",  label: "😊 Happy"  },
  sad:     { accent: "#74B9FF", glow: "rgba(116,185,255,0.45)", label: "😢 Sad"    },
  angry:   { accent: "#FF6B6B", glow: "rgba(255,107,107,0.45)", label: "😠 Angry"  },
  chill:   { accent: "#55EFC4", glow: "rgba(85,239,196,0.45)",  label: "😌 Chill"  },
  surprised: { accent: "#fd79a8", glow: "rgba(253,121,168,0.45)", label: "😮 Surprised" },
  default: { accent: "#a78bfa", glow: "rgba(167,139,250,0.45)", label: "🎵 Vibing" },
};

const fmt = (s) => {
  if (isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

const Player = () => {
  const { song } = useSong(songContext);
  const audioRef    = useRef(null);
  const progressRef = useRef(null);

  const [playing,  setPlaying]  = useState(false);
  const [current,  setCurrent]  = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume,   setVolume]   = useState(0.8);
  const [muted,    setMuted]    = useState(false);
  const [loaded,   setLoaded]   = useState(false);

  const mood = moodConfig[song?.mood] ?? moodConfig.default;

  useEffect(() => {
    setPlaying(false);
    setCurrent(0);
    setLoaded(false);
    if (audioRef.current) audioRef.current.load();
  }, [song?.url]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else         { audioRef.current.play();  setPlaying(true);  }
  };

  const seek = (e) => {
    const bar   = progressRef.current.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - bar.left) / bar.width, 0), 1);
    audioRef.current.currentTime = ratio * duration;
    setCurrent(ratio * duration);
  };

  const skipBack    = () => { audioRef.current.currentTime = Math.max(0, current - 10); };
  const skipForward = () => { audioRef.current.currentTime = Math.min(duration, current + 10); };

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div className="player-bar" style={{ "--accent": mood.accent, "--glow": mood.glow }}>
      {/* Blurred background glow */}
      <div className="bar-glow" />

      <audio
        ref={audioRef}
        src={song?.url}
        volume={muted ? 0 : volume}
        onTimeUpdate={(e) => setCurrent(e.target.currentTime)}
        onLoadedMetadata={(e) => { setDuration(e.target.duration); setLoaded(true); }}
        onEnded={() => setPlaying(false)}
      />

      {/* LEFT — poster + song info */}
      <div className="bar-left">
        <div className={`bar-poster${playing ? " spin" : ""}`}>
          {!loaded && <div className="bar-shimmer" />}
          <img src={song?.posterUrl} alt={song?.title} />
          <div className="mood-dot" title={mood.label} />
        </div>
        <div className="bar-meta">
          <div className="bar-title">{song?.title ?? "No song selected"}</div>
          <div className="bar-mood">{mood.label}</div>
        </div>
      </div>

      {/* CENTER — controls + progress */}
      <div className="bar-center">
        <div className="bar-controls">
          <button className="bc-btn" onClick={skipBack}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
              <text x="7.5" y="15.5" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">10</text>
            </svg>
          </button>

          <button className={`bc-btn play${playing ? " playing" : ""}`} onClick={toggle}>
            {playing
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6zm8-14v14h4V5z"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            }
          </button>

          <button className="bc-btn" onClick={skipForward}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.01 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/>
              <text x="7.5" y="15.5" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">10</text>
            </svg>
          </button>
        </div>

        <div className="bar-progress-row">
          <span className="bar-time">{fmt(current)}</span>
          <div className="bar-progress" ref={progressRef} onClick={seek}>
            <div className="bar-progress-fill" style={{ width: `${pct}%` }}>
              <div className="bar-thumb" />
            </div>
          </div>
          <span className="bar-time">{fmt(duration)}</span>
        </div>
      </div>

      {/* RIGHT — volume */}
      <div className="bar-right">
        <button className="bc-btn small" onClick={() => setMuted(m => !m)}>
          {muted
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
          }
        </button>
        <input
          type="range" min="0" max="1" step="0.01"
          value={muted ? 0 : volume}
          className="bar-vol"
          onChange={(e) => { setVolume(+e.target.value); setMuted(false);
            if (audioRef.current) audioRef.current.volume = +e.target.value;
          }}
        />
      </div>
    </div>
  );
};

export default Player;