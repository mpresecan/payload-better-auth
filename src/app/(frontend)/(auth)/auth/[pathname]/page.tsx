import { AuthCard, SignedOut, SignOut } from "@daveyplate/better-auth-ui"
import { authViewPaths } from "@daveyplate/better-auth-ui/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { getPayload } from "@/lib/payload"
import AuthCardWrapper from "@/modules/auth/components/auth-card-wrapper"

export function generateStaticParams() {
  return Object.values(authViewPaths).map((pathname) => ({ pathname }))
}

export default async function AuthPage({
  params
}: {
  params: Promise<{ pathname: string }>
}) {
  const { pathname } = await params

  const payload = await getPayload()

  // **EXAMPLE** SSR route protection for /auth/settings
  // NOTE: This opts /auth/settings out of static rendering
  // It already handles client side protection via useAuthenticate
  if (pathname === "settings") {
    const sessionData = await payload.betterAuth.api.getSession({
      headers: await headers()
    })
    if (!sessionData) redirect("/auth/sign-in?redirectTo=/auth/settings")
  }

  return (
    <AuthCardWrapper
      title="Welcome Back!"
      subtitle="Please sign in to continue."
    >
      <AuthCard
        pathname={pathname}
        classNames={{
          base: `${pathname.toLocaleLowerCase} border-none p-0 shadow-none`
        }}
        otpSeparators={2}
        redirectTo="/dashboard"
        socialLayout="horizontal"
      />
    </AuthCardWrapper>
  )
}
