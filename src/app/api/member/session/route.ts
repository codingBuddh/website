import { NextResponse } from "next/server";
import {
  getCurrentLoggedInMember,
  getMemberDisplayName,
  getMemberEmail,
  getMemberFirstName,
} from "@/lib/wix/member-auth";

export async function GET() {
  try {
    const member = await getCurrentLoggedInMember();

    if (!member) {
      return NextResponse.json({ loggedIn: false, member: null });
    }

    return NextResponse.json({
      loggedIn: true,
      member: {
        id: member._id ?? "",
        name: getMemberDisplayName(member),
        email: getMemberEmail(member),
        firstName: getMemberFirstName(member),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        loggedIn: false,
        member: null,
        message: error instanceof Error ? error.message : "Failed to load member session",
      },
      { status: 500 }
    );
  }
}
