import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui"

export default async function PrivatePagesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <RedirectToSignIn />
      <SignedIn>{children}</SignedIn>
    </>
  )
}
