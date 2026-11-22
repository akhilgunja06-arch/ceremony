import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CalendarDays, Clock, Heart, MapPin, Sparkles } from 'lucide-react';
import { photoById, wedding } from '../../config/wedding';
import { usePhotoLibrary } from '../../lib/photoLibrary';
import { PhotoFrame } from '../ui/PhotoFrame';
import { TempleArch } from '../ui/Ornaments';
import { MandapBackdrop } from '../ui/Backdrops';
import { burstPetals } from '../effects/PetalCanvas';

const heroPhoto = photoById('hero');

export function Hero() {
  const reduced = useReducedMotion();
  const { overrides } = usePhotoLibrary();
  const [bgFailed, setBgFailed] = useState(false);
  const bgSrc = overrides.hero ?? heroPhoto?.src;
  const showBg = Boolean(bgSrc) && !bgFailed;

  const enterInvitation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    burstPetals(window.innerWidth / 2, window.innerHeight * 0.62);
    document.getElementById('details')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, delay, ease: [0.2, 0.8, 0.2, 1] as const },
        };

  return (
    <section
      id="invitation"
      aria-labelledby="invitation-heading"
      className="relative z-10 flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-24 sm:px-8 lg:pt-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {showBg ? (
          <img
            src={bgSrc}
            alt=""
            className="anim-kenburns h-full w-full object-cover object-[center_28%] opacity-70"
            onError={() => setBgFailed(true)}
            aria-hidden="true"
          />
        ) : (
          <MandapBackdrop className="h-full w-full opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-950/80 via-maroon-950/45 to-maroon-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/92 via-maroon-950/45 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_45%,rgba(201,162,39,0.16),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-maroon-950 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.p {...fade(0.15)} className="eyebrow flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span>13 · 12 · 2026</span>
            <span className="h-1 w-1 rounded-full bg-gold-400" aria-hidden="true" />
            <span>Lingala</span>
          </motion.p>

          <motion.h1
            {...fade(0.3)}
            id="invitation-heading"
            lang="te"
            className="font-telugu mt-5 text-[clamp(1.85rem,6vw,3.9rem)] leading-[1.4] text-gold-gradient"
          >
            {wedding.messages.welcomeTelugu}
          </motion.h1>

          <motion.p
            {...fade(0.45)}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-display text-[clamp(1.55rem,4.4vw,3rem)] leading-tight tracking-[0.12em] text-gold-100 lg:justify-start"
            aria-label={`${wedding.couple.bride.name} and ${wedding.couple.groom.name}`}
          >
            <span>{wedding.couple.bride.name.toUpperCase()}</span>
            <Heart
              className="h-[0.62em] w-[0.62em] fill-rose-500/90 text-rose-500 anim-glow"
              aria-hidden="true"
              strokeWidth={1.4}
            />
            <span>{wedding.couple.groom.name.toUpperCase()}</span>
          </motion.p>

          <motion.p {...fade(0.58)} className="mt-4 text-[0.68rem] uppercase tracking-[0.3em] text-gold-300/80">
            {wedding.messages.welcomeSubtitle}
          </motion.p>

          <motion.p {...fade(0.7)} className="body-lux mt-5 max-w-xl text-gold-100/80">
            {wedding.messages.welcomeEnglish}
          </motion.p>

          <motion.p
            {...fade(0.8)}
            lang="te"
            className="font-telugu mt-4 max-w-xl text-sm leading-[1.9] text-gold-200/75 sm:text-base"
          >
            {wedding.messages.welcomeTeluguMessage}
          </motion.p>

          <motion.div {...fade(0.95)} className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <a href="#details" onClick={enterInvitation} className="btn-gold">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Enter Wedding Invitation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#gallery" className="btn-outline-gold">
              View Photographs
            </a>
          </motion.div>

          <motion.ul
            {...fade(1.05)}
            className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.62rem] uppercase tracking-[0.2em] text-gold-200/70 lg:justify-start"
          >
            <li className="flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
              {wedding.wedding.dateDisplay}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
              {wedding.wedding.timeDisplay} IST
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
              Lingala, Eluru District
            </li>
          </motion.ul>
        </div>

        <motion.div
          {...fade(0.6)}
          className="relative mx-auto hidden w-full max-w-[22rem] lg:block"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 scale-125 opacity-70" aria-hidden="true">
            <TempleArch className="h-full w-full" opacity={0.6} />
          </div>
          <div
            className="anim-spin-slow pointer-events-none absolute -inset-6 -z-10 rounded-full border border-dashed border-gold-400/20"
            aria-hidden="true"
          />
          <div className="absolute inset-0 -z-10 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
          {heroPhoto && (
            <PhotoFrame
              photo={heroPhoto}
              aspectClass="aspect-[3/4]"
              variant="hero"
              priority
              monogram={wedding.couple.monogram}
              rounded="rounded-[999px_999px_1.6rem_1.6rem]"
              className="drop-shadow-[0_40px_80px_rgba(0,0,0,0.65)]"
            />
          )}
          <p className="font-script mt-6 text-center text-2xl text-gold-200/80">Forever begins</p>
        </motion.div>
      </div>
    </section>
  );
}
