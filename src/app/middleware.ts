import { NextRequest, NextResponse } from "next/server"
import { getCookieCache } from "better-auth/cookies"

export async function middleware(request: NextRequest) {
  const session = await getCookieCache(request)
  console.log("session", session)
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }
  return NextResponse.next()
}
