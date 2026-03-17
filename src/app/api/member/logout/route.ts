import { NextResponse } from "next/server";
import { clearWixTokenCookie } from "@/lib/wix/auth";

export async function POST() {
  await clearWixTokenCookie();
  return NextResponse.json({ success: true });
}
