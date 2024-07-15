export interface FormatRupiahProps {
  value: number;
}

export const FormatRupiah = ({ value }: FormatRupiahProps) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};
