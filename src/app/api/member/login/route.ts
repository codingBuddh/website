import { NextResponse } from "next/server";
import {
  createHeadlessMemberClient,
  establishMemberSession,
  getCurrentLoggedInMember,
  getMemberDisplayName,
  getMemberEmail,
  getMemberFirstName,
} from "@/lib/wix/member-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const { client } = await createHeadlessMemberClient();
    const response = await client.authentication.login(email, password);
    const memberId = response.member?._id;

    if (!memberId) {
      return NextResponse.json(
        { success: false, message: "Unable to complete sign in for this member" },
        { status: 400 }
      );
    }

    await establishMemberSession(memberId);

    const member = (await getCurrentLoggedInMember()) ?? response.member;

    return NextResponse.json({
      success: true,
      member: {
        id: member?._id ?? memberId,
        name: getMemberDisplayName(member),
        email: getMemberEmail(member) || email,
        firstName: getMemberFirstName(member),
      },
    });
  } catch (error) {
    const err = error as {
      message?: string;
      details?: { applicationError?: { code?: string } };
    };
    const message = err?.message || "Failed to sign in";
    const errorCode = err?.details?.applicationError?.code?.toLowerCase() || "";
    const normalizedMessage = message.toLowerCase();

    const accountMissing =
      errorCode.includes("invalid_email") ||
      normalizedMessage.includes("invalid email") ||
      normalizedMessage.includes("member not found") ||
      normalizedMessage.includes("user not found") ||
      normalizedMessage.includes("account not found") ||
      normalizedMessage.includes("email doesn't exist") ||
      normalizedMessage.includes("email does not exist") ||
      normalizedMessage.includes("no account");

    const invalidPassword =
      errorCode.includes("invalid_password") ||
      normalizedMessage.includes("invalid password") ||
      normalizedMessage.includes("wrong password") ||
      normalizedMessage.includes("incorrect password");

    return NextResponse.json(
      {
        success: false,
        message: accountMissing
          ? "We couldn't find an account with that email."
          : invalidPassword
            ? "That password doesn't look right. Please try again."
            : message,
      },
      { status: 400 }
    );
  }
}
