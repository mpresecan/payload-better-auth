import { AuthCard } from "@daveyplate/better-auth-ui"
import { authViewPaths } from "@daveyplate/better-auth-ui/server"
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
