import { CheckoutStatusPage } from "@/components/ui/CheckoutStatusPage";

export default function CheckoutSuccessPage() {
  return (
    <CheckoutStatusPage
      title="Payment received. Lumi is getting ready for the journey home."
      description="Your checkout finished successfully. We have your order and will keep the next steps moving from here."
      badge="Payment Success"
      badgeClassName="border-[#50B2D5]/30 bg-[#E7F8FC] text-[#157A9B]"
      panelClassName="bg-white"
      primaryLabel="Continue Shopping"
      primaryHref="/shop"
      secondaryLabel="Go Home"
      secondaryHref="/"
      orderPrefix="Order reference:"
    />
  );
}
