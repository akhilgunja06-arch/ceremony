/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING CONFIGURATION — edit everything about the wedding here
 * ─────────────────────────────────────────────────────────────
 *  Every name, date, venue, message, photograph and music track used
 *  across the invitation is defined in this single file.
 */

export type PhotoGroup = 'story' | 'groom' | 'bride' | 'couple';

export interface PhotoSlot {
  id: string;
  label: string;
  caption?: string;
  /** Permanent image path (place the file in /public). Leave empty for a frame only. */
  src?: string;
  group: PhotoGroup;
  orientation?: 'portrait' | 'landscape' | 'square';
}

export interface SaptaPadhiStep {
  number: string;
  title: string;
  titleTelugu: string;
  promiseTelugu: string;
  promiseEnglish: string;
  icon: 'grain' | 'strength' | 'prosperity' | 'happiness' | 'family' | 'friendship' | 'forever';
}

export const wedding = {
  couple: {
    groom: {
      name: 'Mahesh',
      teluguName: 'మహేష్',
      role: 'PELIKODUKU',
      roleTelugu: 'పెళ్లికొడుకు',
      roleEnglish: 'The Groom',
    },
    bride: {
      name: 'Tanusha',
      teluguName: 'తనుష',
      role: 'PELLIKUTHURU',
      roleTelugu: 'పెళ్లికూతురు',
      roleEnglish: 'The Bride',
    },
    /** Order used in the headline: TANUSHA ❤️ MAHESH */
    display: 'TANUSHA ❤️ MAHESH',
    monogram: 'T & M',
  },

  wedding: {
    /** Countdown target — 13 December 2026, 08:22 AM IST */
    dateISO: '2026-12-13T08:22:00+05:30',
    timeZone: 'Asia/Kolkata',
    /** Displayed date and time (edit together with dateISO) */
    dateDisplay: '13-12-2026',
    dateLong: '13 December 2026',
    timeDisplay: '08:22 AM',
    muhurthamLabel: 'Muhurtham',
    dayOverride: '', // leave empty to calculate the weekday automatically
  },

  venue: {
    name: 'Lingala',
    lines: ['Lingala', 'Mandavalli Mandal', 'Eluru District', 'Andhra Pradesh, India'],
    address: 'Lingala, Mandavalli Mandal, Eluru District, Andhra Pradesh, India',
  },

  families: {
    /** Leave empty to show a neutral family label instead of invented names. */
    groomParents: '',
    brideParents: '',
    groomLabel: "Groom's Family",
    brideLabel: "Bride's Family",
  },

  messages: {
    blessingTelugu: 'శ్రీ వెంకటేశ్వర స్వామి వారి ఆశీస్సులతో',
    blessingEnglish:
      'With the divine blessings of Lord Venkateswara, we invite you to celebrate the wedding of Tanusha and Mahesh.',
    welcomeTelugu: 'శుభ వివాహ ఆహ్వానం',
    welcomeSubtitle: 'With the blessings of our families',
    welcomeEnglish:
      'With immense joy and happiness, we cordially invite you and your family to celebrate our wedding ceremony.',
    welcomeTeluguMessage:
      'మా వివాహ మహోత్సవానికి విచ్చేసి నూతన వధూవరులను ఆశీర్వదించవలసిందిగా మనస్ఫూర్తిగా ఆహ్వానిస్తున్నాము.',
    detailsHeading: 'Wedding Celebration',
    detailsTelugu: 'వివాహ వేడుక',
    storyQuote:
      'Two hearts, one promise — sealed before our families, the sacred fire and the seven steps of a lifetime.',
    storyTelugu: 'రెండు హృదయాలు... ఒకే వాగ్దానం... జీవితాంతం ఒకే ప్రయాణం.',
    saptaTitle: 'THE SEVEN SACRED STEPS',
    saptaTelugu: 'సప్తపది – జీవితాంతం కలిసి నడిచే ఏడు అడుగులు',
    saptaFinalLine: 'SEVEN STEPS, ONE BEAUTIFUL JOURNEY, FOREVER.',
    saptaFinalTelugu:
      'ఏడు అడుగులు... ఒకటైన రెండు హృదయాలు... జీవితాంతం ఒకటే ప్రయాణం.',
    galleryHeading: 'Moments of Us',
    galleryTelugu: 'మా అందమైన క్షణాలు',
    familyHeading: 'Together With Our Families',
    familyTelugu: 'మా కుటుంబాలతో కలిసి',
    familyMessage:
      'Your gracious presence and blessings will make our special day even more memorable. We warmly invite you and your family to join our celebration.',
    finaleHeading: 'WE CORDIALLY INVITE YOU',
    finaleSubheading: 'Join Us To Celebrate The Beginning Of A Beautiful Journey.',
    finaleTelugu:
      'మీ రాకే మా ఆనందానికి మరింత అందం. తప్పక విచ్చేసి నూతన వధూవరులను ఆశీర్వదించండి.',
    footerNote: 'Thank you for celebrating with us.',
  },

  /** Optional background music. Drop an MP3 at /public/audio/wedding-theme.mp3. */
  music: {
    src: '/audio/wedding-theme.mp3',
    title: 'Traditional Wedding Instrumental',
    /** If no file is found, a soft, generated tanpura ambience is used instead. */
    allowGeneratedFallback: true,
  },

  /** Optional devotional artwork. Drop a licensed image at this path to display it. */
  artwork: {
    venkateswaraImage: '/images/venkateswara.jpg',
    mandapImage: '/images/mandap.jpg',
  },

  /**
   * Photograph slots. Put your originals in /public/photos using these exact
   * file names, or upload them in the invitation itself via the photo manager.
   */
  photos: [
    {
      id: 'hero',
      label: 'Welcome Portrait',
      caption: 'Welcome',
      src: '/photos/couple-hero.jpg',
      group: 'story',
      orientation: 'portrait',
    },
    {
      id: 'stage',
      label: 'Couple — Decorated Stage',
      caption: 'On our wedding stage',
      src: '/photos/couple-stage.jpg',
      group: 'story',
      orientation: 'landscape',
    },
    {
      id: 'romantic',
      label: 'Couple — Romantic Portrait',
      caption: 'Our story',
      src: '/photos/couple-romantic.jpg',
      group: 'story',
      orientation: 'portrait',
    },

    { id: 'groom-1', label: 'Groom Portrait 1', src: '/photos/groom-portrait-1.jpg', group: 'groom', orientation: 'portrait' },
    { id: 'groom-2', label: 'Groom Portrait 2', src: '/photos/groom-portrait-2.jpg', group: 'groom', orientation: 'portrait' },
    { id: 'groom-3', label: 'Groom Traditional Dress Photo', src: '/photos/groom-traditional.jpg', group: 'groom', orientation: 'portrait' },
    { id: 'groom-4', label: 'Groom Family Photo', src: '/photos/groom-family.jpg', group: 'groom', orientation: 'landscape' },
    { id: 'groom-5', label: 'Groom Special Photo', src: '/photos/groom-special.jpg', group: 'groom', orientation: 'portrait' },

    { id: 'bride-1', label: 'Bride Portrait 1', src: '/photos/bride-portrait-1.jpg', group: 'bride', orientation: 'portrait' },
    { id: 'bride-2', label: 'Bride Portrait 2', src: '/photos/bride-portrait-2.jpg', group: 'bride', orientation: 'portrait' },
    { id: 'bride-3', label: 'Bride Traditional Dress Photo', src: '/photos/bride-traditional.jpg', group: 'bride', orientation: 'portrait' },
    { id: 'bride-4', label: 'Bride Family Photo', src: '/photos/bride-family.jpg', group: 'bride', orientation: 'landscape' },
    { id: 'bride-5', label: 'Bride Special Photo', src: '/photos/bride-special.jpg', group: 'bride', orientation: 'portrait' },

    { id: 'couple-1', label: 'Couple Photo 1', src: '/photos/couple-1.jpg', group: 'couple', orientation: 'portrait' },
    { id: 'couple-2', label: 'Couple Photo 2', src: '/photos/couple-2.jpg', group: 'couple', orientation: 'portrait' },
    { id: 'couple-3', label: 'Couple Photo 3', src: '/photos/couple-3.jpg', group: 'couple', orientation: 'portrait' },
    { id: 'engagement', label: 'Engagement Photo', src: '/photos/engagement.jpg', group: 'couple', orientation: 'landscape' },
    { id: 'pre-wedding', label: 'Pre-Wedding Photo', src: '/photos/pre-wedding.jpg', group: 'couple', orientation: 'landscape' },
  ] as PhotoSlot[],

  saptaPadhi: [
    {
      number: '01',
      title: 'Together in Nourishment',
      titleTelugu: 'ఆహారం మరియు శ్రేయస్సు',
      promiseTelugu:
        'మన కుటుంబానికి కావలసిన ఆహారం, ఆనందం మరియు శ్రేయస్సు కోసం కలిసి కృషి చేద్దాం.',
      promiseEnglish:
        'We promise to nourish each other and build a life filled with care, support and abundance.',
      icon: 'grain',
    },
    {
      number: '02',
      title: 'Together in Strength',
      titleTelugu: 'బలం మరియు ధైర్యం',
      promiseTelugu:
        'ఆరోగ్యం, ధైర్యం మరియు బలంతో ప్రతి పరిస్థితిలో ఒకరికొకరం తోడుగా నిలుద్దాం.',
      promiseEnglish:
        'We promise to give each other strength and stand together through every challenge.',
      icon: 'strength',
    },
    {
      number: '03',
      title: 'Together in Prosperity',
      titleTelugu: 'సంపద మరియు అభివృద్ధి',
      promiseTelugu:
        'మన కలలను నిజం చేసుకుంటూ సంపద, అభివృద్ధి మరియు సంతోషంతో ముందుకు సాగుదాం.',
      promiseEnglish:
        'We promise to work together and build a prosperous and meaningful future.',
      icon: 'prosperity',
    },
    {
      number: '04',
      title: 'Together in Happiness',
      titleTelugu: 'సంతోషం మరియు శాంతి',
      promiseTelugu:
        'ప్రేమ, నవ్వులు, శాంతి మరియు సంతోషంతో మన జీవితాన్ని అందంగా మార్చుకుందాం.',
      promiseEnglish:
        'We promise to create a home filled with laughter, peace and happiness.',
      icon: 'happiness',
    },
    {
      number: '05',
      title: 'Together in Family',
      titleTelugu: 'కుటుంబం మరియు సంస్కారం',
      promiseTelugu:
        'మన కుటుంబాలను గౌరవిస్తూ ప్రేమ, సంస్కారం మరియు బాధ్యతలతో ముందుకు సాగుదాం.',
      promiseEnglish:
        'We promise to respect our families and nurture our home with love and values.',
      icon: 'family',
    },
    {
      number: '06',
      title: 'Together in Friendship',
      titleTelugu: 'స్నేహం మరియు నమ్మకం',
      promiseTelugu:
        'నమ్మకం, గౌరవం మరియు స్నేహంతో జీవితాంతం ఒకరికొకరం అండగా ఉందాం.',
      promiseEnglish:
        "We promise to be each other's best friend and share every joy and sorrow.",
      icon: 'friendship',
    },
    {
      number: '07',
      title: 'Together Forever',
      titleTelugu: 'జీవితాంతం కలిసి',
      promiseTelugu:
        'జీవితంలోని ప్రతి మలుపులో జీవితాంతం ఒకరికొకరం తోడుగా ఉంటామని ప్రమాణం చేద్దాం.',
      promiseEnglish:
        'We promise to walk together forever, with unconditional love, loyalty and understanding.',
      icon: 'forever',
    },
  ] as SaptaPadhiStep[],
} as const;

export const photoById = (id: string): PhotoSlot | undefined =>
  wedding.photos.find((photo) => photo.id === id);

export const photosByGroup = (group: PhotoGroup): PhotoSlot[] =>
  wedding.photos.filter((photo) => photo.group === group);

export const weddingDate = new Date(wedding.wedding.dateISO);

export const weddingDay = (() => {
  if (wedding.wedding.dayOverride) return wedding.wedding.dayOverride;
  try {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      timeZone: wedding.wedding.timeZone,
    }).format(weddingDate);
  } catch {
    return '';
  }
})();

const mapsQuery = encodeURIComponent(wedding.venue.address);

export const mapsLinks = {
  search: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
};
