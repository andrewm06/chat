import type { QuoteResponse } from "./schemas";

export const mockQuotes: QuoteResponse = {
  currency: "USD",
  addressNormalized: "",
  quotes: [
    {
      planId: "biannual",
      planName: "Bi-Annual Cleaning",
      headlineDiscountText: "$50 OFF",
      priceOneTime: 229,
      pricePerVisit: 189,
      billingCadenceText: "2 cleanings per year",
      recommended: false,
      features: [
        { label: "7 Day Rain Guarantee", included: true },
        { label: "Priority Scheduling", included: true },
        { label: "Hydrophobic Coating", included: false },
        { label: "20% Off Add-On Services", included: false },
      ],
    },
    {
      planId: "quarterly",
      planName: "Quarterly Cleaning",
      headlineDiscountText: "$100 OFF",
      priceOneTime: 199,
      pricePerVisit: 169,
      billingCadenceText: "Best value • 4 cleanings/year",
      recommended: true,
      features: [
        { label: "7 Day Rain Guarantee", included: true },
        { label: "Priority Scheduling", included: true },
        { label: "Hydrophobic Coating", included: true },
        { label: "20% Off Add-On Services", included: true },
      ],
    },
    {
      planId: "monthly",
      planName: "Monthly Cleaning",
      headlineDiscountText: "$150 OFF",
      priceOneTime: 149,
      pricePerVisit: 129,
      billingCadenceText: "12 cleanings per year",
      recommended: false,
      features: [
        { label: "7 Day Rain Guarantee", included: true },
        { label: "Priority Scheduling", included: true },
        { label: "Hydrophobic Coating", included: true },
        { label: "20% Off Add-On Services", included: true },
      ],
    },
  ],
};

export function withAddress(address: string): QuoteResponse {
  return {
    ...mockQuotes,
    addressNormalized: address,
  };
}
