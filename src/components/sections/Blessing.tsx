import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { wedding } from '../../config/wedding';
import { GoldDivider, Gopuram, Diya, Lotus } from '../ui/Ornaments';
import { MandapBackdrop } from '../ui/Backdrops';

export function Blessing() {
  const reduced = useReducedMotion();

  return (
    <section
      id="blessings"
      aria-labelledby="blessings-heading"
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-24 text-center sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <MandapBackdrop className="absolute inset-0 h-full w-full opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,206,110,0.22),transparent_58%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-950/70 via-transparent to-maroon-950" />
        <div
          className="anim-glow absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(255,214,140,0.10), transparent 18%, rgba(255,214,140,0.08) 32%, transparent 52%, rgba(255,214,140,0.10) 70%, transparent 88%)',
          }}
        />
        <Gopuram className="absolute -bottom-4 left-2 w-40 opacity-[0.18] sm:left-8 sm:w-56" />
        <Gopuram className="absolute -bottom-4 right-2 w-40 opacity-[0.18] sm:right-8 sm:w-56" />
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-end gap-10 opacity-70 sm:flex">
          <Diya lit className="h-12 w-12" />
          <Diya lit className="h-14 w-14" />
          <Diya lit className="h-12 w-12" />
        </div>
      </div>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          lang="te"
          className="font-telugu text-[0.7rem] tracking-[0.3em] text-gold-300/80 sm:text-xs"
        >
          శ్రీ వెంకటేశ్వరాయ నమః
        </motion.p>

        <motion.h2
          id="blessings-heading"
          lang="te"
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55 }}
          className="font-telugu mt-7 max-w-2xl text-[clamp(1.35rem,4.4vw,2.5rem)] leading-[1.5] text-gold-gradient text-gold-glow"
        >
          {wedding.messages.blessingTelugu}
        </motion.h2>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.75 }}
          className="body-lux mt-5 max-w-xl text-gold-100/75"
        >
          {wedding.messages.blessingEnglish}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.95 }}
          className="mt-8 flex flex-col items-center gap-6"
        >
          <Lotus className="h-8 w-16 opacity-70" />
          <GoldDivider className="w-56 sm:w-80" />
          <a
            href="#invitation"
            className="group inline-flex flex-col items-center gap-2 text-[0.6rem] uppercase tracking-[0.32em] text-gold-200/70 transition-colors hover:text-gold-100"
          >
            Open the invitation
            <ChevronDown className="h-5 w-5 animate-bounce text-gold-300" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
