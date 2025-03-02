export const StringToArray = (value: string): (string | number)[] => value.split(/\s+/).map(item => isNaN(Number(item)) ? item : Number(item));

export const parseDate = (dateStr: string): Date => {
    // "2025/01/01-12:45:00" を "-" で分割し、前半が日付、後半が時刻となる前提
    const [datePart, timePart] = dateStr.split('-');
    // 日付部分のスラッシュをハイフンに置換し、ISO8601形式にするためTを追加
    const isoDateStr = datePart.replace(/\//g, '-') + 'T' + timePart;
    return new Date(isoDateStr);
}

export const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}
export const calculateProfitMargin = (totalPrice: number, totalCost: number): number => {
    return totalPrice === 0
        ? 0
        : Math.round(((totalPrice - totalCost) / totalPrice) * 1000) / 1000;
}

export const roundToFourthDecimal = (value: number): number => {
    return Math.round(value * 1000) / 1000;
}

