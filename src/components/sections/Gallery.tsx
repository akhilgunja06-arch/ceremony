import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { wedding, type PhotoGroup, type PhotoSlot } from '../../config/wedding';
import { PhotoFrame } from '../ui/PhotoFrame';
import { Lightbox, type LightboxPhoto } from '../ui/Lightbox';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import { GoldDivider, Lotus } from '../ui/Ornaments';

type GalleryGroup = Exclude<PhotoGroup, 'story'>;
type GalleryFilter = 'all' | GalleryGroup;

const GROUP_ORDER: GalleryGroup[] = ['groom', 'bride', 'couple'];
const AVAILABLE_GROUPS = GROUP_ORDER.filter((group) =>
  wedding.photos.some((photo) => photo.group === group),
);

const FILTERS: { id: GalleryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  ...AVAILABLE_GROUPS.map((group) => ({
    id: group,
    label: group[0].toUpperCase() + group.slice(1),
  })),
];

const GROUP_TITLES: Record<GalleryGroup, { title: string; telugu: string }> = {
  groom: { title: 'The Groom', telugu: 'పెళ్లికొడుకు' },
  bride: { title: 'The Bride', telugu: 'పెళ్లికూతురు' },
  couple: { title: 'Together', telugu: 'వధూవరులు' },
};

function GroupGrid({
  photos,
  onOpen,
  onStatus,
}: {
  photos: PhotoSlot[];
  onOpen: (id: string) => void;
  onStatus: (id: string, status: 'loaded' | 'error') => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {photos.map((photo, index) => (
        <Reveal key={photo.id} delay={Math.min(index * 0.05, 0.3)} y={22}>
          <PhotoFrame
            photo={photo}
            aspectClass={
              photo.orientation === 'landscape'
                ? 'aspect-[3/2]'
                : photo.orientation === 'square'
                  ? 'aspect-square'
                  : 'aspect-[3/4]'
            }
            onOpen={onOpen}
            onStatus={onStatus}
            showOverlay={false}
            rounded="rounded-[1.15rem]"
          />
        </Reveal>
      ))}
    </div>
  );
}

export function Gallery() {
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const handleStatus = useCallback((id: string, status: 'loaded' | 'error') => {
    setLoaded((current) => {
      if (status === 'loaded') return current[id] ? current : { ...current, [id]: true };
      if (!current[id]) return current;
      const { [id]: _removed, ...rest } = current;
      return rest;
    });
  }, []);

  const lightboxPhotos = useMemo<LightboxPhoto[]>(() => {
    return wedding.photos
      .filter(
        (photo): photo is PhotoSlot & { src: string } =>
          photo.group !== 'story' && Boolean(photo.src) && loaded[photo.id],
      )
      .map((photo) => ({
        id: photo.id,
        label: photo.label,
        src: photo.src,
        caption: photo.caption,
      }));
  }, [loaded]);

  const openPhoto = (id: string) => {
    const position = lightboxPhotos.findIndex((photo) => photo.id === id);
    if (position >= 0) setLightboxIndex(position);
  };

  const visibleGroups: GalleryGroup[] =
    filter === 'all' ? AVAILABLE_GROUPS : [filter];

  return (
    <Section id="gallery" labelledBy="gallery-heading">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          id="gallery-heading"
          eyebrow="Photo Album"
          title={wedding.messages.galleryHeading}
          telugu={wedding.messages.galleryTelugu}
          description="A few frames from our journey. Tap a photograph to open it full screen."
        />

        <Reveal className="mt-14 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={active}
                className={`relative rounded-full px-5 py-2.5 text-[0.6rem] uppercase tracking-[0.24em] transition-colors duration-300 ${
                  active ? 'text-maroon-950' : 'text-gold-200/70 hover:text-gold-100'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-200 via-gold-300 to-gold-500"
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </Reveal>

        <div className="mt-10 space-y-14">
          {visibleGroups.map((group) => {
            const photos = wedding.photos.filter((photo) => photo.group === group);
            return (
              <div key={group}>
                <Reveal className="mb-6 flex flex-col items-center gap-2 text-center">
                  <Lotus className="h-6 w-12 opacity-70" />
                  <h3 className="font-display text-2xl text-gold-100 sm:text-3xl">
                    {GROUP_TITLES[group].title}
                  </h3>
                  <p lang="te" className="font-telugu text-xs text-gold-300/70">
                    {GROUP_TITLES[group].telugu}
                  </p>
                  <GoldDivider className="mt-1 w-40 opacity-70" />
                </Reveal>
                <GroupGrid photos={photos} onOpen={openPhoto} onStatus={handleStatus} />
              </div>
            );
          })}
        </div>

      </div>

      <Lightbox
        photos={lightboxPhotos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </Section>
  );
}
