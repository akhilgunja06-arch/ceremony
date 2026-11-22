import { useState } from 'react';
import { Loader2, Music2, Pause, Play, Volume2 } from 'lucide-react';
import { useWeddingMusic } from '../../lib/useWeddingMusic';
import { wedding } from '../../config/wedding';

export function MusicPlayer() {
  const { playing, loading, volume, mode, error, toggle, setVolume } = useWeddingMusic();
  const [expanded, setExpanded] = useState(false);

  const status = playing ? (mode === 'generated' ? 'Live ambience' : 'Now playing') : 'Tap to play';

  return (
    <div className="fixed bottom-4 left-4 z-[70] max-w-[calc(100vw-6rem)] sm:bottom-6 sm:left-6">
      <div
        className={`glass flex items-center gap-2 overflow-hidden rounded-full py-1.5 pl-1.5 pr-2 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.95)] transition-all duration-500 ${
          expanded ? 'sm:pr-3' : ''
        }`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <button
          type="button"
          onClick={() => void toggle()}
          aria-label={playing ? 'Pause wedding music' : 'Play wedding music'}
          aria-pressed={playing}
          className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-200 to-gold-500 text-maroon-950 shadow-[0_0_20px_-6px_rgba(201,162,39,0.9)] transition-transform duration-300 hover:scale-105"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : playing ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4 translate-x-[1px]" aria-hidden="true" />
          )}
          {playing && (
            <span className="absolute inset-0 animate-ping rounded-full border border-gold-200/50" aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          onClick={() => void toggle()}
          className="flex min-w-0 flex-col items-start pr-1 text-left"
          aria-label={playing ? 'Pause wedding music' : 'Play wedding music'}
        >
          <span className="flex items-center gap-1.5 text-[0.52rem] uppercase tracking-[0.2em] text-gold-200/85">
            <Music2 className="h-3 w-3" aria-hidden="true" />
            {status}
          </span>
          <span className="hidden w-[8.5rem] truncate text-[0.5rem] uppercase tracking-[0.14em] text-gold-200/45 sm:block">
            {wedding.music.title}
          </span>
        </button>

        <div
          className={`flex items-center gap-2 overflow-hidden transition-all duration-500 ${
            expanded ? 'max-w-[7rem] opacity-100' : 'max-w-0 opacity-0'
          }`}
        >
          <Volume2 className="h-3.5 w-3.5 shrink-0 text-gold-300/70" aria-hidden="true" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="gold-range w-16 cursor-pointer"
            aria-label="Music volume"
          />
        </div>

        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-gold-300/70 transition-colors hover:text-gold-100 sm:hidden"
          aria-label={expanded ? 'Hide volume control' : 'Show volume control'}
          aria-expanded={expanded}
        >
          <Volume2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {error && (
        <p className="mt-2 max-w-[16rem] rounded-lg border border-rose-500/30 bg-maroon-900/80 px-3 py-1.5 text-[0.55rem] leading-relaxed text-blush-200/80">
          {error}
        </p>
      )}
    </div>
  );
}
