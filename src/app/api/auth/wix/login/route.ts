import { NextRequest, NextResponse } from "next/server";
import { createClient, OAuthStrategy } from "@wix/sdk";
import {
  getWixTokenStorage,
  isWixConfigured,
  setWixAuthFlowCookie,
  setWixOAuthDataCookie,
} from "@/lib/wix/auth";

const CALLBACK_PATH = "/api/auth/wix/callback";

function normalizeReturnTo(value: string | null) {
  if (!value || !value.startsWith("/")) return "/";
  return value;
}

export async function GET(request: NextRequest) {
  if (!isWixConfigured()) {
    return NextResponse.json({ message: "Wix auth is not configured" }, { status: 503 });
  }

  const tokenStorage = await getWixTokenStorage();

  const wixClient = createClient({
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokenStorage,
    }),
  });

  const returnTo = normalizeReturnTo(request.nextUrl.searchParams.get("returnTo"));
  const authFlow = request.nextUrl.searchParams.get("popup") === "1" ? "popup" : "redirect";
  const redirectUri = new URL(CALLBACK_PATH, request.nextUrl.origin).toString();
  // const redirectUri = "https://kheelona-website-react.vercel.app/api/auth/wix/callback";

  const oauthData = await wixClient.auth.generateOAuthData(redirectUri, returnTo);

  await setWixOAuthDataCookie(oauthData);
  await setWixAuthFlowCookie(authFlow);

  const { authUrl } = await wixClient.auth.getAuthUrl(oauthData, { prompt: "login" });

  return NextResponse.redirect(authUrl);
}
