export const formatNumber = (num: number, format: string) => {
  return new Intl.NumberFormat(format, { maximumFractionDigits: 2 }).format(
    num
  );
};
