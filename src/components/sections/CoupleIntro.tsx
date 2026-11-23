import { photoById, wedding } from '../../config/wedding';
import { PhotoFrame } from '../ui/PhotoFrame';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import { GoldDivider, Lotus, RingsIllustration } from '../ui/Ornaments';

const groomPhoto = photoById('groom-1');
const bridePhoto = photoById('bride-1');

export function CoupleIntro() {
  return (
    <Section id="couple" labelledBy="couple-heading">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          id="couple-heading"
          eyebrow="The Couple"
          title="Two Hearts, One Promise"
          telugu={wedding.messages.storyTelugu}
        />

        <div className="mt-14">
          <Reveal delay={0.15} className="mx-auto w-full max-w-3xl">
            <div className="flex flex-col items-center text-center">
              <Lotus className="h-10 w-20 opacity-80" />
              <p className="font-script mt-4 flex flex-wrap items-baseline justify-center gap-x-3 text-3xl text-gold-200/90 lg:justify-start sm:text-4xl">
                <span>{wedding.couple.bride.name}</span>
                <span aria-hidden="true" className="text-2xl opacity-70">&amp;</span>
                <span>{wedding.couple.groom.name}</span>
              </p>
              <p className="body-lux mt-5 max-w-xl font-display text-lg italic text-gold-100/85 sm:text-xl">
                “{wedding.messages.storyQuote}”
              </p>
              <GoldDivider className="mt-7 w-56 sm:w-72" />
              <div className="mt-7 grid w-full max-w-md grid-cols-2 gap-4">
                <div className="ornate-card rounded-2xl px-4 py-4 text-center">
                  <p className="text-[0.55rem] uppercase tracking-[0.24em] text-gold-300/70">The Bride</p>
                  <p className="mt-1 font-display text-xl text-gold-100">{wedding.couple.bride.name}</p>
                  <p lang="te" className="font-telugu text-xs text-gold-200/70">
                    {wedding.couple.bride.teluguName}
                  </p>
                </div>
                <div className="ornate-card rounded-2xl px-4 py-4 text-center">
                  <p className="text-[0.55rem] uppercase tracking-[0.24em] text-gold-300/70">The Groom</p>
                  <p className="mt-1 font-display text-xl text-gold-100">{wedding.couple.groom.name}</p>
                  <p lang="te" className="font-telugu text-xs text-gold-200/70">
                    {wedding.couple.groom.teluguName}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-[0.62rem] uppercase tracking-[0.28em] text-gold-300/70">
                {wedding.wedding.dateLong} · {wedding.wedding.timeDisplay}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-16 sm:mt-20">
          <div className="grid items-center gap-8 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
            <Reveal delay={0.1} className="w-full">
              {bridePhoto && (
                <PhotoFrame
                  photo={bridePhoto}
                  aspectClass="aspect-[3/4]"
                  showLabel
                  showOverlay={false}
                  className="mx-auto max-w-xs"
                />
              )}
              <p className="mt-3 text-center text-[0.58rem] uppercase tracking-[0.3em] text-gold-300/60">
                {wedding.couple.bride.role}
              </p>
              <p className="text-center font-display text-2xl text-gold-100">{wedding.couple.bride.name}</p>
            </Reveal>

            <Reveal delay={0.2} className="flex flex-col items-center gap-2 px-2">
              <RingsIllustration className="h-24 w-36 sm:h-28 sm:w-40" />
              <span className="font-script text-2xl text-gold-200/80">weds</span>
              <span className="text-[0.55rem] uppercase tracking-[0.3em] text-gold-300/50">
                {wedding.couple.monogram}
              </span>
            </Reveal>

            <Reveal className="w-full">
              {groomPhoto && (
                <PhotoFrame
                  photo={groomPhoto}
                  aspectClass="aspect-[3/4]"
                  showLabel
                  showOverlay={false}
                  className="mx-auto max-w-xs"
                />
              )}
              <p className="mt-3 text-center text-[0.58rem] uppercase tracking-[0.3em] text-gold-300/60">
                {wedding.couple.groom.role}
              </p>
              <p className="text-center font-display text-2xl text-gold-100">{wedding.couple.groom.name}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
