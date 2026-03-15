"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

function normalizeReturnTo(value: string | null) {
  if (!value || !value.startsWith("/")) return "/";
  return value;
}

export default function LoginPageContent() {
  const searchParams = useSearchParams();
  const returnTo = useMemo(() => normalizeReturnTo(searchParams.get("returnTo")), [searchParams]);

  const loginHref = `/api/auth/wix/login?popup=1&returnTo=${encodeURIComponent(returnTo)}`;

  useEffect(() => {
    const handleAuthMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      const data = event.data as { type?: string; redirectPath?: string } | null;
      if (!data?.type || (data.type !== "wix-auth-success" && data.type !== "wix-auth-error")) {
        return;
      }

      const redirectPath =
        data.redirectPath && data.redirectPath.startsWith("/") ? data.redirectPath : "/";

      window.location.assign(redirectPath);
    };

    window.addEventListener("message", handleAuthMessage);
    return () => window.removeEventListener("message", handleAuthMessage);
  }, []);

  const handleLogin = () => {
    const popup = window.open(
      loginHref,
      "wix-login",
      "popup=yes,width=520,height=720,left=100,top=100,resizable=yes,scrollbars=yes"
    );

    if (!popup) {
      window.location.assign(loginHref);
    }
  };

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[linear-gradient(180deg,#fff5eb_0%,#ffffff_45%,#fff8f2_100%)] px-4 pb-16 pt-28 md:px-6 md:pt-32"
    >
      <div className="mx-auto max-w-5xl">
        <section className="grid gap-8 overflow-hidden rounded-[32px] border border-[#f1c7aa] bg-white shadow-[0_24px_80px_rgba(239,118,47,0.12)] md:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-[#fff1e4] px-6 py-10 md:px-10 md:py-12">
            <p className="mb-4 inline-flex rounded-full bg-white px-4 py-1 text-sm font-semibold text-[#ef762f]">
              Welcome back
            </p>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-[#4a2511] md:text-5xl">
              Sign in to continue your Kheelona journey.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-[#6b4a36] md:text-lg">
              Use the secure Wix sign-in popup to access your account, continue shopping, and get
              back to playtime faster.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-[#6b4a36]">
              <div className="rounded-2xl border border-white bg-white/80 px-4 py-3">
                Secure login with your existing Wix account
              </div>
              <div className="rounded-2xl border border-white bg-white/80 px-4 py-3">
                Supports email sign-in and provider options inside the popup
              </div>
              <div className="rounded-2xl border border-white bg-white/80 px-4 py-3">
                Redirects you back to your page after successful sign-in
              </div>
            </div>
          </div>

          <div className="flex items-center px-6 py-10 md:px-10 md:py-12">
            <div className="w-full rounded-[28px] border border-[#f6dfcf] bg-[#fffaf6] p-6 shadow-[0_18px_50px_rgba(74,37,17,0.08)]">
              <h2 className="text-2xl font-semibold text-[#4a2511]">Login to your account</h2>
              <p className="mt-3 text-sm leading-6 text-[#7b5c49]">
                Clicking the button below opens a Wix login popup. Once you finish signing in,
                you&apos;ll be sent back to{" "}
                <span className="font-medium text-[#4a2511]">{returnTo}</span>.
              </p>

              <button
                type="button"
                onClick={handleLogin}
                className="mt-6 w-full rounded-full bg-[#ef762f] px-5 py-3 text-base font-semibold text-white transition-transform duration-300 hover:scale-[1.01] hover:bg-[#dd6824]"
              >
                Continue Login
              </button>

              <Link
                href={returnTo}
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[#ef762f]/20 px-5 py-3 text-sm font-medium text-[#a24f1d] transition-colors hover:bg-[#fff1e8]"
              >
                Back to site
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
