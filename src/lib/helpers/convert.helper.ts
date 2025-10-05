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