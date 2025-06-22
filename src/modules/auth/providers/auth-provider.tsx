
import type { ReactNode } from "react"
import { BetterAuthProvider } from '../lib/context'
import { getContextProps } from '../lib/context/get-context-props'
import { AuthUIProvider } from "./auth-ui-provider";

export function AuthProviders({ children }: { children: ReactNode }) {

    return (
        <BetterAuthProvider {...getContextProps()}>
            <AuthUIProvider>
                {children}
            </AuthUIProvider>
        </BetterAuthProvider>
    )
}