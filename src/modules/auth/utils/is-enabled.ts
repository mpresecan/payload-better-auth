import {
  betterAuthOptions,
  betterAuthPlugins
} from "@/modules/auth/lib/options"

export const isEmailAndPasswordAuthEnabled: boolean =
  betterAuthOptions.emailAndPassword?.enabled || false

export const isImpersonationEnabled: boolean = betterAuthPlugins.some(
  (plugin) => plugin.id === "admin"
)
