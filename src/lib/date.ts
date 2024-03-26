import { format, parseISO } from 'date-fns';
import { enIN } from 'date-fns/locale';

const DATE_FORMAT = {
  /** Saturday, 11 Februari 2022 */
  FULL_DATE_WITH_DAY: 'PPPP',
  /** 15 Agustus 2021 */
  FULL: 'dd MMMM yyyy',
  /** 11 Jan 2022 */
  DATE_WITH_SHORTENED_MONTH: 'd MMM yyyy',
  /** 15 Agustus 2021, 12:04:05 */
  FULL_WITH_TIME: 'dd MMMM yyyy, HH:mm:ss',
};

export function formatLocaleDate(
  date: Date,
  formatKey: keyof typeof DATE_FORMAT
) {
  return format(date, DATE_FORMAT[formatKey], { locale: enIN });
}

export function parseDateFromAPI(date: string): Date {
  return parseISO(date);
}
