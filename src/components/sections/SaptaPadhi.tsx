import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Gem,
  HeartHandshake,
  Infinity as InfinityIcon,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  Wheat,
} from 'lucide-react';
import { wedding, type SaptaPadhiStep } from '../../config/wedding';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import { Diya, Flame, FrameCorners, GoldDivider, Lotus } from '../ui/Ornaments';
import { MandapBackdrop } from '../ui/Backdrops';

const STEP_ICONS: Record<SaptaPadhiStep['icon'], typeof Wheat> = {
  grain: Wheat,
  strength: ShieldCheck,
  prosperity: Gem,
  happiness: Sun,
  family: Users,
  friendship: HeartHandshake,
  forever: InfinityIcon,
};

export function SaptaPadhi() {
  const steps = wedding.saptaPadhi;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  const step = steps[index];
  const isLast = index === steps.length - 1;
  const Icon = STEP_ICONS[step.icon];

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(steps.length - 1, next));
    if (clamped === index) return;
    setDirection(clamped > index ? 1 : -1);
    setIndex(clamped);
  };

  const slide = reduced
    ? {}
    : {
        initial: { opacity: 0, x: direction * 46 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: direction * -46 },
        transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] as const },
      };

  return (
    <Section id="saptapadhi" labelledBy="saptapadhi-heading" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden="true">
        <MandapBackdrop className="h-full w-full opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-950 via-transparent to-maroon-950" />
        <div className="absolute left-1/2 top-1/3 h-[60vmin] w-[60vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,180,71,0.16),transparent_65%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        <SectionHeading
          id="saptapadhi-heading"
          eyebrow="Sapta Padhi"
          title={wedding.messages.saptaTitle}
          telugu={wedding.messages.saptaTelugu}
        />

        <Reveal className="mt-12">
          <div className="ornate-card relative overflow-hidden rounded-[2rem] px-4 pb-8 pt-7 sm:px-10 sm:pb-10">
            <FrameCorners size={56} className="opacity-40" />

            <div className="relative flex flex-col items-center">
              <div className="relative flex items-end justify-center gap-5">
                <Diya lit className="h-10 w-10 opacity-80 sm:h-12 sm:w-12" />
                <div className="relative">
                  <div className="absolute inset-0 -z-10 rounded-full bg-orange-400/25 blur-2xl" />
                  <Flame className="h-20 w-14 sm:h-24 sm:w-16" />
                </div>
                <Diya lit className="h-10 w-10 opacity-80 sm:h-12 sm:w-12" />
              </div>
              <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.52rem] uppercase tracking-[0.3em] text-gold-300/60">
                <span>Sacred Agni</span>
                <span className="h-1 w-1 rounded-full bg-gold-400/60" aria-hidden="true" />
                <span lang="te" className="font-telugu text-[0.62rem] tracking-normal text-gold-300/70">
                  సప్తపది
                </span>
              </p>
            </div>

            <div className="relative mt-7 flex items-start justify-center gap-0.5 overflow-x-auto pb-2 no-scrollbar sm:gap-3">
              {steps.map((item, stepIndex) => {
                const active = stepIndex === index;
                const passed = stepIndex < index;
                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => goTo(stepIndex)}
                    aria-label={`Go to step ${stepIndex + 1}: ${item.title}`}
                    aria-current={active ? 'step' : undefined}
                    className={`group flex min-w-[2.1rem] flex-col items-center gap-1 rounded-xl px-0.5 py-1 transition-colors duration-300 sm:min-w-[2.6rem] sm:px-1 ${
                      active ? 'text-gold-100' : 'text-gold-200/45 hover:text-gold-200/80'
                    }`}
                  >
                    <Diya
                      lit={active || passed}
                      className={`h-6 w-6 transition-transform duration-300 sm:h-8 sm:w-8 ${
                        active ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                    />
                    <span
                      className={`text-[0.52rem] tracking-[0.16em] ${
                        active ? 'text-gold-200' : 'text-gold-200/35'
                      }`}
                    >
                      {item.number}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative mt-5 min-h-[22rem] sm:min-h-[20rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.number}
                  {...slide}
                  drag={reduced ? false : 'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.14}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70) goTo(index + 1);
                    else if (info.offset.x > 70) goTo(index - 1);
                  }}
                  className="flex flex-col items-center px-1 text-center"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="font-display text-5xl leading-none text-transparent sm:text-6xl"
                      style={{ WebkitTextStroke: '1px rgba(233,209,148,0.55)' }}
                    >
                      {step.number}
                    </span>
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-gold-300/40 bg-gold-200/5 text-gold-300 shadow-[0_0_30px_-10px_rgba(201,162,39,0.8)]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>

                  <p className="mt-4 text-[0.55rem] uppercase tracking-[0.34em] text-gold-300/60">
                    Step {index + 1} of {steps.length}
                  </p>
                  <h3 className="font-display mt-2 text-2xl text-gold-100 sm:text-3xl">{step.title}</h3>
                  <p lang="te" className="font-telugu mt-1 text-sm text-gold-300/80">
                    {step.titleTelugu}
                  </p>

                  <div className="relative mt-5 w-full max-w-2xl rounded-2xl border border-gold-300/20 bg-maroon-950/45 px-4 py-5 backdrop-blur-sm sm:px-7">
                    <Lotus className="mx-auto -mt-9 h-6 w-12 opacity-80" />
                    <p lang="te" className="font-telugu text-base leading-[1.9] text-gold-100 sm:text-lg">
                      “{step.promiseTelugu}”
                    </p>
                    <div className="gold-rule mx-auto my-4 w-24" />
                    <p className="body-lux text-sm italic text-gold-200/80 sm:text-base">
                      {step.promiseEnglish}
                    </p>
                  </div>

                  {isLast && (
                    <motion.div
                      initial={reduced ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.25 }}
                      className="mt-6 w-full max-w-2xl rounded-2xl border border-gold-300/30 bg-gradient-to-br from-gold-500/10 to-transparent px-5 py-5"
                    >
                      <p className="font-display text-base tracking-[0.14em] text-gold-gradient sm:text-lg">
                        {wedding.messages.saptaFinalLine}
                      </p>
                      <p lang="te" className="font-telugu mt-2 text-sm leading-[1.9] text-gold-200/80">
                        {wedding.messages.saptaFinalTelugu}
                      </p>
                      <a href="#finale" className="btn-gold mt-4">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        Continue to the Invitation
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative mt-6 flex items-center justify-between gap-3 border-t border-gold-200/10 pt-5">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                className="btn-outline-gold px-4 py-2.5 text-[0.58rem] disabled:cursor-not-allowed disabled:opacity-30 sm:px-5"
                aria-label="Previous sacred step"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex flex-1 flex-col items-center gap-2 px-2">
                <div className="flex w-full max-w-[12rem] gap-1" aria-hidden="true">
                  {steps.map((item, stepIndex) => (
                    <span
                      key={item.number}
                      className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                        stepIndex <= index ? 'bg-gold-300/80' : 'bg-gold-200/15'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[0.52rem] uppercase tracking-[0.26em] text-gold-200/50">
                  {index + 1} / {steps.length}
                </span>
              </div>

              {isLast ? (
                <a href="#gallery" className="btn-outline-gold px-4 py-2.5 text-[0.58rem] sm:px-5">
                  <span className="hidden sm:inline">Gallery</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  className="btn-outline-gold px-4 py-2.5 text-[0.58rem] sm:px-5"
                  aria-label="Next sacred step"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            <GoldDivider className="mx-auto mt-6 w-44 opacity-60" />
            <p className="mt-3 text-center text-[0.55rem] uppercase tracking-[0.22em] text-gold-200/35">
              Swipe or use the arrows to walk through the seven steps
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
