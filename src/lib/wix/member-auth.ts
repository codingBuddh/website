import { ApiKeyStrategy, createClient, OAuthStrategy } from "@wix/sdk";
import { orders } from "@wix/ecom";
import { authentication, members } from "@wix/members";
import { clearWixTokenCookie, getWixTokenStorage, isWixConfigured } from "./auth";

function getRequiredEnv(name: "NEXT_PUBLIC_WIX_CLIENT_ID" | "WIX_API_KEY" | "WIX_ACCOUNT_ID") {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

export function getMemberDisplayName(member: any) {
  const firstName = member?.contact?.firstName?.trim();
  const lastName = member?.contact?.lastName?.trim();
  const nickname = member?.profile?.nickname?.trim();
  const email = member?.loginEmail?.trim() || member?.contact?.emails?.[0]?.email?.trim();

  if (firstName && lastName) return `${firstName} ${lastName}`;
  if (firstName) return firstName;
  if (nickname) return nickname;
  if (email) return email.split("@")[0];
  return "Friend";
}

export function getMemberFirstName(member: any) {
  return member?.contact?.firstName?.trim() || "";
}

export function getMemberEmail(member: any) {
  return member?.loginEmail?.trim() || member?.contact?.emails?.[0]?.email?.trim() || "";
}

export async function createHeadlessMemberClient() {
  if (!isWixConfigured()) {
    throw new Error("NEXT_PUBLIC_WIX_CLIENT_ID is not configured");
  }

  const tokenStorage = await getWixTokenStorage();

  const client = createClient({
    modules: { authentication, members },
    auth: OAuthStrategy({
      clientId: getRequiredEnv("NEXT_PUBLIC_WIX_CLIENT_ID"),
      tokenStorage,
    }),
  });

  return { client, tokenStorage };
}

export function createWixOrdersAppClient() {
  return createClient({
    modules: { orders },
    auth: ApiKeyStrategy({
      apiKey: getRequiredEnv("WIX_API_KEY"),
      accountId: getRequiredEnv("WIX_ACCOUNT_ID"),
    }),
  });
}

export async function establishMemberSession(memberId: string) {
  const { client, tokenStorage } = await createHeadlessMemberClient();

  const visitorTokens = await client.auth.generateVisitorTokens();
  tokenStorage.setTokens(visitorTokens);

  const memberTokens = await client.auth.getMemberTokensForExternalLogin(
    memberId,
    getRequiredEnv("WIX_API_KEY")
  );
  tokenStorage.setTokens(memberTokens);
}

export async function getCurrentLoggedInMember() {
  const { client } = await createHeadlessMemberClient();

  if (!client.auth.loggedIn()) {
    return null;
  }

  try {
    const response = await client.members.getCurrentMember();
    return response?.member ?? null;
  } catch {
    await clearWixTokenCookie();
    return null;
  }
}
