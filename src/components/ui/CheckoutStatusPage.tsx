"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckoutReturnSync } from "@/components/ui/CheckoutReturnSync";

type CheckoutStatusPageProps = {
  title: string;
  description: string;
  badge: string;
  badgeClassName: string;
  panelClassName: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  orderPrefix?: string;
};

function getParam(searchParams: URLSearchParams, key: string) {
  const value = searchParams.get(key);
  return value && value.startsWith("/") ? value : null;
}

export function CheckoutStatusPage({
  title,
  description,
  badge,
  badgeClassName,
  panelClassName,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  orderPrefix,
}: CheckoutStatusPageProps) {
  const searchParams = useSearchParams();
  const returnTo = getParam(searchParams, "returnTo") ?? primaryHref;
  const orderId = searchParams.get("orderId");

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#FFF8F1_0%,#FFFFFF_35%,#E7F8FC_100%)] px-4 py-10 md:px-6 md:py-16">
      <CheckoutReturnSync />

      <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
        <section
          className={`w-full rounded-[2rem] border border-black/10 px-6 py-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.08)] md:px-10 md:py-14 ${panelClassName}`}
        >
          <p
            className={`mx-auto mb-6 inline-flex rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] ${badgeClassName}`}
          >
            {badge}
          </p>

          <h1 className="mx-auto max-w-2xl font-heading text-4xl leading-tight text-[#111111] md:text-6xl">
            {title}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#4A4A4A] md:text-lg">
            {description}
          </p>

          {orderPrefix && orderId ? (
            <p className="mt-6 text-sm font-semibold text-[#111111] md:text-base">
              {orderPrefix} <span className="break-all">{orderId}</span>
            </p>
          ) : null}

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={returnTo}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#EF762F] px-8 py-3 text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {primaryLabel}
            </Link>

            <Link
              href={secondaryHref}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#50B2D5] bg-white px-8 py-3 text-base font-semibold text-[#157A9B] transition-transform hover:-translate-y-0.5"
            >
              {secondaryLabel}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
