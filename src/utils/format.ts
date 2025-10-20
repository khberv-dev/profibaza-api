import dayjs, { Dayjs } from 'dayjs';

export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');

  const match = digits.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
  if (!match) {
    return phone;
  }

  return `+${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;
}

export function formatOldInfo(date: Dayjs) {
  const now = dayjs();
  const yearOld = now.year() - date.year();
  const month = formatMonthByIndex(date.month());

  return `${yearOld} yosh, ${date.date()}-${month} ${date.year()}da tug'ilgan`;
}

export function formatMonthByIndex(month: number) {
  switch (month) {
    case 0:
      return 'yanvar';
    case 1:
      return 'fevral';
    case 2:
      return 'mart';
    case 3:
      return 'aprel';
    case 4:
      return 'may';
    case 5:
      return 'iyun';
    case 6:
      return 'iyul';
    case 7:
      return 'avgust';
    case 8:
      return 'sentyabr';
    case 9:
      return 'oktyabr';
    case 10:
      return 'noyabr';
    case 11:
      return 'dekabr';
    default:
      return '';
  }
}
