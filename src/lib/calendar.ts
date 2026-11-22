import { wedding } from '../config/wedding';

/** Google Calendar link for the muhurtham, assuming a three-hour ceremony. */
export function googleCalendarLink(): string {
  const start = new Date(wedding.wedding.dateISO);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Wedding of ${wedding.couple.bride.name} & ${wedding.couple.groom.name}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: `Muhurtham at ${wedding.wedding.timeDisplay}. With the divine blessings of Lord Venkateswara.`,
    location: wedding.venue.address,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
