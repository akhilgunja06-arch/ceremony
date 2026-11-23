import { Sparkles } from 'lucide-react';
import { useCountdown } from '../../lib/useCountdown';

export function Countdown({ target }: { target: Date }) {
  const { days, hours, minutes, seconds, isPast } = useCountdown(target);

  if (isPast) {
    return (
      <div className="ornate-card relative overflow-hidden rounded-3xl px-6 py-8 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.18),transparent_65%)]" />
        <Sparkles className="mx-auto h-6 w-6 text-gold-300" aria-hidden="true" />
        <p className="font-display mt-3 text-2xl text-gold-gradient sm:text-3xl">
          Today we celebrate a beautiful beginning!
        </p>
        <p lang="te" className="font-telugu mt-2 text-sm text-gold-200/80">
          ఈ రోజు మా జీవితంలో ఒక అందమైన ప్రారంభం.
        </p>
      </div>
    );
  }

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <div>
      <p className="mb-4 text-center text-[0.58rem] uppercase tracking-[0.32em] text-gold-300/70">
        Counting every moment until the muhurtham
      </p>
      <div
        className="grid grid-cols-4 gap-2 sm:gap-4"
        role="timer"
        aria-live="off"
        aria-label="Time remaining until the wedding"
      >
        {units.map((unit) => (
          <div
            key={unit.label}
            className="ornate-card relative overflow-hidden rounded-2xl px-1 py-4 text-center sm:py-5"
          >
            <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/60 to-transparent" />
            <span className="font-display block text-[clamp(1.5rem,5.4vw,2.6rem)] leading-none tabular-nums text-gold-gradient">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="mt-2 block text-[0.5rem] uppercase tracking-[0.24em] text-gold-200/60 sm:text-[0.6rem]">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
