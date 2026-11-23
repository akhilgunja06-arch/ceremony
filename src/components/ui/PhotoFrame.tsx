import { useEffect, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import type { PhotoSlot } from '../../config/wedding';

interface PhotoFrameProps {
  photo: PhotoSlot;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
  onOpen?: (id: string) => void;
  showLabel?: boolean;
  showOverlay?: boolean;
  rounded?: string;
  onStatus?: (id: string, status: 'loaded' | 'error') => void;
}

export function PhotoFrame({
  photo,
  className = '',
  aspectClass = 'aspect-[3/4]',
  priority = false,
  onOpen,
  showLabel = false,
  showOverlay = true,
  rounded = 'rounded-[1.4rem]',
  onStatus,
}: PhotoFrameProps) {
  const [failed, setFailed] = useState(false);
  const src = photo.src;

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const hasImage = Boolean(src) && !failed;
  if (!hasImage) return null;

  return (
    <figure className={`group relative ${className}`}>
      <div
        className={`frame-gold relative overflow-hidden ${rounded} ${aspectClass} transition-transform duration-700 ease-out group-hover:-translate-y-1`}
      >
        <div className={`frame-gold__inner absolute inset-[9px] ${rounded}`}>
          <img
            src={src}
            alt={`${photo.label} — Tanusha and Mahesh wedding photograph`}
            className="h-full w-full object-contain"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => onStatus?.(photo.id, 'loaded')}
            onError={() => {
              setFailed(true);
              onStatus?.(photo.id, 'error');
            }}
          />
          {showOverlay && (
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold-200/20" />
          )}

          {onOpen && (
            <button
              type="button"
              onClick={() => onOpen(photo.id)}
              className="absolute inset-0 z-10 flex items-end justify-center pb-4 focus-visible:bg-maroon-950/30"
              aria-label={`Open ${photo.label} in the full screen photo viewer`}
            >
              <span className="flex items-center gap-2 rounded-full border border-gold-200/40 bg-maroon-950/70 px-4 py-2 text-[0.6rem] uppercase tracking-[0.24em] text-gold-200 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                View
              </span>
            </button>
          )}
        </div>
      </div>

      {showLabel && (
        <figcaption className="mt-3 px-1">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-gold-300/80">{photo.label}</p>
          {photo.caption && (
            <p className="mt-1 font-display text-sm italic text-gold-100/60">{photo.caption}</p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
