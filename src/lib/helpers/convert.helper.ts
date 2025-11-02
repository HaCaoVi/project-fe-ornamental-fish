export const getInitials = (fullName: string) => {
  if (!fullName) return "";
  return fullName
    .split(" ")
    .map(word => word[0].toUpperCase())
    .join("");
};

export const calculateDiscountPercent = (discount: number, originalPrice: number) => {
  if (!originalPrice || originalPrice <= 0) return 0;
  return Math.round((discount / originalPrice) * 100);
};

export const formatNumberFollowKAndM = (num: number) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
};

export function parseVnPayDate(vnpDateStr: string): Date | null {
  if (!vnpDateStr || vnpDateStr.length !== 14) return null;

  const year = +vnpDateStr.slice(0, 4);
  const month = +vnpDateStr.slice(4, 6) - 1;
  const day = +vnpDateStr.slice(6, 8);
  const hour = +vnpDateStr.slice(8, 10);
  const minute = +vnpDateStr.slice(10, 12);
  const second = +vnpDateStr.slice(12, 14);

  return new Date(year, month, day, hour, minute, second);
}
