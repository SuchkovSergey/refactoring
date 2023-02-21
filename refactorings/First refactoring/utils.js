const format = new Intl
    .NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format;

export const formatCost = (cost) => format(cost / 100);