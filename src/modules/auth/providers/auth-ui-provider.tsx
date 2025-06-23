"use client"

import { AuthUIProvider as OriginalAuthUIProvider } from "@daveyplate/better-auth-ui"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

import { authClient } from "@/modules/auth/lib/client"

export function AuthUIProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <OriginalAuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        // Clear router cache (protected routes)
        router.refresh()
      }}
      Link={Link}
      emailOTP={true}
      magicLink={true}
      social={{
        providers: ["google", "apple", "github"]
      }}
      passkey={true}
      basePath="/auth"
      additionalFields={{
        age: {
          label: "Age",
          placeholder: "Your age",
          description: "Enter your age",
          required: false,
          type: "number"
        }
      }}
      settings={{
        fields: ["age"],
        url: "/dashboard/settings"
      }}
      organization={{
        logo: {
          // upload: async (file) => {
          //   // Your upload logic
          //   return uploadedUrl
          // },
          size: 256,
          extension: "png"
        },
        customRoles: [
          { role: "developer", label: "Developer" },
          { role: "viewer", label: "Viewer" }
        ]
      }}
    >
      {children}
    </OriginalAuthUIProvider>
  )
}
