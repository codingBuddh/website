"use client";

import { useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Eye, EyeOff, Loader2, User, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

type MemberSession = {
  id: string;
  name: string;
  email: string;
  firstName: string;
};

type OrderSummary = {
  id: string;
  number: string;
  createdDate: string;
  status: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  total: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
  }>;
};

const initialAuthForm = {
  name: "",
  email: "",
  password: "",
};

function formatOrderDate(value: string) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function HeaderMemberControl({ mobileMenu = false }: { mobileMenu?: boolean }) {
  const { refreshCart } = useCart();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [member, setMember] = useState<MemberSession | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialAuthForm);
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  const displayName = useMemo(() => {
    if (!member) return "";
    return member.firstName || member.name || "Account";
  }, [member]);

  const loadSession = async () => {
    try {
      const response = await fetch("/api/member/session", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        setMember(null);
        return;
      }

      const data = (await response.json()) as {
        loggedIn?: boolean;
        member?: MemberSession | null;
      };

      setMember(data.loggedIn ? (data.member ?? null) : null);
    } catch {
      setMember(null);
    } finally {
      setIsLoadingSession(false);
    }
  };

  useEffect(() => {
    void loadSession();
  }, []);

  useEffect(() => {
    if (!accountOpen || !member) return;

    const loadOrders = async () => {
      setOrdersLoading(true);
      setOrdersError("");

      try {
        const response = await fetch("/api/member/orders", {
          method: "GET",
          cache: "no-store",
        });

        const data = (await response.json()) as {
          success?: boolean;
          orders?: OrderSummary[];
          message?: string;
        };

        if (!response.ok) {
          throw new Error(data.message || "Failed to load order history");
        }

        setOrders(data.orders ?? []);
      } catch (error) {
        setOrdersError(error instanceof Error ? error.message : "Failed to load order history");
      } finally {
        setOrdersLoading(false);
      }
    };

    void loadOrders();
  }, [accountOpen, member]);

  const resetForm = () => {
    setForm(initialAuthForm);
    setAuthError("");
    setShowPassword(false);
  };

  const handleAuthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setAuthError("");

    try {
      const response = await fetch(mode === "signin" ? "/api/member/login" : "/api/member/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as {
        success?: boolean;
        member?: MemberSession;
        message?: string;
      };

      if (!response.ok || !data.success || !data.member) {
        throw new Error(data.message || "Authentication failed");
      }

      setMember(data.member);
      setAuthOpen(false);
      setAccountOpen(false);
      resetForm();
      await refreshCart();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Authentication failed";

      if (mode === "signin" && message) {
        setMode("signup");
        setAuthError("We couldn't find an account with that email. Please sign up instead.");
        return;
      }

      setAuthError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/member/logout", { method: "POST" });
    } finally {
      setMember(null);
      setOrders([]);
      setOrdersError("");
      setAccountOpen(false);
      await refreshCart();
    }
  };

  if (isLoadingSession) {
    return (
      <div
        className={
          mobileMenu
            ? "flex min-h-11 items-center text-sm font-medium text-gray-500"
            : "flex items-center justify-center rounded-full border border-white/70 px-3 py-1 text-xs font-medium text-white/80 md:text-sm"
        }
      >
        <Loader2 size={14} className="animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <Dialog.Root
        open={authOpen}
        onOpenChange={(open) => {
          setAuthOpen(open);
          if (!open) {
            resetForm();
          }
        }}
      >
        <Dialog.Trigger asChild>
          <button
            className={
              mobileMenu
                ? "flex min-h-11 w-full items-center rounded-xl px-0 py-2 text-left text-lg font-medium text-gray-700 transition-colors hover:text-tangerine"
                : "whitespace-nowrap rounded-full border border-white/70 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10 md:text-sm"
            }
          >
            Login
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-60 bg-black/45 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-70 w-[calc(100vw-2rem)] max-w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-[#f1c7aa] bg-[linear-gradient(180deg,#fff6ee_0%,#ffffff_100%)] p-6 shadow-[0_30px_100px_rgba(74,37,17,0.18)]">
            <Dialog.Title className="text-3xl text-[#4a2511] font-semibold">
              {mode === "signin" ? "Welcome back" : "Make an account"}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm leading-6 text-[#7b5c49]">
              {mode === "signin"
                ? "Sign in with your email and password to see your orders and continue your Kheelona journey."
                : "Create your account with your name, email, and password so you can track orders easily."}
            </Dialog.Description>

            <Dialog.Close asChild>
              <button
                aria-label="Close member dialog"
                className="absolute right-4 top-4 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#ef762f]/20 bg-white p-2 text-[#4a2511] transition-colors hover:bg-[#fff1e8]"
              >
                <X size={18} />
              </button>
            </Dialog.Close>

            <div className="mt-5 inline-flex rounded-full border border-[#ef762f]/20 bg-white p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setAuthError("");
                }}
                className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  mode === "signin" ? "bg-[#ef762f] text-white" : "text-[#8c5b3d]"
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setAuthError("");
                }}
                className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  mode === "signup" ? "bg-[#ef762f] text-white" : "text-[#8c5b3d]"
                }`}
              >
                Sign up
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleAuthSubmit}>
              {mode === "signup" ? (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#6b4a36]">Name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, name: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-[#e7d5c8] bg-white px-4 py-3 text-[#4a2511] outline-none transition-colors focus:border-[#ef762f]"
                    placeholder="Your name"
                    required
                  />
                </label>
              ) : null}

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#6b4a36]">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-[#e7d5c8] bg-white px-4 py-3 text-[#4a2511] outline-none transition-colors focus:border-[#ef762f]"
                  placeholder="name@example.com"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#6b4a36]">Password</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, password: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-[#e7d5c8] bg-white px-4 py-3 pr-12 text-[#4a2511] outline-none transition-colors focus:border-[#ef762f]"
                    placeholder="Your password"
                    required
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-2 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full p-1 text-[#8c5b3d] transition-colors hover:bg-[#fff1e8]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              {authError ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {authError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-full px-5 py-3 text-base font-semibold text-white transition-transform duration-300 disabled:cursor-not-allowed disabled:opacity-70 bg-[#ef762f] hover:scale-[1.01] hover:bg-[#dd6824]`}
              >
                {isSubmitting
                  ? mode === "signin"
                    ? "Signing you in..."
                    : "Creating your account..."
                  : mode === "signin"
                    ? "Sign in"
                    : "Create account"}
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return (
    <Dialog.Root open={accountOpen} onOpenChange={setAccountOpen}>
      <Dialog.Trigger asChild>
        <button
          className={
            mobileMenu
              ? "inline-flex min-h-11 w-full items-center gap-2 rounded-xl px-0 py-2 text-left text-lg font-medium text-gray-700 transition-colors hover:text-tangerine"
              : "inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border border-white/70 bg-white px-3 py-2 text-xs font-medium text-tangerine md:text-sm"
          }
        >
          <User size={14} />
          <span className="max-w-24 truncate md:max-w-32">{displayName}</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-60 bg-black/45 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-70 h-[min(82vh,760px)] w-[calc(100vw-2rem)] max-w-[640px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] border border-[#f1c7aa] bg-white shadow-[0_30px_100px_rgba(74,37,17,0.18)]">
          <div className="border-b border-[#f4e3d7] bg-[linear-gradient(180deg,#fff6ee_0%,#fffdfb_100%)] px-6 py-5">
            <Dialog.Title className="text-3xl text-[#4a2511] font-semibold">
              Hi, {displayName}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm leading-6 text-[#7b5c49]">
              Your account and order history live here.
            </Dialog.Description>

            <Dialog.Close asChild>
              <button
                aria-label="Close account dialog"
                className="absolute right-4 top-4 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#ef762f]/20 bg-white p-2 text-[#4a2511] transition-colors hover:bg-[#fff1e8]"
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex h-[calc(100%-105px)] flex-col px-6 py-5">
            <div className="rounded-[24px] border border-[#f3e0d3] bg-[#fffaf6] p-4">
              <p className="text-sm text-[#7b5c49]">Signed in as</p>
              <p className="mt-1 text-lg font-semibold text-[#4a2511]">{member.email}</p>
            </div>

            <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-1">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#4a2511]">Order history</h3>
              </div>

              {ordersLoading ? (
                <div className="flex items-center gap-2 rounded-[24px] border border-[#f3e0d3] bg-[#fffaf6] px-4 py-5 text-sm text-[#7b5c49]">
                  <Loader2 size={16} className="animate-spin" />
                  Loading your orders...
                </div>
              ) : ordersError ? (
                <div className="rounded-[24px] border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
                  {ordersError}
                </div>
              ) : orders.length === 0 ? (
                <div className="rounded-[24px] border border-[#f3e0d3] bg-[#fffaf6] px-4 py-5 text-sm text-[#7b5c49]">
                  No orders yet for this account.
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <article
                      key={order.id}
                      className="rounded-[24px] border border-[#f3e0d3] bg-white p-4 shadow-[0_12px_32px_rgba(74,37,17,0.05)]"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#50B2D5]">
                            Order {order.number || order.id.slice(0, 8)}
                          </p>
                          <p className="mt-1 text-sm text-[#7b5c49]">
                            {formatOrderDate(order.createdDate)}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-semibold text-[#4a2511]">{order.total}</p>
                          <p className="mt-1 text-xs text-[#7b5c49]">
                            {order.status} • {order.paymentStatus}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#fff1e8] px-3 py-1 text-xs font-medium text-[#a24f1d]">
                          {order.fulfillmentStatus}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id || `${order.id}-${item.name}`}
                            className="flex items-center justify-between rounded-2xl bg-[#fffaf6] px-3 py-2 text-sm"
                          >
                            <span className="text-[#4a2511]">{item.name}</span>
                            <span className="text-[#7b5c49]">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-5 w-full rounded-full border border-[#ef762f]/20 px-5 py-3 text-sm font-semibold text-[#a24f1d] transition-colors hover:bg-[#fff1e8]"
            >
              Log out
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
