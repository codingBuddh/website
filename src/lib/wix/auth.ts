import { cookies } from "next/headers";
import { EMPTY_TOKENS, type Tokens } from "@wix/sdk";

export const WIX_TOKEN_COOKIE = "wix_tokens";
export const WIX_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export function isWixConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_WIX_CLIENT_ID);
}

export async function getWixTokenStorage() {
  const cookieStore = await cookies();

  return {
    getTokens: (): Tokens => {
      const raw = cookieStore.get(WIX_TOKEN_COOKIE)?.value;
      if (!raw) return EMPTY_TOKENS;

      try {
        return JSON.parse(raw) as Tokens;
      } catch {
        return EMPTY_TOKENS;
      }
    },
    setTokens: (tokens: Tokens) => {
      cookieStore.set(WIX_TOKEN_COOKIE, JSON.stringify(tokens), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: WIX_TOKEN_MAX_AGE_SECONDS,
      });
    },
  };
}

export async function clearWixTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(WIX_TOKEN_COOKIE);
}
