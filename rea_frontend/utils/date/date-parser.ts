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
