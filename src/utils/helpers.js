export const formatCurrency = (value) =>
  new Intl.NumberFormat("vi", { style: "currency", currency: "VND" }).format(
    value
  );

export const formatDate = (value) =>
  new Intl.DateTimeFormat("vi", {
    timeStyle: "medium",
    dateStyle: "short",
  }).format(new Date(value));
