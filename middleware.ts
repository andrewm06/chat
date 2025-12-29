import { NextResponse } from "next/server";

export function middleware() {
  // Public app: no auth middleware required.
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/"],
};
