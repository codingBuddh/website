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
    const body = (await request.json()) as { name?: string; email?: string; password?: string };
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const { client } = await createHeadlessMemberClient();
    const response = await client.authentication.register(email, password, {
      contactInfo: { firstName: name },
    });

    const memberId = response.member?._id;

    if (!memberId) {
      return NextResponse.json(
        {
          success: false,
          message:
            response.approvalToken || response.session?.token
              ? "Signup completed, but this site requires additional approval before login."
              : "Unable to complete signup for this member",
        },
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
        firstName: getMemberFirstName(member) || name,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to sign up",
      },
      { status: 400 }
    );
  }
}
