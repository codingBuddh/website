import { NextRequest, NextResponse } from "next/server";
import { createClient, OAuthStrategy } from "@wix/sdk";
import {
  clearWixAuthFlowCookie,
  clearWixOAuthDataCookie,
  getWixAuthFlowCookie,
  getWixOAuthDataCookie,
  getWixTokenStorage,
  isWixConfigured,
} from "@/lib/wix/auth";

function popupResponse(redirectPath: string, status: "success" | "error") {
  const safeRedirectPath = redirectPath.startsWith("/") ? redirectPath : "/";
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Signing in...</title>
  </head>
  <body>
    <script>
      (function () {
        var redirectPath = ${JSON.stringify(safeRedirectPath)};
        var payload = { type: "wix-auth-${status}", redirectPath: redirectPath };

        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(payload, window.location.origin);
          window.close();
          return;
        }

        window.location.replace(redirectPath);
      })();
    </script>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function fallbackRedirect(origin: string, isPopup: boolean) {
  if (isPopup) {
    return popupResponse("/?auth=error", "error");
  }

  return NextResponse.redirect(new URL("/?auth=error", origin));
}

function safeRedirectPath(path: string | undefined) {
  if (!path || !path.startsWith("/")) return "/";
  return path;
}

export async function GET(request: NextRequest) {
  if (!isWixConfigured()) {
    return NextResponse.json({ message: "Wix auth is not configured" }, { status: 503 });
  }

  const authFlow = await getWixAuthFlowCookie();
  const isPopup = authFlow === "popup";

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  if (!code || !state) {
    await clearWixAuthFlowCookie();
    return fallbackRedirect(request.nextUrl.origin, isPopup);
  }

  const oauthData = await getWixOAuthDataCookie();
  if (!oauthData) {
    await clearWixAuthFlowCookie();
    return fallbackRedirect(request.nextUrl.origin, isPopup);
  }

  try {
    const tokenStorage = await getWixTokenStorage();
    const wixClient = createClient({
      auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
        tokenStorage,
      }),
    });

    const memberTokens = await wixClient.auth.getMemberTokens(code, state, oauthData);
    tokenStorage.setTokens(memberTokens);

    await clearWixOAuthDataCookie();
    await clearWixAuthFlowCookie();

    const redirectPath = safeRedirectPath(oauthData.originalUri);
    if (isPopup) {
      return popupResponse(redirectPath, "success");
    }

    return NextResponse.redirect(new URL(redirectPath, request.nextUrl.origin));
  } catch {
    await clearWixOAuthDataCookie();
    await clearWixAuthFlowCookie();
    return fallbackRedirect(request.nextUrl.origin, isPopup);
  }
}
