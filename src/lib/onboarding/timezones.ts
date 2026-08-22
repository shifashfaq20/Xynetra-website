// src/lib/onboarding/timezones.ts

// Curated fallback list — used if Intl.supportedValuesOf is missing or throws.
const FALLBACK_TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Toronto',
  'America/Vancouver',
  'America/Mexico_City',
  'America/Sao_Paulo',
  'America/Argentina/Buenos_Aires',
  'Europe/London',
  'Europe/Dublin',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Madrid',
  'Europe/Rome',
  'Europe/Amsterdam',
  'Europe/Brussels',
  'Europe/Vienna',
  'Europe/Warsaw',
  'Europe/Istanbul',
  'Europe/Moscow',
  'Asia/Dubai',
  'Asia/Riyadh',
  'Asia/Karachi',
  'Asia/Kolkata',
  'Asia/Dhaka',
  'Asia/Bangkok',
  'Asia/Jakarta',
  'Asia/Singapore',
  'Asia/Hong_Kong',
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Asia/Seoul',
  'Australia/Perth',
  'Australia/Sydney',
  'Australia/Melbourne',
  'Pacific/Auckland',
  'Africa/Cairo',
  'Africa/Lagos',
  'Africa/Johannesburg',
  'Africa/Nairobi',
];

function rawTimezones(): string[] {
  try {
    // 'timeZone' is CASE-SENSITIVE. Wrap in try/catch so a bad key or
    // missing ICU data never crashes the page.
    const fn = (Intl as any).supportedValuesOf;
    if (typeof fn === 'function') {
      const values = fn.call(Intl, 'timeZone');
      if (Array.isArray(values) && values.length > 0) return values;
    }
  } catch {
    // fall through to the hardcoded list
  }
  return FALLBACK_TIMEZONES;
}

function formatLabel(tz: string): string {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'shortOffset',
    });
    const parts = formatter.formatToParts(now);
    const offset = parts.find((p) => p.type === 'timeZoneName')?.value || '';
    const clean = offset.replace('GMT', '').replace('UTC', '');
    return `(UTC${clean}) ${tz.replace(/_/g, ' ')}`;
  } catch {
    return tz.replace(/_/g, ' ');
  }
}

export function getTimezones(): { value: string; label: string }[] {
  return rawTimezones().map((tz) => ({ value: tz, label: formatLabel(tz) }));
}

export function guessBrowserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}