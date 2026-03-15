"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, User } from "lucide-react";

type WixSessionResponse = {
  enabled: boolean;
  loggedIn: boolean;
};

export default function UserAccountMenu() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<WixSessionResponse | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/auth/wix/session", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          setSession({ enabled: false, loggedIn: false });
          return;
        }

        const data = (await response.json()) as WixSessionResponse;
        setSession(data);
      } catch {
        setSession({ enabled: false, loggedIn: false });
      }
    };

    void fetchSession();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const returnTo = useMemo(() => {
    if (!pathname || !pathname.startsWith("/")) return "/";
    return pathname;
  }, [pathname]);

  const isLoggedIn = Boolean(session?.loggedIn);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-label="Account menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 rounded-full border border-white/70 p-2 text-white hover:bg-white/10 transition-colors"
      >
        <User size={20} />
        <ChevronDown size={14} />
      </button>

      {isOpen ? (
        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
          {!isLoggedIn ? (
            <div className="space-y-1">
              <a
                href={`/api/auth/wix/login?returnTo=${encodeURIComponent(returnTo)}`}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Login with Wix
              </a>
              <a
                href={`/api/auth/google/login?returnTo=${encodeURIComponent(returnTo)}`}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Login with Google
              </a>
            </div>
          ) : (
            <div className="space-y-1">
              <a
                href="/account/profile"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="/account/orders"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Order History
              </a>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
