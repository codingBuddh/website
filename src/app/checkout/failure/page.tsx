import { CheckoutStatusPage } from "@/components/ui/CheckoutStatusPage";

export default function CheckoutFailurePage() {
  return (
    <CheckoutStatusPage
      title="Your payment wasn't completed this time."
      description="The checkout was canceled, interrupted, or still needs another try. Your cart is still waiting, so you can head back and continue whenever you're ready."
      badge="Payment Incomplete"
      badgeClassName="border-[#EF762F]/30 bg-[#FFF1E8] text-[#B45309]"
      panelClassName="bg-white"
      primaryLabel="Return to Cart"
      primaryHref="/shop"
      secondaryLabel="Go Home"
      secondaryHref="/"
    />
  );
}
