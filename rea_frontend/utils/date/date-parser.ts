const monthMap: Record<string, number> = {
  Sty: 0, Lut: 1, Mar: 2, Kwi: 3,
  Maj: 4, Cze: 5, Lip: 6, Sie: 7,
  Wrz: 8, Paź: 9, Lis: 10, Gru: 11,
}

export const parseDate = (monthStr: string): Date => {
  const cleaned = monthStr.replace("'", "").trim()
  const parts = cleaned.split(/\s+/)
  if (parts.length < 2) {
    return new Date()  // fallback
  }

  const [monthName, rawYear] = parts
  const year =
    rawYear.length === 2 && /^\d{2}$/.test(rawYear)
      ? 2000 + Number(rawYear)
      : Number(rawYear)

  const monthIndex = monthMap[monthName as keyof typeof monthMap]
  if (isNaN(year) || monthIndex === undefined) {
    return new Date()  // fallback
  }

  return new Date(year, monthIndex, 1)
}

export const formatDate = (input: string | Date) => {
  try {
    return new Intl.DateTimeFormat('pl-PL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(input));
  } catch {
    return String(input);
  }
};

export const formatDatePdfReport = (input: string | Date | undefined | null) => {
  if (input == null) return '';
  const d = input instanceof Date ? input : new Date(input);
  if (isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
};