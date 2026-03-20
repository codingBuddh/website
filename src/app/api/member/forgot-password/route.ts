import { NextResponse } from "next/server";
import { createHeadlessMemberClient } from "@/lib/wix/member-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const { client } = await createHeadlessMemberClient();
    const origin = new URL(request.url).origin;

    await client.recovery.sendRecoveryEmail(email, {
      redirect: {
        url: origin,
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to send password reset email",
      },
      { status: 400 }
    );
  }
}
