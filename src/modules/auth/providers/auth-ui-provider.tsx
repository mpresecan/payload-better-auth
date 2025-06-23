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
            providers={['google', 'apple', 'github']}
            passkey={true}
            basePath="/auth"
        >
            {children}
        </OriginalAuthUIProvider>
    )
}